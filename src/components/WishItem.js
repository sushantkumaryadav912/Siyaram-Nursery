// src/components/WishItem.js
"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaXmark } from "react-icons/fa6";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";
import { supabase } from "@/lib/supabaseClient";

const WishItem = ({ product }) => {
  const { data: session } = useSession();
  const { removeFromWishlist } = useWishlistStore();

  const removeFromWishlistFun = async () => {
    if (session?.user?.email) {
      // Fetch user by email
      const { data: user, error: userError } = await supabase
        .from("users")
        .select("id")
        .eq("email", session.user.email)
        .single();

      if (userError || !user) {
        toast.error("Error fetching user");
        return;
      }

      // Delete wishlist item
      const { error } = await supabase
        .from("wishlist")
        .delete()
        .eq("user_id", user.id)
        .eq("product_id", product.id);

      if (error) {
        toast.error("Error removing from wishlist");
        return;
      }

      removeFromWishlist(product.id);
      toast.success("Product removed from the wishlist");
    }
  };

  return (
    <div className="flex items-center justify-between gap-x-5 border-b border-gray-200 py-5">
      <div className="flex items-center gap-x-5">
        <Image
          src={product?.image ? `/${product?.image}` : "/product_placeholder.jpg"}
          width={80}
          height={80}
          alt={product?.title}
          className="w-20 h-20"
        />
        <div className="flex flex-col gap-y-2">
          <Link href={`/product/${product?.slug}`}>
            <p className="text-lg font-semibold">{product?.title}</p>
          </Link>
          <p className="text-lg">${product?.price}</p>
          {product?.stockAvailabillity ? (
            <p className="text-green-500">In stock</p>
          ) : (
            <p className="text-red-500">Out of stock</p>
          )}
        </div>
      </div>
      <FaXmark
        className="text-2xl cursor-pointer"
        onClick={removeFromWishlistFun}
      />
    </div>
  );
};

export default WishItem;