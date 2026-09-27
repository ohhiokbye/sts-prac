import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getAllProblems, getTopics } from '../data/problems';

export default function ProgressPage() {
  const { user, solvedProblems, loginWithGoogle } = useAuth();
  const allProblems = getAllProblems();
  const topics = getTopics().filter((t) => t !== 'All');

  const solvedSet = useMemo(() => {
    return new Set(solvedProblems || []);
  }, [solvedProblems]);

  const totalSolved = solvedSet.size;
  const totalProblems = allProblems.length;
  const progressPct = totalProblems > 0 ? (totalSolved / totalProblems) * 100 : 0;

  // Stats by difficulty
  const byDifficulty = useMemo(() => {
    const stats = { Easy: { total: 0, solved: 0 }, Medium: { total: 0, solved: 0 }, Hard: { total: 0, solved: 0 } };
    allProblems.forEach((p) => {
      stats[p.difficulty].total++;
      if (solvedSet.has(p.id)) stats[p.difficulty].solved++;
    });
    return stats;
  }, [allProblems, solvedSet]);

  // Stats by topic
  const byTopic = useMemo(() => {
    const stats = {};
    allProblems.forEach((p) => {
      if (!stats[p.topic]) stats[p.topic] = { total: 0, solved: 0 };
      stats[p.topic].total++;
      if (solvedSet.has(p.id)) stats[p.topic].solved++;
    });
    return stats;
  }, [allProblems, solvedSet]);

  return (
    <main className="container container--narrow">
      <header className="page-header">
        <h1 className="page-header__title">Your Progress</h1>
        <p className="page-header__subtitle">Track your STS exam preparation</p>
      </header>

      {!user && (
        <section
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-default)',
            borderRadius: 'var(--radius-lg)',
            padding: 'var(--space-4) var(--space-6)',
            marginBottom: 'var(--space-6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            flexWrap: 'wrap',
            boxShadow: 'var(--shadow-sm)',
          }}
        >
          <div>
            <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>
              Saved locally on this device
            </p>
            <p style={{ fontSize: 'var(--text-xs)', color: 'var(--text-secondary)', marginTop: 2 }}>
              Sign in with Google to backup your progress to the cloud and sync across devices.
            </p>
          </div>
          <button
            className="btn btn--secondary btn--sm"
            onClick={loginWithGoogle}
            id="progress-signin-btn"
          >
            Sync with Google
          </button>
        </section>
      )}

      {/* Overall */}
      <section style={{ marginBottom: 40 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
          <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-secondary)' }}>Overall</span>
          <span style={{ fontSize: 'var(--text-sm)', fontWeight: 600 }}>
            {totalSolved}/{totalProblems} solved
          </span>
        </div>
        <div className="progress-bar" style={{ height: 8 }}>
          <div className="progress-bar__fill" style={{ width: `${progressPct}%` }} />
        </div>
      </section>

      {/* By difficulty */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 16 }}>By Difficulty</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {['Easy', 'Medium', 'Hard'].map((diff) => {
            const { total, solved } = byDifficulty[diff];
            const pct = total > 0 ? (solved / total) * 100 : 0;
            return (
              <div key={diff}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span className={`problem-list__difficulty problem-list__difficulty--${diff.toLowerCase()}`}>
                    {diff}
                  </span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                    {solved}/{total}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar__fill"
                    style={{
                      width: `${pct}%`,
                      background: `var(--difficulty-${diff.toLowerCase()})`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* By topic */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 16 }}>By Topic</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {topics.map((t) => {
            const stat = byTopic[t] || { total: 0, solved: 0 };
            const pct = stat.total > 0 ? (stat.solved / stat.total) * 100 : 0;
            return (
              <div key={t}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 'var(--text-sm)', color: 'var(--text-primary)' }}>{t}</span>
                  <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>
                    {stat.solved}/{stat.total}
                  </span>
                </div>
                <div className="progress-bar">
                  <div className="progress-bar__fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Recently solved */}
      {totalSolved > 0 && (
        <section>
          <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 600, marginBottom: 16 }}>Solved Problems</h2>
          <div className="problem-list">
            {allProblems
              .filter((p) => solvedSet.has(p.id))
              .map((p) => (
                <Link
                  key={p.id}
                  to={`/problem/${p.id}`}
                  className="problem-list__row"
                  style={{ gridTemplateColumns: '1fr 100px 100px' }}
                >
                  <span className="problem-list__title">{p.title}</span>
                  <span className="problem-list__topic">{p.topic}</span>
                  <span
                    className={`problem-list__difficulty problem-list__difficulty--${p.difficulty.toLowerCase()}`}
                  >
                    {p.difficulty}
                  </span>
                </Link>
              ))}
          </div>
        </section>
      )}

      {totalSolved === 0 && (
        <div className="empty-state">
          <p className="empty-state__title">No problems solved yet</p>
          <p className="empty-state__desc">
            Start solving problems and your progress will appear here.
          </p>
          <Link to="/" className="btn btn--primary" style={{ marginTop: 16 }}>
            Start Practicing
          </Link>
        </div>
      )}
    </main>
  );
}
