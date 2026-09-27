import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import GoogleSignInButton from './GoogleSignInButton';

export default function LoginModal({
  isOpen,
  onClose,
  onSuccess,
  onGuestContinue,
  guestButtonText = 'Save locally on this device as guest →',
  title = 'Sign In with Google',
  subtitle = 'Sign in to save your solved status and track preparation across sessions.',
}) {
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSignIn = async () => {
    try {
      setLoading(true);
      setError(null);
      await loginWithGoogle();
      if (onSuccess) {
        onSuccess();
      }
      onClose();
    } catch (err) {
      if (err?.code !== 'auth/popup-closed-by-user') {
        setError('Sign in failed. Please check your connection and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close modal"
          id="modal-close"
        >
          ✕
        </button>

        <div className="modal-icon" aria-hidden="true">&lt;/&gt;</div>
        <h2 className="modal-title" id="modal-title">{title}</h2>
        <p className="modal-subtitle">{subtitle}</p>

        {error && (
          <div
            style={{
              color: 'var(--difficulty-hard)',
              fontSize: 'var(--text-xs)',
              marginBottom: 12,
            }}
          >
            {error}
          </div>
        )}

        <div style={{ marginTop: 16 }}>
          <GoogleSignInButton onClick={handleSignIn} disabled={loading} />
        </div>

        {onGuestContinue && (
          <div style={{ marginTop: 14 }}>
            <button
              className="btn btn--ghost btn--sm"
              onClick={() => {
                onGuestContinue();
                onClose();
              }}
              id="modal-guest-btn"
            >
              {guestButtonText}
            </button>
          </div>
        )}

        <p className="modal-footer-note">
          100% Free. Your written code will remain safe in the editor.
        </p>
      </div>
    </div>
  );
}
