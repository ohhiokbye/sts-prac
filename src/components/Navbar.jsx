import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar" role="navigation" aria-label="Main navigation">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand" id="nav-brand">
          <span className="navbar__brand-icon" aria-hidden="true">Oh</span>
          STS Practice
        </Link>

        <div className="navbar__links">
          <Link
            to="/"
            className={`navbar__link ${isActive('/') ? 'navbar__link--active' : ''}`}
            id="nav-problems"
          >
            Problems
          </Link>
          <Link
            to="/mcq"
            className={`navbar__link ${isActive('/mcq') ? 'navbar__link--active' : ''}`}
            id="nav-mcq"
          >
            MCQ Practice
          </Link>
          <Link
            to="/progress"
            className={`navbar__link ${isActive('/progress') ? 'navbar__link--active' : ''}`}
            id="nav-progress"
          >
            Progress
          </Link>
        </div>

        <div className="navbar__actions">
          <ThemeToggle />
          {user ? (
            <>
              <div className="navbar__user">
                {user.photoURL && (
                  <img
                    className="navbar__avatar"
                    src={user.photoURL}
                    alt=""
                    referrerPolicy="no-referrer"
                  />
                )}
                <span className="navbar__username">{user.displayName?.split(' ')[0]}</span>
              </div>
              <button className="btn btn--ghost btn--sm" onClick={logout} id="nav-logout">
                Sign out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="btn btn--secondary btn--sm"
              id="nav-login"
            >
              Sign in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}
