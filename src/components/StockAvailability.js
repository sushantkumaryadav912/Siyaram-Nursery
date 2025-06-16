import React from "react";
import { FaCheck } from "react-icons/fa6";
import { FaXmark } from "react-icons/fa6";

const StockAvailability = ({ product }) => {
  return (
    <div className="flex items-center gap-x-2 max-[500px]:justify-center">
      {product?.inStock ? (
        <>
          <FaCheck className="text-green-500 text-2xl" />
          <p className="text-lg">In stock</p>
        </>
      ) : (
        <>
          <FaXmark className="text-red-500 text-2xl" />
          <p className="text-lg">Out of stock</p>
        </>
      )}
    </div>
  );
};

export default StockAvailability;