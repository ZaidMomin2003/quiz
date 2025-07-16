
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getAuth, signInWithPopup, signOut, onAuthStateChanged, User as FirebaseUser } from 'firebase/auth';
import { auth, googleProvider } from '@/lib/firebase';


// A simple in-memory user object for demonstration
type User = {
  name: string;
  email: string;
  uid: string;
};

interface AuthContextType {
  user: User | null;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
            const { displayName, email, uid } = firebaseUser;
            if (displayName && email) {
                 const appUser: User = { name: displayName, email, uid };
                 setUser(appUser);
                 sessionStorage.setItem('quizforge_user', JSON.stringify(appUser));
            }
        } else {
            setUser(null);
            sessionStorage.removeItem('quizforge_user');
        }
        setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async (): Promise<void> => {
    setLoading(true);
    try {
        const result = await signInWithPopup(auth, googleProvider);
        const firebaseUser = result.user;
        if (firebaseUser.displayName && firebaseUser.email) {
             const onboardingComplete = localStorage.getItem(`onboarding_complete_${firebaseUser.email}`);
            if (onboardingComplete) {
                router.push('/dashboard');
            } else {
                router.push('/onboarding/welcome');
            }
        }
    } catch (error) {
        console.error("Error during Google sign-in:", error);
        // Handle errors here, e.g., show a toast notification
    } finally {
        setLoading(false);
    }
  };


  const logout = async () => {
    setLoading(true);
    try {
        await signOut(auth);
        router.push('/');
    } catch(error) {
        console.error("Error signing out: ", error);
    } finally {
        setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
