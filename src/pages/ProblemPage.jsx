import { useState, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { useAuth } from '../context/AuthContext';
import { getProblemById } from '../data/problems';
import LoginModal from '../components/LoginModal';

export default function ProblemPage() {
  const { id } = useParams();
  const { user, solvedProblems, markProblemSolved } = useAuth();
  const problem = getProblemById(id);

  const [code, setCode] = useState(problem?.starterCode || '');
  const [showSolution, setShowSolution] = useState(false);
  const isSolved = Boolean(solvedProblems?.includes(id));

  // Test cases & running state
  const [activeTab, setActiveTab] = useState('testcase'); // 'testcase' | 'result'
  const [runState, setRunState] = useState({
    status: 'idle', // 'idle' | 'running' | 'success' | 'wrong' | 'compile_error' | 'runtime_error' | 'time_limit' | 'error'
    runtime: '',
    userOutput: '',
    errorDetails: '',
    message: '',
  });

  // Just-in-time login modal state for saving progress
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Detect theme from document
  const isDark =
    typeof document !== 'undefined' &&
    document.documentElement.getAttribute('data-theme') === 'dark';

  // Execute test runner with real Java compilation and execution via Judge0 CE API
  const executeRun = useCallback(async () => {
    if (!problem) return;
    setRunState({
      status: 'running',
      runtime: '',
      userOutput: '',
      errorDetails: '',
      message: 'Compiling and executing your Java solution...',
    });
    setActiveTab('result');

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch('https://ce.judge0.com/submissions?base64_encoded=false&wait=true', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          source_code: code,
          language_id: 91, // Java (JDK 17.0.6)
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`Execution service returned status ${response.status}`);
      }

      const data = await response.json();
      const statusId = data.status?.id;
      const runtimeMs = data.time ? `${Math.round(Number(data.time) * 1000)} ms` : '< 50 ms';

      // 1. Compilation Error
      if (statusId === 6 || (data.compile_output && !data.stdout)) {
        setRunState({
          status: 'compile_error',
          runtime: '',
          userOutput: '',
          errorDetails: data.compile_output || 'Compilation failed. Check your syntax and class structure.',
          message: 'Compilation Error: Code could not be compiled.',
        });
        return;
      }

      // 2. Runtime Error (Exceptions like NullPointerException, ArrayIndexOutOfBounds, etc.)
      if ((statusId >= 7 && statusId <= 12) || data.stderr) {
        setRunState({
          status: 'runtime_error',
          runtime: runtimeMs,
          userOutput: data.stdout || '',
          errorDetails: data.stderr || data.message || 'A runtime exception occurred during execution.',
          message: 'Runtime Error: Exception occurred while running.',
        });
        return;
      }

      // 3. Time Limit Exceeded
      if (statusId === 5) {
        setRunState({
          status: 'time_limit',
          runtime: '> 5.0 s',
          userOutput: data.stdout || '',
          errorDetails: 'Your solution timed out. Ensure there are no infinite loops or recursion issues.',
          message: 'Time Limit Exceeded.',
        });
        return;
      }

      // 4. Verify actual output against expected output
      const actualOutput = (data.stdout || '').trim();
      const expectedOutput = (problem.expectedOutput || '').trim();

      if (actualOutput === expectedOutput) {
        setRunState({
          status: 'success',
          runtime: runtimeMs,
          userOutput: data.stdout || '',
          errorDetails: '',
          message: 'All test cases passed successfully.',
        });
      } else {
        setRunState({
          status: 'wrong',
          runtime: runtimeMs,
          userOutput: data.stdout !== null && data.stdout !== undefined && data.stdout !== ''
            ? data.stdout
            : '(No output printed to console)',
          errorDetails: '',
          message: 'Wrong Answer: Your output does not match the expected test case output.',
        });
      }
    } catch (err) {
      console.error('Execution error:', err);

      // Check if starter code was unchanged
      const cleanUserCode = code.replace(/\s+/g, ' ').trim();
      const cleanStarter = (problem.starterCode || '').replace(/\s+/g, ' ').trim();

      if (cleanUserCode === cleanStarter) {
        setRunState({
          status: 'wrong',
          runtime: '0 ms',
          userOutput: '(Starter code unchanged — main logic missing)',
          errorDetails: '',
          message: 'Please implement your solution inside Main before running.',
        });
      } else {
        setRunState({
          status: 'error',
          runtime: '',
          userOutput: '',
          errorDetails: err.message || 'Could not connect to code execution server.',
          message: 'Unable to connect to the Java compiler. Check your internet connection.',
        });
      }
    }
  }, [code, problem]);

  // Run code without requiring any login
  const handleRun = useCallback(() => {
    executeRun();
  }, [executeRun]);

  // Click handler for "Submit / Mark as Solved"
  const handleMarkSolved = useCallback(async () => {
    if (runState.status !== 'success') {
      setActiveTab('result');
      if (runState.status === 'idle') {
        setRunState({
          status: 'idle',
          runtime: '',
          userOutput: '',
          errorDetails: '',
          message: 'Please run your code (▶ Run Code) and pass all test cases before marking as solved.',
        });
      }
      return;
    }

    if (!user) {
      // Prompt modal with Google cloud sync or guest save option
      setShowLoginModal(true);
      return;
    }
    await markProblemSolved(id);
    setRunState((prev) => ({
      ...prev,
      message: '✓ Marked as solved! Your progress has been synced to your account.',
    }));
    setActiveTab('result');
  }, [user, id, markProblemSolved, runState.status]);

  const handleGuestSolve = useCallback(async () => {
    await markProblemSolved(id);
    setRunState((prev) => ({
      ...prev,
      message: '✓ Marked as solved on this device. Sign in anytime to sync to the cloud.',
    }));
    setActiveTab('result');
  }, [id, markProblemSolved]);

  const handleLoginSuccess = useCallback(async () => {
    await markProblemSolved(id);
    setRunState((prev) => ({
      ...prev,
      message: '✓ Marked as solved! Cloud synced with your Google account.',
    }));
    setActiveTab('result');
  }, [id, markProblemSolved]);

  const handleReset = useCallback(() => {
    setCode(problem?.starterCode || '');
    setRunState({ status: 'idle', runtime: '', userOutput: '', errorDetails: '', message: '' });
    setShowSolution(false);
  }, [problem]);

  if (!problem) {
    return (
      <main className="container" style={{ padding: '48px 0' }}>
        <div className="empty-state">
          <p className="empty-state__title">Problem not found</p>
          <p className="empty-state__desc">
            This problem doesn't exist or has been removed.
          </p>
          <Link to="/" className="btn btn--secondary" style={{ marginTop: 16 }}>
            Back to problems
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <div className="workspace">
        {/* Left panel — description */}
        <section className="workspace__description" aria-label="Problem description">
          <div className="problem-desc__back">
            <Link to="/" className="btn btn--ghost btn--sm" id="back-to-problems">
              ← Back
            </Link>
          </div>

          <header className="problem-desc__header">
            <p className="problem-desc__number">Problem {problem.number}</p>
            <h1 className="problem-desc__title">{problem.title}</h1>
            <div className="problem-desc__meta">
              {problem.exam && (
                <span
                  className={`exam-badge exam-badge--${problem.exam.toLowerCase().replace(/\s+/g, '')}`}
                >
                  {problem.exam}
                </span>
              )}
              <span className="problem-list__topic">{problem.topic}</span>
              <span
                className={`problem-list__difficulty problem-list__difficulty--${problem.difficulty.toLowerCase()}`}
              >
                {problem.difficulty}
              </span>
              {isSolved && (
                <span
                  style={{
                    color: 'var(--success)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                  }}
                >
                  ✓ Solved
                </span>
              )}
            </div>
          </header>

          <div className="problem-desc__body">
            {/* Render description as simple sections */}
            {problem.description.split('\n').map((line, i) => {
              if (line.startsWith('### ')) {
                return <h3 key={i}>{line.replace('### ', '')}</h3>;
              }
              if (line.startsWith('```')) return null;
              if (line.startsWith('- ')) {
                const content = line.replace('- ', '');
                const parts = content.split(/(`[^`]+`)/g);
                return (
                  <p key={i} style={{ paddingLeft: 16 }}>
                    {'• '}
                    {parts.map((part, j) =>
                      part.startsWith('`') && part.endsWith('`') ? (
                        <code key={j}>{part.slice(1, -1)}</code>
                      ) : (
                        <span key={j}>{part}</span>
                      )
                    )}
                  </p>
                );
              }
              if (line.trim() === '') return null;
              const parts = line.split(/(`[^`]+`)/g);
              return (
                <p key={i}>
                  {parts.map((part, j) =>
                    part.startsWith('`') && part.endsWith('`') ? (
                      <code key={j}>{part.slice(1, -1)}</code>
                    ) : (
                      <span key={j}>{part}</span>
                    )
                  )}
                </p>
              );
            })}

            {/* Expected output block */}
            <h3>Expected Output</h3>
            <pre>
              <code>{problem.expectedOutput}</code>
            </pre>
          </div>

          {/* Solution toggle */}
          <div style={{ marginTop: 24, marginBottom: 24 }}>
            <button
              className="btn btn--secondary btn--sm"
              onClick={() => setShowSolution(!showSolution)}
              id="toggle-solution"
            >
              {showSolution ? 'Hide Solution' : 'Show Solution'}
            </button>
            {showSolution && (
              <pre style={{ marginTop: 12 }}>
                <code>{problem.solution}</code>
              </pre>
            )}
          </div>
        </section>

        {/* Right panel — editor + test cases */}
        <section className="workspace__editor-area" aria-label="Code editor">
          <div className="workspace__toolbar">
            <div className="workspace__toolbar-left">
              <span className="workspace__lang-badge">Java</span>
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                className="btn btn--ghost btn--sm"
                onClick={handleReset}
                id="btn-reset"
              >
                Reset
              </button>
              <button
                className="btn btn--secondary btn--sm"
                onClick={handleRun}
                id="btn-run"
              >
                ▶ Run Code
              </button>
              {!isSolved ? (
                <button
                  className="btn btn--primary btn--sm"
                  onClick={handleMarkSolved}
                  id="btn-solve"
                >
                  Submit
                </button>
              ) : (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    padding: '4px 10px',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 600,
                    color: 'var(--success)',
                  }}
                >
                  ✓ Solved
                </span>
              )}
            </div>
          </div>

          <div className="workspace__editor" style={{ flex: 1, minHeight: 280 }}>
            <Editor
              height="100%"
              defaultLanguage="java"
              value={code}
              onChange={(value) => setCode(value || '')}
              theme={isDark ? 'vs-dark' : 'light'}
              options={{
                fontSize: 14,
                fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                lineNumbers: 'on',
                renderLineHighlight: 'line',
                tabSize: 4,
                wordWrap: 'on',
                automaticLayout: true,
              }}
            />
          </div>

          {/* Test cases & result panel */}
          <div className="workspace__testcase-panel" role="region" aria-label="Test Cases">
            <div className="workspace__testcase-header">
              <div className="workspace__testcase-tabs">
                <button
                  className={`workspace__testcase-tab ${activeTab === 'testcase' ? 'workspace__testcase-tab--active' : ''}`}
                  onClick={() => setActiveTab('testcase')}
                  id="tab-testcase"
                >
                  Testcase
                </button>
                <button
                  className={`workspace__testcase-tab ${activeTab === 'result' ? 'workspace__testcase-tab--active' : ''}`}
                  onClick={() => setActiveTab('result')}
                  id="tab-result"
                >
                  Test Result {runState.status === 'success' ? '✓' : (runState.status === 'wrong' || runState.status === 'compile_error' || runState.status === 'runtime_error') ? '✕' : ''}
                </button>
              </div>

              {runState.status === 'running' && (
                <span className="workspace__testcase-badge workspace__testcase-badge--running">
                  Running...
                </span>
              )}
              {runState.status === 'success' && (
                <span className="workspace__testcase-badge workspace__testcase-badge--success">
                  ✓ Accepted · {runState.runtime}
                </span>
              )}
              {runState.status === 'wrong' && (
                <span className="workspace__testcase-badge workspace__testcase-badge--wrong">
                  ✕ Wrong Answer · {runState.runtime}
                </span>
              )}
              {runState.status === 'compile_error' && (
                <span className="workspace__testcase-badge workspace__testcase-badge--error">
                  ✕ Compilation Error
                </span>
              )}
              {runState.status === 'runtime_error' && (
                <span className="workspace__testcase-badge workspace__testcase-badge--error">
                  ✕ Runtime Error
                </span>
              )}
              {runState.status === 'time_limit' && (
                <span className="workspace__testcase-badge workspace__testcase-badge--error">
                  ✕ Time Limit Exceeded
                </span>
              )}
            </div>

            <div className="workspace__testcase-body">
              {activeTab === 'testcase' ? (
                <div>
                  <div className="workspace__testcase-field">
                    <p className="workspace__testcase-label">Test Case 1 (Expected Output)</p>
                    <div className="workspace__testcase-value">
                      {problem.expectedOutput}
                    </div>
                  </div>
                  <p style={{ marginTop: 10, fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                    Click &ldquo;Run Code&rdquo; to test your solution against this case.
                  </p>
                </div>
              ) : (
                <div>
                  {runState.status === 'idle' && (
                    <p style={{ color: 'var(--text-tertiary)', fontSize: 'var(--text-xs)' }}>
                      {runState.message || 'You must run your code first. Click "▶ Run Code" above.'}
                    </p>
                  )}

                  {runState.status === 'running' && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 0' }}>
                      <div className="loading__spinner" style={{ width: 18, height: 18, borderWidth: 2 }} />
                      <p style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-xs)' }}>
                        Compiling and executing your Java solution...
                      </p>
                    </div>
                  )}

                  {runState.status === 'success' && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <span style={{ color: 'var(--success)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                          ✓ Accepted
                        </span>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                          Runtime: {runState.runtime}
                        </span>
                      </div>

                      <div className="workspace__testcase-field">
                        <p className="workspace__testcase-label">Expected Output</p>
                        <div className="workspace__testcase-value">{problem.expectedOutput}</div>
                      </div>

                      <div className="workspace__testcase-field">
                        <p className="workspace__testcase-label">Your Output</p>
                        <div className="workspace__testcase-value" style={{ color: 'var(--success)' }}>
                          {runState.userOutput || problem.expectedOutput}
                        </div>
                      </div>

                      {runState.message && (
                        <p style={{ marginTop: 12, fontSize: 'var(--text-xs)', color: 'var(--success)', fontWeight: 500 }}>
                          {runState.message}
                        </p>
                      )}
                    </div>
                  )}

                  {runState.status === 'wrong' && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <span style={{ color: 'var(--error)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                          ✕ Wrong Answer
                        </span>
                        <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                          Runtime: {runState.runtime}
                        </span>
                      </div>

                      <div className="workspace__testcase-field">
                        <p className="workspace__testcase-label">Expected Output</p>
                        <div className="workspace__testcase-value">{problem.expectedOutput}</div>
                      </div>

                      <div className="workspace__testcase-field">
                        <p className="workspace__testcase-label">Your Output</p>
                        <div
                          className="workspace__testcase-value"
                          style={{
                            color: 'var(--error)',
                            borderColor: 'rgba(255, 55, 95, 0.4)',
                            background: 'rgba(255, 55, 95, 0.05)',
                          }}
                        >
                          {runState.userOutput}
                        </div>
                      </div>

                      <p style={{ marginTop: 12, fontSize: 'var(--text-xs)', color: 'var(--error)', fontWeight: 500 }}>
                        {runState.message}
                      </p>
                    </div>
                  )}

                  {runState.status === 'compile_error' && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <span style={{ color: 'var(--error)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                          ✕ Compilation Error
                        </span>
                      </div>

                      <div className="workspace__testcase-field">
                        <p className="workspace__testcase-label">Compiler Output (javac)</p>
                        <div
                          className="workspace__testcase-value"
                          style={{
                            color: 'var(--error)',
                            borderColor: 'rgba(255, 55, 95, 0.4)',
                            background: 'rgba(255, 55, 95, 0.05)',
                            whiteSpace: 'pre-wrap',
                            lineHeight: 1.5,
                          }}
                        >
                          {runState.errorDetails}
                        </div>
                      </div>
                    </div>
                  )}

                  {(runState.status === 'runtime_error' || runState.status === 'time_limit' || runState.status === 'error') && (
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                        <span style={{ color: 'var(--error)', fontWeight: 700, fontSize: 'var(--text-sm)' }}>
                          ✕ {runState.message || 'Execution Error'}
                        </span>
                      </div>

                      {runState.errorDetails && (
                        <div className="workspace__testcase-field">
                          <p className="workspace__testcase-label">Error Details</p>
                          <div
                            className="workspace__testcase-value"
                            style={{
                              color: 'var(--error)',
                              borderColor: 'rgba(255, 55, 95, 0.4)',
                              background: 'rgba(255, 55, 95, 0.05)',
                              whiteSpace: 'pre-wrap',
                              lineHeight: 1.5,
                            }}
                          >
                            {runState.errorDetails}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* Google Cloud Sync / Save Progress Modal */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
        onGuestContinue={handleGuestSolve}
        title="Save Your Solved Progress"
        subtitle="Sign in with Google to sync your progress across devices, or save locally on this browser."
        guestButtonText="Save locally on this device as guest →"
      />
    </>
  );
}
