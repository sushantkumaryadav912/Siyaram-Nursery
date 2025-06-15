"use client";

import { useSortStore } from "@/app/_zustand/sortStore";
import React from "react";

const SortBy = () => {
  const { setSortBy } = useSortStore();

  return (
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn m-1">
        Sort by
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
      >
        <li onClick={() => setSortBy("price-desc")}>
          <a>Price High to Low</a>
        </li>
        <li onClick={() => setSortBy("price-asc")}>
          <a>Price Low to High</a>
        </li>
        <li onClick={() => setSortBy("rating-desc")}>
          <a>Rating High to Low</a>
        </li>
        <li onClick={() => setSortBy("rating-asc")}>
          <a>Rating Low to High</a>
        </li>
      </ul>
    </div>
  );
};

export default SortBy;