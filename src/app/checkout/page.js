"use client";

import { CustomButton, SectionTitle } from "@/components";
import React from "react";
import { useProductStore } from "../_zustand/store";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CheckoutPage = () => {
  const { products, total, clearCart } = useProductStore();
  const router = useRouter();

  const handleCheckout = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ products, total }),
      });
      if (response.ok) {
        clearCart();
        toast.success("Order placed successfully!");
        router.push("/orders");
      } else {
        toast.error("Failed to place order");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="bg-white py-8">
      <SectionTitle title="Checkout" path="Home | Checkout" />
      <div className="container mx-auto">
        <h3>Total: ${total.toFixed(2)}</h3>
        <CustomButton text="Confirm Order" onClick={handleCheckout} />
      </div>
    </div>
  );
};

export default CheckoutPage;