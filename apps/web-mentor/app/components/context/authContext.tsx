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
  JWT_TOKEN: string;
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
} | null>(null);

export const CurrentUserProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<LoginUser | null>(null);

  return (
    <CurrentUserContext.Provider value={{ currentUser, setCurrentUser }}>
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
