"use client";

import { DashboardSidebar, CustomButton } from "@/components";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const NewCategoryPage = () => {
  const [categoryInput, setCategoryInput] = useState({ name: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryInput),
      });
      if (response.ok) {
        toast.success("Category created");
        router.push("/admin/categories");
      } else {
        toast.error("Failed to create category");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h2>Create Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={categoryInput.name}
            onChange={(e) => setCategoryInput({ name: e.target.value })}
            placeholder="Category Name"
            className="border p-2 w-full"
          />
          <CustomButton text="Create Category" />
        </form>
      </div>
    </div>
  );
};

export default NewCategoryPage;