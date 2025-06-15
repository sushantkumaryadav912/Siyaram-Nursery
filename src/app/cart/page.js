"use client";

import { CustomButton, QuantityInputCart, SectionTitle } from "@/components";
import Image from "next/image";
import React from "react";
import { FaXmark } from "react-icons/fa6";
import { useProductStore } from "../_zustand/store";
import Link from "next/link";
import toast from "react-hot-toast";

const CartPage = () => {
  const { products, removeFromCart, calculateTotals, total } = useProductStore();

  const handleRemoveItem = (id) => {
    removeFromCart(id);
    calculateTotals();
    toast.success("Product removed from the cart");
  };

  return (
    <div className="bg-white py-8">
      <SectionTitle title="Cart" path="Home | Cart" />
      {products.length === 0 ? (
        <p className="text-center">Your cart is empty</p>
      ) : (
        <div className="container mx-auto">
          {products.map((item) => (
            <div key={item.id} className="flex items-center border-b py-4">
              <Image src={item.mainImage || "/plant_placeholder.jpg"} alt={item.title} width={100} height={100} />
              <div className="flex-1 ml-4">
                <h3>{item.title}</h3>
                <p>Plant Type: {item.plantType}</p>
                <p>${item.price}</p>
              </div>
              <QuantityInputCart product={item} />
              <CustomButton onClick={() => handleRemoveItem(item.id)} icon={<FaXmark />} />
            </div>
          ))}
          <div className="mt-8">
            <h3>Total: ${total.toFixed(2)}</h3>
            <Link href="/checkout">
              <CustomButton text="Proceed to Checkout" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;