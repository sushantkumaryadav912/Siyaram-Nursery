"use client";

import { ProductItem, SectionTitle } from "@/components";
import React from "react";
import { useWishlistStore } from "../_zustand/wishlistStore";

const WishlistPage = () => {
  const { wishlist } = useWishlistStore();

  return (
    <div className="bg-white py-8">
      <SectionTitle title="Wishlist" path="Home | Wishlist" />
      <div className="container mx-auto">
        {wishlist.length === 0 ? (
          <p>Your wishlist is empty</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {wishlist.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;