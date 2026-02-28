"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type LoginUser = {
  userId: string;
  name: string;
  email: string;
  role: "mentor" | "mentee";
};

const CurrentUserContext = createContext<{
  currentUser: LoginUser | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
} | null>(null);

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<LoginUser | null>(null);
  const [loading, setLoading] = useState(true);
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Invalid credentials");
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error);
      }

      setCurrentUser(result.data.user);

      localStorage.setItem("token", result.data.token);
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Failed to login");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  const restoreSession = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setCurrentUser(null);
        setLoading(false);
        return;
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error);
      }

      setCurrentUser(result.data);
      setLoading(false);
    } catch {
      localStorage.removeItem("token");
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, login, logout, loading }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};

export function useCurrentUser() {
  const ctx = useContext(CurrentUserContext);

  if (!ctx) {
    throw new Error("Must be used inside CurrentUserContext.Provider");
  }

  return ctx;
}
