import React, { createContext, useContext, useEffect, useState } from 'react';
import { 
  User, 
  signInWithPopup, 
  signInWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider } from '../lib/firebase';

export const WHITELISTED_ADMINS = [
  'dnyanai2214@gmail.com',
  'dcompany1410@gmail.com'
];

interface AuthContextType {
  currentUser: User | null;
  isAdmin: boolean;
  isSuperAdmin: boolean;
  loading: boolean;
  error: string | null;
  signInWithGoogle: () => Promise<void>;
  signInWithEmail: (email: string, pass: string) => Promise<void>;
  logout: () => Promise<void>;
  loginAsDemoAdmin: () => void;
  isDemoAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isDemoAdmin, setIsDemoAdmin] = useState<boolean>(() => {
    return localStorage.getItem('dcbody_demo_admin') === 'true';
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  const email = currentUser?.email?.toLowerCase() || '';
  const isWhitelisted = WHITELISTED_ADMINS.includes(email);
  const isAdmin = isDemoAdmin || isWhitelisted;
  const isSuperAdmin = isDemoAdmin || email === 'dnyanai2214@gmail.com' || email === 'dcompany1410@gmail.com';

  const signInWithGoogle = async () => {
    setError(null);
    try {
      const res = await signInWithPopup(auth, googleProvider);
      const userEmail = res.user.email?.toLowerCase() || '';
      if (!WHITELISTED_ADMINS.includes(userEmail)) {
        throw new Error(`Unauthorized: ${userEmail} is not in the whitelist.`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Google Sign-in failed';
      setError(message);
      throw err;
    }
  };

  const signInWithEmail = async (em: string, pass: string) => {
    setError(null);
    try {
      const res = await signInWithEmailAndPassword(auth, em, pass);
      const userEmail = res.user.email?.toLowerCase() || '';
      if (!WHITELISTED_ADMINS.includes(userEmail)) {
        throw new Error(`Unauthorized: ${userEmail} is not in the whitelist.`);
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Authentication failed';
      setError(message);
      throw err;
    }
  };

  const logout = async () => {
    setIsDemoAdmin(false);
    localStorage.removeItem('dcbody_demo_admin');
    await firebaseSignOut(auth);
  };

  const loginAsDemoAdmin = () => {
    setIsDemoAdmin(true);
    localStorage.setItem('dcbody_demo_admin', 'true');
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        isSuperAdmin,
        loading,
        error,
        signInWithGoogle,
        signInWithEmail,
        logout,
        loginAsDemoAdmin,
        isDemoAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
