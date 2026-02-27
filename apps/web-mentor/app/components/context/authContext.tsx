"use client";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

type LoginUser = {
  token: string;
  user: {
    userId: string;
    name: string;
    email: string;
    role: "mentor" | "mentee";
  };
};

const CurrentUserContext = createContext<{
  currentUser: LoginUser | null;
  setCurrentUser: Dispatch<SetStateAction<LoginUser | null>>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
} | null>(null);

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<LoginUser | null>(null);
  const login = async (email: string, password: string) => {
    try {
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

      setCurrentUser(result.data);

      localStorage.setItem("token", result.data.token);
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("Failed to login");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  };

  return (
    <CurrentUserContext.Provider
      value={{ currentUser, setCurrentUser, login, logout }}
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
