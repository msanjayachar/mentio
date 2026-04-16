"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import Logo from "./logo";
import { useCurrentUser } from "./context/authContext";
import { LoginSchema } from "@shared/auth";
import { ZodError } from "zod";
import { ERROR_MESSAGES, ErrorCode } from "@shared/types";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { login } = useCurrentUser();

  const testUserLogin = async () => {
    try {
      await login("sanjay@gmail.com", "password");

      toast.success("Login successful", {
        position: "top-center",
        style: {
          background: "green",
          color: "white",
        },
      });
      router.push("/");
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues[0]?.message;

        toast.error(message, {
          position: "top-center",
          style: {
            background: "red",
            color: "white",
          },
        });

        return;
      }

      toast.error(ERROR_MESSAGES[error as ErrorCode] ?? "Unexpected error", {
        position: "top-center",
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  const handleLogin = async () => {
    try {
      const parsed = LoginSchema.parse({ email, password });

      await login(parsed.email, parsed.password);

      toast.success("Login successful", {
        position: "top-center",
        style: {
          background: "green",
          color: "white",
        },
      });
      router.push("/");
    } catch (error) {
      if (error instanceof ZodError) {
        const message = error.issues[0]?.message;

        toast.error(message, {
          position: "top-center",
          style: {
            background: "red",
            color: "white",
          },
        });
        return;
      }

      if (typeof error === "string") {
        if (error in ERROR_MESSAGES) {
          const key = error as keyof typeof ERROR_MESSAGES;
          toast.error(ERROR_MESSAGES[key] ?? "Unexpected error", {
            position: "top-center",
            style: {
              background: "red",
              color: "white",
            },
          });

          return;
        } else {
          toast.error(error, {
            position: "top-center",
            style: {
              background: "red",
              color: "white",
            },
          });

          return;
        }
      }
    }
  };

  useEffect(() => {
    buttonRef.current?.focus();
  }, []);

  return (
    <div className="min-h-screen w-full px-4 py-8 md:px-8 lg:px-16">
      <div className="flex items-center justify-center gap-2 py-4 text-center">
        <Logo />
        <h1 className="text-center text-3xl md:text-4xl">Mentio</h1>
      </div>

      <h1 className="mb-4 text-center text-3xl md:text-5xl">Welcome Back!</h1>
      <div className="mx-auto flex h-auto w-full max-w-md flex-col gap-6 rounded-md bg-blue-100 p-6 md:gap-8 md:p-10 lg:p-16">
        <button className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-black text-base md:text-lg">
          <Image
            src="/icons/google-logo.png"
            alt="google-logo"
            width={16}
            height={16}
          />
          <span>Login with Google</span>
        </button>

        <button
          ref={buttonRef}
          onClick={() => testUserLogin()}
          className="w-full cursor-pointer rounded-md border-2 border-black bg-red-400 py-2 text-base md:text-xl"
        >
          Login Test User
        </button>

        <p className="md:text-md text-center font-light text-gray-400">
          or using email
        </p>

        <input
          placeholder="Enter your email here."
          className="w-full rounded-md border-2 border-gray-300 bg-gray-200 p-2 font-light hover:border-blue-900 md:text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Enter your password here."
          className="w-full rounded-md border-2 border-gray-300 bg-gray-200 p-2 font-light hover:border-blue-900 md:text-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="h-12 w-full cursor-pointer rounded-full bg-black text-white md:text-base"
          onClick={() => {
            handleLogin();
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

      <div className="text-center text-base md:text-lg">
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
