"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);
  const [role, setRole] = useState(null);
  const router = useRouter();

  const handleSignup = async () => {
    const response = await fetch("http://localhost:8000/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, name, password, role }),
    });
  };

  return (
    <div>
      <div className="flex h-auto w-96 flex-col gap-8 rounded-md bg-blue-100 p-8">
        <h1 className="text-center text-lg">Create a free account</h1>

        <button className="flex h-8 cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-black text-xs">
          <Image
            src="/icons/google-logo.png"
            alt="google-logo"
            width={16}
            height={16}
          />
          <span>Sign up with Google</span>
        </button>

        <p className="text-center text-xs font-light text-gray-400">
          or using email
        </p>

        <input
          placeholder="Enter your email here."
          className="rounded-md border-2 border-gray-300 bg-gray-200 p-2 text-xs font-light hover:border-blue-900"
        />
        <input
          placeholder="Enter your name here."
          className="rounded-md border-2 border-gray-300 bg-gray-200 p-2 text-xs font-light hover:border-blue-900"
        />
        <input
          placeholder="Enter your password here."
          className="rounded-md border-2 border-gray-300 bg-gray-200 p-2 text-xs font-light hover:border-blue-900"
        />
        <form className="flex flex-col gap-2">
          <label htmlFor="mentor" className="flex cursor-pointer gap-2">
            <input
              type="radio"
              id="mentor"
              name="role"
              value="Mentor"
              className="cursor-pointer border-2 border-red-100"
            />
            <span className="font-light">Mentor</span>
          </label>

          <label htmlFor="mentee" className="flex cursor-pointer gap-2">
            <input
              type="radio"
              id="mentee"
              name="role"
              value="Mentee"
              className="cursor-pointer"
            />
            <span className="font-light">Mentee</span>
          </label>
        </form>

        <button
          className="h-10 cursor-pointer rounded-full bg-black text-sm text-white"
          onClick={() => handleSignup()}
        >
          Signup
        </button>
      </div>

      <div>
        <p className="mt-4 mb-8 text-center text-[12px] font-light tracking-wide text-[#6D6D6C]">
          By signing up you accept our terms of use and policies.
        </p>
      </div>

      <div className="mt-4 text-center text-lg">
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
