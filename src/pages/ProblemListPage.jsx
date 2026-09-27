import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getFilteredProblems, getAllProblems } from '../data/problems';

export default function ProblemListPage() {
  const { solvedProblems } = useAuth();
  // Default to 'FAT' which shows all questions
  const [exam, setExam] = useState('FAT');
  const [difficulty, setDifficulty] = useState('All');
  const [search, setSearch] = useState('');

  const allProblems = getAllProblems();

  const filteredProblems = useMemo(
    () => getFilteredProblems({ exam, difficulty, search }),
    [exam, difficulty, search]
  );

  const solvedSet = useMemo(() => {
    return new Set(solvedProblems || []);
  }, [solvedProblems]);

  const solvedCount = solvedSet.size;
  const totalCount = allProblems.length;
  const progressPct = totalCount > 0 ? (solvedCount / totalCount) * 100 : 0;

  return (
    <main className="container">
      <header className="page-header">
        <h1 className="page-header__title">Problems</h1>
        <p className="page-header__subtitle">
          Practice Java for your STS exam
        </p>
      </header>

      {/* Stats */}
      <div className="stats-bar">
        <div className="stats-bar__item">
          <span className="stats-bar__label">Solved</span>
          <span className="stats-bar__value stats-bar__value--success">
            {solvedCount}/{totalCount}
          </span>
        </div>
        <div className="stats-bar__item" style={{ flex: 1, justifyContent: 'center' }}>
          <span className="stats-bar__label">Progress</span>
          <div className="progress-bar" style={{ marginTop: 8 }}>
            <div className="progress-bar__fill" style={{ width: `${progressPct}%` }} />
          </div>
        </div>
      </div>

      {/* Filter buttons: CAT 1, CAT 2, FAT */}
      <div className="exam-filter" role="group" aria-label="Filter by exam" style={{ marginBottom: 'var(--space-4)' }}>
        <button
          className={`exam-pill ${exam === 'CAT 1' ? 'exam-pill--active' : ''}`}
          onClick={() => setExam('CAT 1')}
          id="exam-filter-cat1"
        >
          CAT 1
        </button>
        <button
          className={`exam-pill ${exam === 'CAT 2' ? 'exam-pill--active' : ''}`}
          onClick={() => setExam('CAT 2')}
          id="exam-filter-cat2"
        >
          CAT 2
        </button>
        <button
          className={`exam-pill ${exam === 'FAT' ? 'exam-pill--active' : ''}`}
          onClick={() => setExam('FAT')}
          id="exam-filter-fat"
        >
          FAT
        </button>
      </div>

      {/* Search + Difficulty */}
      <div className="controls-row">
        <input
          type="search"
          className="search-input"
          placeholder="Search problems by name or algorithm..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search problems"
          id="problem-search"
        />
        <div className="diff-filter" role="group" aria-label="Filter by difficulty">
          {['All', 'Easy', 'Medium', 'Hard'].map((d) => (
            <button
              key={d}
              className={`diff-filter__btn ${difficulty === d ? 'diff-filter__btn--active' : ''}`}
              onClick={() => setDifficulty(d)}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* Problem table */}
      <div className="problem-list" role="table" aria-label="Problem list">
        <div className="problem-list__header" role="row">
          <span role="columnheader">Status</span>
          <span role="columnheader">Title</span>
          <span role="columnheader">Topic</span>
          <span role="columnheader">Difficulty</span>
          <span role="columnheader">#</span>
        </div>

        {filteredProblems.length === 0 ? (
          <div className="empty-state">
            <p className="empty-state__title">No problems found</p>
            <p className="empty-state__desc">
              Try adjusting your filters or search query.
            </p>
          </div>
        ) : (
          filteredProblems.map((problem, idx) => (
            <Link
              key={problem.id}
              to={`/problem/${problem.id}`}
              className="problem-list__row"
              role="row"
              id={`problem-${problem.id}`}
              style={{ animationDelay: `${Math.min(idx * 24, 380)}ms` }}
            >
              <span className="problem-list__status" role="cell">
                {solvedSet.has(problem.id) ? (
                  <span
                    style={{
                      color: 'var(--success)',
                      fontWeight: 700,
                      fontSize: 'var(--text-sm)',
                      lineHeight: 1,
                    }}
                    title="Solved"
                  >
                    ✓
                  </span>
                ) : (
                  <span
                    className="problem-list__status-dot"
                    title="Not solved"
                  />
                )}
              </span>
              <span className="problem-list__title" role="cell">
                {problem.title}
              </span>
              <span className="problem-list__topic" role="cell">
                {problem.topic}
              </span>
              <span
                className={`problem-list__difficulty problem-list__difficulty--${problem.difficulty.toLowerCase()}`}
                role="cell"
              >
                {problem.difficulty}
              </span>
              <span className="problem-list__number" role="cell">
                {problem.number}
              </span>
            </Link>
          ))
        )}
      </div>
    </main>
  );
}
