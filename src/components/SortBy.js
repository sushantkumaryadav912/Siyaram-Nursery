"use client";
import React from "react";
import { useSortStore } from "@/app/_zustand/sortStore";

const SortBy = () => {
  const { sortBy, setSortBy } = useSortStore();

  return (
    <div className="flex gap-x-2 items-center">
      <label className="text-lg font-semibold">Sort by:</label>
      <select
        className="select select-bordered w-full max-w-xs"
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="default">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDesc">Price: High to Low</option>
        <option value="ratingDesc">Rating: High to Low</option>
      </select>
    </div>
  );
};

export default SortBy;