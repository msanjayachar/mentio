"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // read token
    const tkn = localStorage.getItem("token");

    // verify token exist
    if (!tkn) {
      router.replace("/login");
    }

    // finally isChecking to false
    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return <div>Loading</div>;
  }

  return <>{children}</>;
};
