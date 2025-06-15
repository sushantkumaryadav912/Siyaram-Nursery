"use client";

import { DashboardSidebar, CustomButton } from "@/components";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("http://localhost:3001/api/categories");
      const data = await response.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/categories/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setCategories(categories.filter((cat) => cat.id !== id));
        toast.success("Category deleted");
      } else {
        toast.error("Failed to delete category");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h2>Categories</h2>
        <Link href="/admin/categories/new">
          <CustomButton text="Add New Category" />
        </Link>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.name}</td>
                <td>
                  <Link href={`/admin/categories/${category.id}`}>Edit</Link>
                  <CustomButton text="Delete" onClick={() => handleDelete(category.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesPage;