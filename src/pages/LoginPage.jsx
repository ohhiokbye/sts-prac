import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleSignInButton from '../components/GoogleSignInButton';
import ThemeToggle from '../components/ThemeToggle';

export default function LoginPage() {
  const { loginWithGoogle } = useAuth();

  return (
    <main className="login-page">
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <ThemeToggle />
      </div>
      <div className="login-card">
        <div className="login-card__icon" aria-hidden="true">&lt;/&gt;</div>
        <h1 className="login-card__title">STS Practice</h1>
        <p className="login-card__subtitle">
          Practice Java coding problems for your STS exam. Solve, learn, and track your progress.
        </p>
        <GoogleSignInButton onClick={loginWithGoogle} />
        <div style={{ marginTop: 16 }}>
          <Link to="/" className="btn btn--ghost btn--sm" id="skip-login">
            Browse problems as guest →
          </Link>
        </div>
        <p className="login-card__footer">
          Sign in with your Google account to run code, verify test cases, and save your progress.
        </p>
      </div>
    </main>
  );
}
