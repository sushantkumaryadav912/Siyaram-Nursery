"use client";

import { DashboardSidebar, CustomButton } from "@/components";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const UserEditPage = ({ params: { id } }) => {
  const [userInput, setUserInput] = useState({ name: "", email: "", role: "USER" });
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const response = await fetch(`http://localhost:3001/api/users/${id}`);
      const data = await response.json();
      setUserInput({ name: data.name, email: data.email, role: data.role });
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/users/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInput),
      });
      if (response.ok) {
        toast.success("User updated");
        router.push("/admin/users");
      } else {
        toast.error("Failed to update user");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h2>Edit User</h2>
        <form onSubmit={handleSubmit}>
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
          <select
            value={userInput.role}
            onChange={(e) => setUserInput({ ...userInput, role: e.target.value })}
            className="border p-2 w-full"
          >
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>
          <CustomButton text="Update User" />
        </form>
      </div>
    </div>
  );
};

export default UserEditPage;