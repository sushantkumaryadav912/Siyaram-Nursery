import React from "react";

const StockAvailabillity = ({ inStock }) => {
  return (
    <p className="text-xl">
      Availability:{" "}
      <span className="text-lg font-normal">
        {inStock ? "In stock" : "Out of stock"}
      </span>
    </p>
  );
};

export default StockAvailabillity;