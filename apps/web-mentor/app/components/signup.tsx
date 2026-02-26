"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import Logo from "./logo";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const router = useRouter();

  const handleSignup = async () => {
    const response = await fetch("http://localhost:8000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, name, password, role }),
    });
  };

  return (
    <div>
      <div className="flex items-center justify-center gap-2 py-4 text-center">
        <Logo />
        <h1 className="text-center text-4xl">Mentio</h1>
      </div>
      <div className="flex h-auto w-120 flex-col gap-8 rounded-md bg-blue-100 px-12 py-16">
        <h1 className="text-center text-2xl">Create a free account</h1>

        <button className="flex h-12 cursor-pointer items-center justify-center gap-2 rounded-full border-2 border-black text-lg">
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
          placeholder="Enter your email here."
          className="text-md rounded-md border-2 border-gray-300 bg-gray-200 p-2 font-light hover:border-blue-900"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Enter your name here."
          className="text-md rounded-md border-2 border-gray-300 bg-gray-200 p-2 font-light hover:border-blue-900"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Enter your password here."
          className="text-md rounded-md border-2 border-gray-300 bg-gray-200 p-2 font-light hover:border-blue-900"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <form className="flex gap-2">
          <label htmlFor="mentor" className="flex cursor-pointer gap-2">
            <input
              type="radio"
              id="mentor"
              name="role"
              value="mentor"
              onChange={() => setRole("mentor")}
              className="cursor-pointer border-2 border-red-100"
            />
            <span className="font-light">Mentor</span>
          </label>

          <label htmlFor="mentee" className="flex cursor-pointer gap-2">
            <input
              type="radio"
              id="mentee"
              name="role"
              value="mentee"
              onChange={() => setRole("mentee")}
              className="cursor-pointer"
            />
            <span className="font-light">Mentee</span>
          </label>
        </form>

        <button
          className="text-md h-12 cursor-pointer rounded-full bg-black text-white"
          onClick={() => {
            handleSignup();
            toast.success("Signup successful", {
              position: "top-center",
              style: {
                background: "green",
                color: "white",
              },
            });
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
