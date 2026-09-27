import { useState, useMemo, useEffect, useCallback } from 'react';
import { getFilteredMcqs, mcqs } from '../data/mcqs';

const STORAGE_KEY = 'sts_mcq_answers';

export default function McqPage() {
  const [exam, setExam] = useState('FAT');
  const [search, setSearch] = useState('');
  const [userAnswers, setUserAnswers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Save answers to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(userAnswers));
    } catch (e) {
      console.error('Failed to save MCQ answers to localStorage', e);
    }
  }, [userAnswers]);

  const filteredQuestions = useMemo(() => {
    return getFilteredMcqs({ exam, search });
  }, [exam, search]);

  const handleSelectOption = useCallback((questionId, optionIndex) => {
    setUserAnswers((prev) => {
      // Don't overwrite if already answered, or allow retrying
      if (prev[questionId] !== undefined) return prev;
      return {
        ...prev,
        [questionId]: optionIndex,
      };
    });
  }, []);

  const handleReset = useCallback(() => {
    if (window.confirm('Are you sure you want to reset your quiz answers?')) {
      setUserAnswers({});
      try {
        localStorage.removeItem(STORAGE_KEY);
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Compute metrics across all 50 questions
  const totalQuestions = mcqs.length;
  const answeredCount = Object.keys(userAnswers).length;
  const correctCount = useMemo(() => {
    return Object.entries(userAnswers).reduce((count, [qId, selectedIdx]) => {
      const q = mcqs.find((m) => m.id === Number(qId));
      if (q && q.correctIndex === selectedIdx) {
        return count + 1;
      }
      return count;
    }, 0);
  }, [userAnswers]);

  const accuracyPct = answeredCount > 0 ? Math.round((correctCount / answeredCount) * 100) : 0;

  return (
    <main className="container mcq-page">
      <header className="page-header">
        <div className="mcq-header-top">
          <div>
            <h1 className="page-header__title">STS MCQ Practice</h1>
            <p className="page-header__subtitle">
              50 high-yield questions for CAT 1, CAT 2, and FAT examinations
            </p>
          </div>
          {answeredCount > 0 && (
            <button
              className="btn btn--ghost btn--sm"
              onClick={handleReset}
              id="mcq-reset-btn"
            >
              Reset Answers
            </button>
          )}
        </div>
      </header>

      {/* Stats Bar */}
      <div className="stats-bar mcq-stats-bar">
        <div className="stats-bar__item">
          <span className="stats-bar__label">Total Question Bank</span>
          <span className="stats-bar__value">{totalQuestions}</span>
        </div>
        <div className="stats-bar__item">
          <span className="stats-bar__label">Answered</span>
          <span className="stats-bar__value">
            {answeredCount} / {totalQuestions}
          </span>
        </div>
        <div className="stats-bar__item">
          <span className="stats-bar__label">Accuracy</span>
          <span className="stats-bar__value stats-bar__value--success">
            {accuracyPct}% ({correctCount} correct)
          </span>
        </div>
        <div className="stats-bar__item" style={{ flex: 1 }}>
          <span className="stats-bar__label">Overall Progress</span>
          <div className="progress-bar" style={{ marginTop: 8 }}>
            <div
              className="progress-bar__fill"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filter buttons: CAT 1, CAT 2, FAT */}
      <div className="exam-filter" role="group" aria-label="Filter by exam" style={{ marginBottom: 'var(--space-4)' }}>
        <button
          className={`exam-pill ${exam === 'CAT 1' ? 'exam-pill--active' : ''}`}
          onClick={() => setExam('CAT 1')}
          id="exam-cat1"
        >
          CAT 1
        </button>
        <button
          className={`exam-pill ${exam === 'CAT 2' ? 'exam-pill--active' : ''}`}
          onClick={() => setExam('CAT 2')}
          id="exam-cat2"
        >
          CAT 2
        </button>
        <button
          className={`exam-pill ${exam === 'FAT' ? 'exam-pill--active' : ''}`}
          onClick={() => setExam('FAT')}
          id="exam-fat"
        >
          FAT
        </button>
      </div>

      {/* Search Input */}
      <div className="controls-row">
        <input
          type="search"
          className="search-input"
          placeholder="Search question keywords, topics, or options..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search questions"
          id="mcq-search"
        />
        <div className="mcq-count-badge">
          Showing {filteredQuestions.length} questions
        </div>
      </div>

      {/* MCQ Question List */}
      <div className="mcq-list">
        {filteredQuestions.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__title">No questions match your filter</p>
            <p className="empty-state__desc">
              Try choosing "All" or searching for a different keyword.
            </p>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const selectedIdx = userAnswers[q.id];
            const isAnswered = selectedIdx !== undefined;
            const isCorrect = isAnswered && selectedIdx === q.correctIndex;

            return (
              <div
                key={q.id}
                className={`mcq-card ${
                  isAnswered
                    ? isCorrect
                      ? 'mcq-card--correct'
                      : 'mcq-card--incorrect'
                    : ''
                }`}
                id={`mcq-card-${q.id}`}
              >
                <div className="mcq-card__header">
                  <div className="mcq-card__badges">
                    <span className="mcq-card__qnum">Q{q.id}</span>
                    <span
                      className={`exam-badge exam-badge--${q.exam.toLowerCase().replace(/\s+/g, '')}`}
                    >
                      {q.exam}
                    </span>
                    <span className="mcq-card__topic">{q.topic}</span>
                  </div>
                  {isAnswered && (
                    <span
                      className={`mcq-card__status-tag ${
                        isCorrect
                          ? 'mcq-card__status-tag--correct'
                          : 'mcq-card__status-tag--incorrect'
                      }`}
                    >
                      {isCorrect ? '✓ Correct' : '✕ Incorrect'}
                    </span>
                  )}
                </div>

                <p className="mcq-card__question">{q.question}</p>

                <div className="mcq-card__options" role="radiogroup">
                  {q.options.map((option, optIdx) => {
                    const isSelected = selectedIdx === optIdx;
                    const isTargetCorrect = q.correctIndex === optIdx;

                    let optionClass = 'mcq-option';
                    if (isAnswered) {
                      if (isSelected && isCorrect) {
                        optionClass += ' mcq-option--correct';
                      } else if (isSelected && !isCorrect) {
                        optionClass += ' mcq-option--wrong';
                      } else if (isTargetCorrect) {
                        optionClass += ' mcq-option--show-correct';
                      } else {
                        optionClass += ' mcq-option--muted';
                      }
                    }

                    const optLetter = String.fromCharCode(65 + optIdx);

                    return (
                      <button
                        key={optIdx}
                        className={optionClass}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        disabled={isAnswered}
                        role="radio"
                        aria-checked={isSelected}
                      >
                        <span className="mcq-option__letter">{optLetter}</span>
                        <span className="mcq-option__text">{option}</span>
                        {isAnswered && isSelected && isCorrect && (
                          <span className="mcq-option__icon">✓</span>
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <span className="mcq-option__icon">✕</span>
                        )}
                        {isAnswered && !isSelected && isTargetCorrect && (
                          <span className="mcq-option__icon mcq-option__icon--hint">✓ Correct</span>
                        )}
                      </button>
                    );
                  })}
                </div>

                {isAnswered && (
                  <div className="mcq-explanation">
                    <div className="mcq-explanation__title">
                      <span className="mcq-explanation__icon">💡</span>
                      Explanation
                    </div>
                    <p className="mcq-explanation__text">{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </main>
  );
}
