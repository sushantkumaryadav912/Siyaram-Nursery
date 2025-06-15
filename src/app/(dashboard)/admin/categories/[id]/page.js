"use client";

import { DashboardSidebar, CustomButton } from "@/components";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { formatCategoryName } from "../../../../../utils/categoryFormating";

const DashboardSingleCategory = ({ params: { id } }) => {
  const [categoryInput, setCategoryInput] = useState({ name: "" });
  const router = useRouter();

  useEffect(() => {
    const fetchCategory = async () => {
      const response = await fetch(`http://localhost:3001/api/categories/${id}`);
      const data = await response.json();
      setCategoryInput({ name: data.name });
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/api/categories/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoryInput),
      });
      if (response.ok) {
        toast.success("Category updated");
        router.push("/admin/categories");
      } else {
        toast.error("Failed to update category");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h2>Edit Category</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={categoryInput.name}
            onChange={(e) => setCategoryInput({ name: e.target.value })}
            placeholder="Category Name"
            className="border p-2 w-full"
          />
          <CustomButton text="Update Category" />
        </form>
      </div>
    </div>
  );
};

export default DashboardSingleCategory;