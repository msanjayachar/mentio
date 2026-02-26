"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Logo from "./logo";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const response = await fetch("http://localhost:8000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-2 py-4 text-center">
        <Logo />
        <h1 className="text-center text-4xl">Mentio</h1>
      </div>

      <h1 className="mb-4 text-center text-5xl">Welcome Back!</h1>
      <div className="flex h-auto w-110 flex-col gap-8 rounded-md bg-blue-100 px-16 py-16">
        <button className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-black text-lg">
          <Image
            src="/icons/google-logo.png"
            alt="google-logo"
            width={16}
            height={16}
          />
          <span>Login with Google</span>
        </button>

        <p className="text-md text-center font-light text-gray-400">
          or using email
        </p>

        <input
          placeholder="Enter your email here."
          className="text-md rounded-md border-2 border-gray-300 bg-gray-200 p-2 font-light hover:border-blue-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Enter your password here."
          className="text-md rounded-md border-2 border-gray-300 bg-gray-200 p-2 font-light hover:border-blue-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="text-md h-12 cursor-pointer rounded-full bg-black text-white"
          onClick={() => {
            handleLogin();
            toast.success("Login successful", {
              position: "top-center",
              style: {
                background: "green",
                color: "white",
              },
            });
          }}
        >
          Login
        </button>
      </div>

      <div>
        <p className="mt-4 mb-8 text-center text-sm font-light tracking-wide text-[#6D6D6C]">
          By signing up you accept our terms of use and policies.
        </p>
      </div>

      <div className="mt-4 text-center text-lg">
        <h2>
          Don&apos;t have an account ?{" "}
          <span
            className="cursor-pointer text-blue-900 underline"
            onClick={() => router.push("/signup")}
          >
            Sign up
          </span>{" "}
          here.
        </h2>
      </div>
    </div>
  );
};

export default Login;
