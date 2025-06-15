"use client";

import { CustomButton } from "@/components";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";

const LoginPage = () => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: credentials.email,
      password: credentials.password,
    });
    if (result?.error) {
      toast.error(result.error);
    } else {
      toast.success("Logged in successfully");
      window.location.href = "/";
    }
  };

  return (
    <div className="bg-white py-8">
      <h2 className="text-2xl text-center">Login</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="email"
          value={credentials.email}
          onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <input
          type="password"
          value={credentials.password}
          onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
          placeholder="Password"
          className="border p-2 w-full"
        />
        <CustomButton text="Login" />
      </form>
      <p className="text-center mt-4">
        Don’t have an account? <Link href="/register">Register</Link>
      </p>
    </div>
  );
};

export default LoginPage;