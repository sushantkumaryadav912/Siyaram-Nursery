"use client";
import { nanoid } from "nanoid";
import React from "react";
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";

const ProductItemRating = ({ productRating }) => {
  const rating = [
    "empty star",
    "empty star",
    "empty star",
    "empty star",
    "empty star",
  ];

  for (let i = 0; i < productRating; i++) {
    rating[i] = "full star";
  }
  return (
    <div className="flex">
        { rating && rating?.map(singleRating => (
          <div key={nanoid()}>
            {singleRating === "full star" && <AiFillStar className="text-yellow-400 text-xl" />}
            {singleRating === "empty star" && <AiOutlineStar className="text-yellow-400 text-xl" />}
          </div>
        )) }
    </div>
  );
};

export default ProductItemRating;