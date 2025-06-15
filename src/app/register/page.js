"use client";

import { CustomButton } from "@/components";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { useRouter } from "next/navigation";

const RegisterPage = () => {
  const [userInput, setUserInput] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInput),
      });
      if (response.ok) {
        toast.success("Registration successful");
        router.push("/login");
      } else {
        const data = await response.json();
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="bg-white py-8">
      <h2 className="text-2xl text-center">Register</h2>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <input
          type="text"
          value={userInput.name}
          onChange={(e) => setUserInput({ ...userInput, name: e.target.value })}
          placeholder="Name"
          className="border p-2 w-full"
        />
        <input
          type="email"
          value={userInput.email}
          onChange={(e) => setUserInput({ ...userInput, email: e.target.value })}
          placeholder="Email"
          className="border p-2 w-full"
        />
        <input
          type="password"
          value={userInput.password}
          onChange={(e) => setUserInput({ ...userInput, password: e.target.value })}
          placeholder="Password"
          className="border p-2 w-full"
        />
        <CustomButton text="Register" />
      </form>
      <p className="text-center mt-4">
        Already have an account? <Link href="/login">Login</Link>
      </p>
    </div>
  );
};

export default RegisterPage;