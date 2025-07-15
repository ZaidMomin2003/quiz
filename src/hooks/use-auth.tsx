
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';

// A simple in-memory user object for demonstration
type User = {
  name: string;
  email: string;
};

interface AuthContextType {
  user: User | null;
  login: (email: string, pass: string) => Promise<void>;
  signup: (name: string, email: string, pass: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// In-memory user store for demonstration.
// In a real app, you would use a database.
const users: { [email: string]: { password: string, name: string} } = {
  "user@example.com": { password: "password123", name: "Demo User" }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if user is logged in from a previous session
    const loggedInUser = sessionStorage.getItem('quizforge_user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, pass: string): Promise<void> => {
     return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (users[email] && users[email].password === pass) {
            const loggedInUser = { email, name: users[email].name };
            setUser(loggedInUser);
            sessionStorage.setItem('quizforge_user', JSON.stringify(loggedInUser));
            router.push("/dashboard");
            resolve();
        } else {
            reject(new Error("Invalid email or password"));
        }
      }, 500);
    });
  };

  const signup = async (name: string, email: string, pass: string): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (users[email]) {
          reject(new Error("User with this email already exists"));
        } else {
          users[email] = { password: pass, name: name };
          const newUser = { email, name };
          setUser(newUser);
          sessionStorage.setItem('quizforge_user', JSON.stringify(newUser));
          localStorage.removeItem(`onboarding_complete_${email}`);
          localStorage.removeItem(`onboarding_data_${email}`);
          router.push("/onboarding/welcome");
          resolve();
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('quizforge_user');
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
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
