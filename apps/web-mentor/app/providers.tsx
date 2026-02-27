"use client";

import { CurrentUserProvider } from "./components/context/authContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <CurrentUserProvider>{children}</CurrentUserProvider>;
}
