"use client";

import { DashboardSidebar, CustomButton } from "@/components";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const NewProductPage = () => {
  const [productInput, setProductInput] = useState({
    title: "",
    price: 0,
    inStock: 0,
    mainImage: "",
    description: "",
    plantType: "",
    careInstructions: "",
    categoryId: "",
  });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3001/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productInput),
      });
      if (response.ok) {
        toast.success("Product created");
        router.push("/admin/products");
      } else {
        toast.error("Failed to create product");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h2>Create Product</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={productInput.title}
            onChange={(e) => setProductInput({ ...productInput, title: e.target.value })}
            placeholder="Product Title"
            className="border p-2 w-full"
          />
          <input
            type="number"
            value={productInput.price}
            onChange={(e) => setProductInput({ ...productInput, price: Number(e.target.value) })}
            placeholder="Price"
            className="border p-2 w-full"
          />
          <input
            type="text"
            value={productInput.plantType}
            onChange={(e) => setProductInput({ ...productInput, plantType: e.target.value })}
            placeholder="Plant Type (e.g., Indoor)"
            className="border p-2 w-full"
          />
          <textarea
            value={productInput.careInstructions}
            onChange={(e) => setProductInput({ ...productInput, careInstructions: e.target.value })}
            placeholder="Care Instructions"
            className="border p-2 w-full"
          />
          <CustomButton text="Create Product" />
        </form>
      </div>
    </div>
  );
};

export default NewProductPage;