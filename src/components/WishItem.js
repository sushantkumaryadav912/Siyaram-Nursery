"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaXmark } from "react-icons/fa6";
import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

const WishItem = ({ product }) => {
  const { data: session } = useSession();
  const { removeFromWishlist } = useWishlistStore();

  const removeFromWishlistFun = async () => {
    if (session?.user?.email) {
      fetch(`http://localhost:3001/api/users/email/${session?.user?.email}`, {
        cache: "no-store",
      })
        .then((response) => response.json())
        .then((data) => {
          return fetch(
            `http://localhost:3001/api/wishlist/${data?.id}/${product?.id}`,
            {
              method: "DELETE",
            }
          );
        })
        .then((response) => {
          removeFromWishlist(product?.id);
          toast.success("Product removed from the wishlist");
        });
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