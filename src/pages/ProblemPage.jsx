import { useState, useCallback, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { useAuth } from '../context/AuthContext';
import { getProblemById, getProblemTestCases } from '../data/problems';
import LoginModal from '../components/LoginModal';

export default function ProblemPage() {
  const { id } = useParams();
  const { user, solvedProblems, markProblemSolved } = useAuth();
  const problem = getProblemById(id);

  // Load test cases and edge cases for this problem
  const testCases = useMemo(() => getProblemTestCases(problem), [problem]);
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);

  // Anti-spam cooldown timer (seconds remaining before user can run code again)
  const [cooldown, setCooldown] = useState(0);

  // Diagnostic recommendation when student is struggling with repeated failures
  const [diagnostic, setDiagnostic] = useState(null);

  // Helper to load initially saved code
  const getInitialCode = (problemId, fallback) => {
    try {
      const savedCode = localStorage.getItem(`stsprac_code_${problemId}`);
      if (savedCode !== null && savedCode !== undefined) return savedCode;
      const subRaw = localStorage.getItem(`stsprac_solution_${problemId}`);
      if (subRaw) {
        const sub = JSON.parse(subRaw);
        if (sub?.code) return sub.code;
      }
    } catch {}
    return fallback;
  };

  const [code, setCode] = useState(() => getInitialCode(id, problem?.starterCode || ''));
  const [saveStatus, setSaveStatus] = useState(() => {
    try {
      const saved = localStorage.getItem(`stsprac_code_${id}`);
      return saved ? 'saved' : 'idle';
    } catch {
      return 'idle';
    }
  });
  const [savedSolution, setSavedSolution] = useState(() => {
    try {
      const raw = localStorage.getItem(`stsprac_solution_${id}`);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [showSolution, setShowSolution] = useState(false);
  const isSolved = Boolean(solvedProblems?.includes(id));

  // Test cases & running state
  const [activeTab, setActiveTab] = useState('testcase'); // 'testcase' | 'result' | 'saved_solution'
  const [runState, setRunState] = useState({
    status: 'idle', // 'idle' | 'running' | 'success' | 'wrong' | 'compile_error' | 'runtime_error' | 'time_limit' | 'error'
    runtime: '',
    userOutput: '',
    errorDetails: '',
    message: '',
  });

  // Just-in-time login modal state for saving progress
  const [showLoginModal, setShowLoginModal] = useState(false);

  // Handle typing in editor
  const handleCodeChange = useCallback((newVal) => {
    setCode(newVal);
    setSaveStatus('saving');
  }, []);

  // Debounced autosave to localStorage on code edit
  useEffect(() => {
    if (!problem) return;

    const timer = setTimeout(() => {
      try {
        if (code === problem.starterCode) {
          localStorage.removeItem(`stsprac_code_${id}`);
          setSaveStatus('idle');
        } else {
          localStorage.setItem(`stsprac_code_${id}`, code);
          setSaveStatus('saved');
        }
      } catch (err) {
        console.warn('LocalStorage autosave error:', err);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [code, id, problem]);

  // Reactive theme state initialized immediately from data-theme or storage
  const [isDark, setIsDark] = useState(() => {
    if (typeof document === 'undefined') return true;
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme) return currentTheme === 'dark';
    const saved = localStorage.getItem('stp-theme');
    if (saved) return saved === 'dark';
    return true; // default dark
  });

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute('data-theme');
      setIsDark(theme === 'dark');
    };
    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });
    return () => observer.disconnect();
  }, []);

  // Anti-spam cooldown timer countdown
  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = setTimeout(() => {
      setCooldown((c) => Math.max(0, c - 1));
    }, 1000);
    return () => clearTimeout(timer);
  }, [cooldown]);

  // Attempt telemetry and struggle detection
  const recordAttemptTelemetry = useCallback(
    (verdict, errorType = '', runtime = '') => {
      try {
        const key = `stsprac_telemetry_${id}`;
        const raw = localStorage.getItem(key);
        const existing = raw
          ? JSON.parse(raw)
          : {
              problemId: id,
              attemptsCount: 0,
              consecutiveFailures: 0,
              lastVerdict: '',
              history: [],
            };

        existing.attemptsCount += 1;
        if (verdict === 'success') {
          existing.consecutiveFailures = 0;
        } else {
          existing.consecutiveFailures += 1;
        }
        existing.lastVerdict = verdict;
        existing.history.push({
          timestamp: Date.now(),
          verdict,
          errorType,
          runtime,
        });

        // Keep last 10 entries to preserve storage
        if (existing.history.length > 10) {
          existing.history = existing.history.slice(-10);
        }

        localStorage.setItem(key, JSON.stringify(existing));

        // Detect repeated struggle patterns (>= 3 attempts with failures)
        if (existing.attemptsCount >= 3 && existing.consecutiveFailures >= 2) {
          if (verdict === 'time_limit') {
            setDiagnostic({
              title: 'Performance Bottleneck',
              tip: 'Your solution is timing out repeatedly. Check if your loop termination condition is met or consider optimizing nested loops.',
            });
          } else if (verdict === 'compile_error') {
            setDiagnostic({
              title: 'Compilation Hint',
              tip: 'Check syntax carefully: missing semicolons, unmatched curly braces, or type mismatches.',
            });
          } else if (verdict === 'runtime_error') {
            setDiagnostic({
              title: 'Runtime Exception',
              tip: 'Common causes include array out of bounds (off-by-one errors) or accessing null objects.',
            });
          } else if (verdict === 'wrong') {
            setDiagnostic({
              title: 'Logic / Output Mismatch',
              tip: 'Compare your console print output with the Expected Output closely, including spaces and newlines.',
            });
          }
        } else if (verdict === 'success') {
          setDiagnostic(null);
        }
      } catch (e) {
        console.warn('Telemetry storage warning:', e);
      }
    },
    [id]
  );

  const recordSolutionLocally = useCallback(
    (codeToSave, runtimeStr) => {
      try {
        const solutionData = {
          code: codeToSave,
          savedAt: new Date().toLocaleDateString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
          }),
          runtime: runtimeStr || 'Accepted',
        };
        localStorage.setItem(`stsprac_solution_${id}`, JSON.stringify(solutionData));
        setSavedSolution(solutionData);
        localStorage.setItem(`stsprac_code_${id}`, codeToSave);
        setSaveStatus('saved');
      } catch (e) {
        console.warn('Could not save solution to localStorage:', e);
      }
    },
    [id]
  );

  // Execute test runner with pre-flight checks, 5s cooldown, and telemetry
  const executeRun = useCallback(async () => {
    if (!problem) return;

    // Pre-flight check 0: Cooldown active or already running?
    if (cooldown > 0 || runState.status === 'running') return;

    // Pre-flight check 1: Starter code unchanged? Avoid wasting network API call
    const cleanUserCode = code.replace(/\s+/g, ' ').trim();
    const cleanStarter = (problem.starterCode || '').replace(/\s+/g, ' ').trim();
    if (cleanUserCode === cleanStarter) {
      setRunState({
        status: 'wrong',
        runtime: '0 ms',
        userOutput: '(Starter code unchanged — main logic missing)',
        errorDetails: '',
        message: 'Starter code unchanged. Implement your logic inside main() before running.',
      });
      setActiveTab('result');
      return;
    }

    // Pre-flight check 2: Missing main entry point?
    if (!code.includes('public static void main')) {
      setRunState({
        status: 'compile_error',
        runtime: '',
        userOutput: '',
        errorDetails: 'Missing entry point:\npublic static void main(String[] args)',
        message: 'Entry Point Missing: Please include public static void main(String[] args) in your Main class.',
      });
      setActiveTab('result');
      return;
    }

    // Set 5-second anti-spam cooldown lock
    setCooldown(5);

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
        const cleanError = (data.compile_output || '')
          .replace(/\/sandbox\d*\/Main\.java:/g, 'Line ')
          .replace(/\/tmp\/[a-zA-Z0-9_\-/]+\.java:/g, 'Line ');

        setRunState({
          status: 'compile_error',
          runtime: '',
          userOutput: '',
          errorDetails: cleanError || 'Compilation failed. Check your syntax and class structure.',
          message: 'Compilation Error: Code could not be compiled.',
        });
        recordAttemptTelemetry('compile_error', 'javac');
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
        recordAttemptTelemetry('runtime_error', data.stderr || 'Exception');
        return;
      }

      // 3. Time Limit Exceeded
      if (statusId === 5) {
        setRunState({
          status: 'time_limit',
          runtime: '> 5.0 s',
          userOutput: data.stdout || '',
          errorDetails: 'Your solution timed out (> 5.0 seconds). Ensure there are no infinite loops or recursion issues.',
          message: 'Time Limit Exceeded.',
        });
        recordAttemptTelemetry('time_limit', 'TLE');
        return;
      }

      // 4. Verify actual output against expected output
      const actualOutput = (data.stdout || '').trim();
      const expectedOutput = (problem.expectedOutput || '').trim();

      if (actualOutput === expectedOutput) {
        recordSolutionLocally(code, runtimeMs);
        recordAttemptTelemetry('success', '', runtimeMs);
        setRunState({
          status: 'success',
          runtime: runtimeMs,
          userOutput: data.stdout || '',
          errorDetails: '',
          message: 'All test cases passed successfully. Solution saved locally!',
        });
      } else {
        const isWhitespaceOnly =
          actualOutput.replace(/\s+/g, ' ') === expectedOutput.replace(/\s+/g, ' ');

        recordAttemptTelemetry('wrong', isWhitespaceOnly ? 'Whitespace' : 'Mismatch', runtimeMs);
        setRunState({
          status: 'wrong',
          runtime: runtimeMs,
          userOutput:
            data.stdout !== null && data.stdout !== undefined && data.stdout !== ''
              ? data.stdout
              : '(No output printed to console)',
          errorDetails: '',
          message: isWhitespaceOnly
            ? 'Wrong Answer: Characters match, but trailing space/newline differs.'
            : 'Wrong Answer: Your output does not match the expected test case output.',
        });
      }
    } catch (err) {
      console.error('Execution error:', err);
      recordAttemptTelemetry('error', err.message || 'Network');
      setRunState({
        status: 'error',
        runtime: '',
        userOutput: '',
        errorDetails: err.message || 'Could not connect to code execution server.',
        message: 'Unable to connect to the Java compiler. Check your internet connection.',
      });
    }
  }, [code, problem, cooldown, runState.status, recordSolutionLocally, recordAttemptTelemetry]);

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

    recordSolutionLocally(code, runState.runtime);

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
  }, [user, id, markProblemSolved, runState.status, runState.runtime, code, recordSolutionLocally]);

  const handleGuestSolve = useCallback(async () => {
    recordSolutionLocally(code, runState.runtime);
    await markProblemSolved(id);
    setRunState((prev) => ({
      ...prev,
      message: '✓ Marked as solved on this device. Sign in anytime to sync to the cloud.',
    }));
    setActiveTab('result');
  }, [id, markProblemSolved, code, runState.runtime, recordSolutionLocally]);

  const handleLoginSuccess = useCallback(async () => {
    recordSolutionLocally(code, runState.runtime);
    await markProblemSolved(id);
    setRunState((prev) => ({
      ...prev,
      message: '✓ Marked as solved! Cloud synced with your Google account.',
    }));
    setActiveTab('result');
  }, [id, markProblemSolved, code, runState.runtime, recordSolutionLocally]);

  const handleReset = useCallback(() => {
    setCode(problem?.starterCode || '');
    try {
      localStorage.removeItem(`stsprac_code_${id}`);
    } catch {}
    setSaveStatus('idle');
    setRunState({ status: 'idle', runtime: '', userOutput: '', errorDetails: '', message: '' });
    setShowSolution(false);
  }, [problem, id]);

  const handleLoadSavedSolution = useCallback(() => {
    if (savedSolution?.code) {
      setCode(savedSolution.code);
      setSaveStatus('saved');
      setActiveTab('result');
    }
  }, [savedSolution]);

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
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
              <div>
                <p className="problem-desc__number">Problem {problem.number}</p>
                <h1 className="problem-desc__title">{problem.title}</h1>
              </div>
              <button
                className={`btn ${showSolution ? 'btn--secondary' : 'btn--ghost'} btn--sm`}
                onClick={() => setShowSolution(!showSolution)}
                id="toggle-solution"
                style={{ flexShrink: 0, marginTop: 4, display: 'inline-flex', alignItems: 'center', gap: 6 }}
                title={showSolution ? 'Hide Reference Solution' : 'View Reference Solution'}
              >
                <span>💡</span> {showSolution ? 'Hide Solution' : 'Solution'}
              </button>
            </div>
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

          {/* Reference Solution view located above the description */}
          {showSolution && (
            <div
              className="solution-preview"
              style={{
                margin: '16px 0',
                padding: '16px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-focus)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-sm)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                <span
                  style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    color: 'var(--brand-primary)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  Reference Solution (Java)
                </span>
                <button
                  className="btn btn--ghost btn--xs"
                  onClick={() => {
                    navigator.clipboard.writeText(problem.solution);
                  }}
                  title="Copy reference solution"
                >
                  Copy Code
                </button>
              </div>
              <pre style={{ margin: 0, maxHeight: 320, overflowY: 'auto', background: 'var(--bg-primary)' }}>
                <code>{problem.solution}</code>
              </pre>
            </div>
          )}

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
        </section>

        {/* Right panel — editor + test cases */}
        <section className="workspace__editor-area" aria-label="Code editor">
          <div className="workspace__toolbar">
            <div className="workspace__toolbar-left">
              <span className="workspace__lang-badge">Java</span>
              {saveStatus === 'saved' && (
                <span
                  className="workspace__save-status"
                  title="Your code is automatically saved in your browser on this device"
                >
                  <span className="workspace__save-dot" /> Autosaved
                </span>
              )}
              {saveStatus === 'saving' && (
                <span className="workspace__save-status">
                  <span className="workspace__save-dot workspace__save-dot--saving" /> Saving...
                </span>
              )}
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {savedSolution && code !== savedSolution.code && (
                <button
                  className="btn btn--ghost btn--sm"
                  onClick={handleLoadSavedSolution}
                  title={`Restore your saved solution from ${savedSolution.savedAt}`}
                  id="btn-restore-solution"
                >
                  ↺ Load Saved Solution
                </button>
              )}
              <button
                className="btn btn--ghost btn--sm"
                onClick={handleReset}
                id="btn-reset"
                title="Reset code back to starter template"
              >
                Reset
              </button>
              <button
                className="btn btn--secondary btn--sm"
                onClick={handleRun}
                disabled={runState.status === 'running' || cooldown > 0}
                id="btn-run"
                style={{
                  opacity: runState.status === 'running' || cooldown > 0 ? 0.7 : 1,
                  cursor: runState.status === 'running' || cooldown > 0 ? 'not-allowed' : 'pointer',
                  minWidth: 96,
                }}
              >
                {runState.status === 'running'
                  ? 'Compiling...'
                  : cooldown > 0
                  ? `Wait ${cooldown}s`
                  : '▶ Run Code'}
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
              onChange={(value) => handleCodeChange(value || '')}
              beforeMount={(monaco) => {
                monaco.editor.defineTheme('leetcode-dark', {
                  base: 'vs-dark',
                  inherit: true,
                  rules: [],
                  colors: {
                    'editor.background': '#1a1a1a',
                    'editor.lineHighlightBackground': '#262626',
                    'editorGutter.background': '#1a1a1a',
                  },
                });
              }}
              theme={isDark ? 'leetcode-dark' : 'light'}
              loading={
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100%',
                    background: isDark ? '#1a1a1a' : '#ffffff',
                    color: 'var(--text-tertiary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--text-xs)',
                  }}
                >
                  Loading editor...
                </div>
              }
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
                {savedSolution && (
                  <button
                    className={`workspace__testcase-tab ${activeTab === 'saved_solution' ? 'workspace__testcase-tab--active' : ''}`}
                    onClick={() => setActiveTab('saved_solution')}
                    id="tab-saved-solution"
                  >
                    My Solution 💾
                  </button>
                )}
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
              {activeTab === 'saved_solution' && savedSolution && (
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <div>
                      <span style={{ color: 'var(--success)', fontWeight: 600, fontSize: 'var(--text-xs)' }}>
                        ✓ Saved in browser
                      </span>
                      <span style={{ marginLeft: 8, fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                        {savedSolution.savedAt} · {savedSolution.runtime}
                      </span>
                    </div>
                    <button
                      className="btn btn--secondary btn--sm"
                      onClick={handleLoadSavedSolution}
                      id="btn-load-saved-code"
                    >
                      Load into Editor ↺
                    </button>
                  </div>
                  <div className="workspace__testcase-field">
                    <pre
                      style={{
                        margin: 0,
                        padding: '12px',
                        background: 'var(--bg-primary)',
                        border: '1px solid var(--border-default)',
                        borderRadius: 'var(--radius-md)',
                        fontSize: 'var(--text-xs)',
                        fontFamily: 'var(--font-mono)',
                        overflowX: 'auto',
                        maxHeight: 220,
                        color: 'var(--text-primary)',
                        lineHeight: 1.5,
                      }}
                    >
                      <code>{savedSolution.code}</code>
                    </pre>
                  </div>
                </div>
              )}

              {activeTab === 'testcase' && (
                <div>
                  {/* Selectable Test Cases */}
                  {testCases.length > 1 && (
                    <div style={{ display: 'flex', gap: 8, marginBottom: 16, flexWrap: 'wrap' }}>
                      {testCases.map((tc, idx) => (
                        <button
                          key={tc.id || idx}
                          className={`btn btn--xs ${selectedTestCaseIndex === idx ? 'btn--secondary' : 'btn--ghost'}`}
                          onClick={() => setSelectedTestCaseIndex(idx)}
                          id={`btn-case-${idx + 1}`}
                          style={{
                            borderRadius: 'var(--radius-full)',
                            padding: '4px 14px',
                            fontSize: 'var(--text-xs)',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            borderColor: selectedTestCaseIndex === idx ? 'var(--border-focus)' : 'var(--border-default)',
                            background: selectedTestCaseIndex === idx ? 'var(--bg-tertiary)' : 'transparent',
                            color: selectedTestCaseIndex === idx ? 'var(--text-primary)' : 'var(--text-secondary)',
                            cursor: 'pointer',
                          }}
                        >
                          {tc.label || `Case ${idx + 1}`}
                        </button>
                      ))}
                    </div>
                  )}

                  {testCases[selectedTestCaseIndex]?.input && (
                    <div className="workspace__testcase-field">
                      <p className="workspace__testcase-label">Input</p>
                      <div className="workspace__testcase-value">
                        {testCases[selectedTestCaseIndex].input}
                      </div>
                    </div>
                  )}

                  <div className="workspace__testcase-field">
                    <p className="workspace__testcase-label">Expected Output</p>
                    <div className="workspace__testcase-value">
                      {testCases[selectedTestCaseIndex]?.expectedOutput || problem.expectedOutput}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'result' && (
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

                  {/* Struggle Diagnostic Alert */}
                  {diagnostic && (
                    <div
                      style={{
                        marginTop: 14,
                        padding: '10px 14px',
                        background: 'rgba(255, 161, 22, 0.08)',
                        border: '1px solid rgba(255, 161, 22, 0.3)',
                        borderRadius: 'var(--radius-md)',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 10,
                      }}
                    >
                      <span style={{ fontSize: '16px' }}>💡</span>
                      <div>
                        <p style={{ margin: 0, fontSize: 'var(--text-xs)', fontWeight: 700, color: 'var(--accent-primary)' }}>
                          {diagnostic.title}
                        </p>
                        <p style={{ margin: '2px 0 0', fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                          {diagnostic.tip}
                        </p>
                      </div>
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
