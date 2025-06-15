"use client";

import { useProductStore } from "@/app/_zustand/store";
import React from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

const QuantityInputCart = ({ id, amount }) => {
  const { changeAmount, calculateTotals } = useProductStore();

  const handleQuantityChange = (actionName) => {
    if (actionName === "plus") {
      changeAmount(id, amount + 1);
    } else if (actionName === "minus" && amount !== 1) {
      changeAmount(id, amount - 1);
    }
    calculateTotals();
  };

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        className="size-10 leading-10 text-gray-600 transition hover:opacity-75 flex justify-center items-center border"
        onClick={() => handleQuantityChange("minus")}
      >
        <FaMinus />
      </button>

      <input
        type="number"
        id="Quantity"
        disabled={true}
        value={amount}
        className="h-10 w-24 rounded border-gray-200 sm:text-sm"
      />

      <button
        type="button"
        className="size-10 leading-10 text-gray-600 transition hover:opacity-75 flex justify-center items-center border"
        onClick={() => handleQuantityChange("plus")}
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default QuantityInputCart;