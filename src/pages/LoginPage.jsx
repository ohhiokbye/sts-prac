import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GoogleSignInButton from '../components/GoogleSignInButton';
import ThemeToggle from '../components/ThemeToggle';

export default function LoginPage() {
  const { user, loginWithGoogle, logout } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await loginWithGoogle();
      navigate('/');
    } catch (err) {
      console.error('Google Sign-In Error:', err);
      if (err?.code === 'auth/unauthorized-domain') {
        const domain = window.location.hostname;
        setError({
          type: 'unauthorized-domain',
          domain,
          message: `Domain "${domain}" is not authorized for Google Sign-In in Firebase.`,
        });
      } else if (err?.code === 'auth/popup-blocked') {
        setError({
          type: 'popup-blocked',
          message: 'The Google Sign-In popup was blocked by your browser. Please allow popups for this site and try again.',
        });
      } else if (err?.code === 'auth/popup-closed-by-user') {
        // User closed the popup, clean up without error
        setError(null);
      } else if (err?.code === 'auth/invalid-api-key') {
        setError({
          type: 'api-key',
          message: 'Firebase API key is missing or invalid. Check environment variables in your deployment.',
        });
      } else {
        setError({
          type: 'general',
          message: err?.message || 'Failed to sign in with Google. Please try again.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <div style={{ position: 'absolute', top: 16, right: 16 }}>
        <ThemeToggle />
      </div>
      <div className="login-card">
        <div className="login-card__icon" aria-hidden="true">Oh</div>

        {user ? (
          <>
            <h1 className="login-card__title">Signed In</h1>
            <p className="login-card__subtitle">
              You are currently signed in as <strong>{user.displayName || user.email}</strong>.
            </p>
            {user.photoURL && (
              <img
                src={user.photoURL}
                alt=""
                referrerPolicy="no-referrer"
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  margin: '0 auto 16px',
                  display: 'block',
                  border: '2px solid var(--accent-primary)',
                }}
              />
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
              <Link to="/" className="btn btn--primary btn--lg" id="continue-to-problems">
                Continue to Problems →
              </Link>
              <button
                className="btn btn--ghost btn--sm"
                onClick={logout}
                id="login-signout-btn"
              >
                Sign out
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="login-card__title">STS Practice</h1>
            <p className="login-card__subtitle">
              Practice Java coding problems for your STS exam. Solve, learn, and sync your progress.
            </p>

            {error && (
              <div
                style={{
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--difficulty-hard)',
                  borderRadius: 'var(--radius-md)',
                  padding: '12px 14px',
                  marginBottom: 16,
                  textAlign: 'left',
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-primary)',
                }}
                role="alert"
              >
                <div
                  style={{
                    color: 'var(--difficulty-hard)',
                    fontWeight: 600,
                    marginBottom: 4,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <span>⚠️</span> {error.message}
                </div>
                {error.type === 'unauthorized-domain' && (
                  <div style={{ marginTop: 8, color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                    <div style={{ fontWeight: 600, marginBottom: 4 }}>How to fix in Firebase Console:</div>
                    <ol style={{ paddingLeft: 18, margin: 0 }}>
                      <li>Go to <strong>Firebase Console</strong> → <strong>Authentication</strong></li>
                      <li>Click the <strong>Settings</strong> tab → <strong>Authorized domains</strong></li>
                      <li>Click <strong>Add domain</strong> and enter: <code style={{ color: 'var(--accent-primary)' }}>{error.domain}</code></li>
                      <li>Refresh this page and sign in!</li>
                    </ol>
                  </div>
                )}
              </div>
            )}

            <GoogleSignInButton
              onClick={handleGoogleSignIn}
              disabled={loading}
              loading={loading}
            />

            <div style={{ marginTop: 16 }}>
              <Link to="/" className="btn btn--ghost btn--sm" id="skip-login">
                Browse problems as guest →
              </Link>
            </div>
            <p className="login-card__footer">
              100% Free • No login required to write or run code. Sign in only if you want to sync your solved question history.
            </p>
          </>
        )}
      </div>
    </main>
  );
}
