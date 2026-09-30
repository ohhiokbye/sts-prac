import { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, signInWithPopup, signOut } from 'firebase/auth';
import { doc, setDoc, getDoc, serverTimestamp, arrayUnion } from 'firebase/firestore';
import { auth, db, googleProvider } from '../firebase/init';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [localSolved, setLocalSolved] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('stsprac_solved') || '[]');
    } catch {
      return [];
    }
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      try {
        if (firebaseUser) {
          let userSolved = [];

          // Try syncing with Firestore, but gracefully fall back to local storage if network or permissions fail
          try {
            const userRef = doc(db, 'users', firebaseUser.uid);
            const userSnap = await getDoc(userRef);

            const currentLocal = (() => {
              try {
                return JSON.parse(localStorage.getItem('stsprac_solved') || '[]');
              } catch {
                return [];
              }
            })();

            if (!userSnap.exists()) {
              userSolved = Array.from(new Set(currentLocal));
              await setDoc(userRef, {
                uid: firebaseUser.uid,
                displayName: firebaseUser.displayName,
                email: firebaseUser.email,
                photoURL: firebaseUser.photoURL,
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
                solvedProblems: userSolved,
              });
            } else {
              const remoteSolved = userSnap.data()?.solvedProblems || [];
              const hasNewLocal = currentLocal.some((id) => !remoteSolved.includes(id));
              userSolved = Array.from(new Set([...remoteSolved, ...currentLocal]));

              // Only issue a setDoc write if there is newly solved offline progress to merge
              if (hasNewLocal) {
                await setDoc(
                  userRef,
                  {
                    lastLogin: serverTimestamp(),
                    solvedProblems: userSolved,
                  },
                  { merge: true }
                );
              }
            }
          } catch (firestoreErr) {
            console.warn('Firestore sync failed, continuing with local storage:', firestoreErr);
            userSolved = (() => {
              try {
                return JSON.parse(localStorage.getItem('stsprac_solved') || '[]');
              } catch {
                return [];
              }
            })();
          }

          // Keep local cache synced
          try {
            localStorage.setItem('stsprac_solved', JSON.stringify(userSolved));
            setLocalSolved(userSolved);
          } catch {}

          setUser({
            uid: firebaseUser.uid,
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            photoURL: firebaseUser.photoURL,
            solvedProblems: userSolved,
          });
        } else {
          setUser(null);
        }
      } catch (err) {
        console.error('onAuthStateChanged error:', err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const markProblemSolved = async (problemId) => {
    const updatedLocal = Array.from(new Set([...localSolved, problemId]));
    setLocalSolved(updatedLocal);
    try {
      localStorage.setItem('stsprac_solved', JSON.stringify(updatedLocal));
    } catch {}

    if (user) {
      try {
        const userRef = doc(db, 'users', user.uid);
        await setDoc(userRef, { solvedProblems: arrayUnion(problemId) }, { merge: true });
        setUser((prev) =>
          prev
            ? {
                ...prev,
                solvedProblems: Array.from(new Set([...(prev.solvedProblems || []), problemId])),
              }
            : null
        );
      } catch (err) {
        console.error('Firestore save error:', err);
      }
    }
  };

  const loginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return result.user;
    } catch (error) {
      console.error('Auth error:', error.code);
      throw error;
    }
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    window.location.href = '/';
  };

  const solvedProblems = user ? user.solvedProblems || [] : localSolved;

  return (
    <AuthContext.Provider
      value={{
        user,
        solvedProblems,
        markProblemSolved,
        loading,
        loginWithGoogle,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
