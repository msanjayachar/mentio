"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Logo from "./logo";
import { SignupSchema } from "@shared/auth";
import { UserApiResponseSchema } from "@shared/api/auth";
import { ZodError } from "zod";
import { ERROR_MESSAGES, ErrorCode } from "@shared/types";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    let parsed;
    try {
      parsed = SignupSchema.parse({ name, email, password });
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
      }
    }

    if (!parsed) {
      return;
    }

    const response = await fetch("http://localhost:8000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });

    const json = await response.json();
    const result = UserApiResponseSchema.safeParse(json);

    if (!result.success) {
      toast.error("Unexpected server response four", {
        position: "top-center",
        style: {
          background: "red",
          color: "white",
        },
      });

      return;
    }

    const res = result.data;

    if (res.success) {
      toast.success("Signup Successful", {
        position: "top-center",
        style: {
          background: "green",
          color: "white",
        },
      });

      router.push("/login");
    } else {
      toast.error(ERROR_MESSAGES[res.error] ?? "Unexpected error", {
        position: "top-center",
        style: {
          background: "red",
          color: "white",
        },
      });
    }
  };

  return (
    <div className="min-h-screen w-full px-4 py-8 md:px-8 lg:px-16">
      <div className="flex items-center justify-center gap-2 py-4 text-center">
        <Logo />
        <h1 className="text-center text-3xl md:text-4xl">Mentio</h1>
      </div>
      <div className="mx-auto flex h-auto w-full max-w-md flex-col gap-6 rounded-md bg-blue-100 p-6 md:gap-8 md:p-10 lg:p-16">
        <h1 className="text-center text-xl md:text-2xl">
          Create a free account
        </h1>

        <button className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-black text-base md:text-lg">
          <Image
            src="/icons/google-logo.png"
            alt="google-logo"
            width={20}
            height={20}
          />
          <span>Sign up with Google</span>
        </button>

        <p className="text-center text-sm font-light text-gray-400">
          or using email
        </p>

        <input
          placeholder="Enter your name here."
          className="w-full rounded-md border-2 border-gray-300 bg-gray-200 p-2 font-light hover:border-blue-900 md:text-base"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Enter your email here."
          className="w-full rounded-md border-2 border-gray-300 bg-gray-200 p-2 font-light hover:border-blue-900 md:text-base"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Enter your password here."
          type="password"
          className="w-full rounded-md border-2 border-gray-300 bg-gray-200 p-2 font-light hover:border-blue-900 md:text-base"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          className="h-12 w-full cursor-pointer rounded-full bg-black text-white md:text-base"
          onClick={() => {
            handleSignup();
          }}
        >
          Signup
        </button>
      </div>

      <div>
        <p className="mt-4 mb-8 text-center text-sm font-light tracking-wide text-[#6D6D6C]">
          By signing up you accept our terms of use and policies.
        </p>
      </div>

      <div className="text-center text-base md:text-lg">
        <h2>
          Already have an account ?{" "}
          <span
            className="cursor-pointer text-blue-900 underline"
            onClick={() => router.push("/login")}
          >
            Log in
          </span>
        </h2>
      </div>
    </div>
  );
};

export default Signup;
