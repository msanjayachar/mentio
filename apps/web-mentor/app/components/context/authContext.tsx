"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { LoginUserApiResponseSchema, MeApiSchema } from "@shared/api/auth";
import { ErrorCodes } from "@shared/types";

type LoginUser = {
  userId: string;
  name: string;
  email: string;
};

type CurrentUserContextType = {
  currentUser: LoginUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
};

const CurrentUserContext = createContext<CurrentUserContextType | null>(null);

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<LoginUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const json = await response.json();

      const parsed = LoginUserApiResponseSchema.safeParse(json);

      if (!parsed.success) {
        throw ErrorCodes.INTERNAL_SERVER_ERROR;
      }

      const res = parsed.data;

      if (res.success === false) {
        throw res.error;
      }

      setToken(res.data.token);
      setCurrentUser(res.data.user);

      localStorage.setItem("token", res.data.token);
    } catch (error) {
      if (typeof error === "string") throw error;
      throw ErrorCodes.INTERNAL_SERVER_ERROR;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
    setToken(null);
  };

  const restoreSession = async () => {
    const tkn = localStorage.getItem("token");

    if (!tkn) {
      setCurrentUser(null);
      setLoading(false);
      return;
    }

    setToken(tkn);
    setLoading(true);

    try {
      const response = await fetch("http://localhost:8000/api/auth/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${tkn}`,
        },
      });

      const json = await response.json();

      const parsed = MeApiSchema.safeParse(json);

      if (!parsed.success) {
        throw ErrorCodes.INTERNAL_SERVER_ERROR;
      }

      const res = parsed.data;

      if (res.success === false) {
        throw res.error;
      }

      setCurrentUser(res.data);
    } catch (error) {
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
      value={{ currentUser, token, login, logout, loading }}
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
