"use client";

import { useCurrentUser } from "./components/context/authContext";
import Home from "./components/home";
import Landing from "./components/landing";

export default function Page() {
  const { currentUser, loading } = useCurrentUser();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <h1>Loading....</h1>
      </div>
    );
  }

  return <div>{currentUser ? <Home /> : <Landing />}</div>;
}
