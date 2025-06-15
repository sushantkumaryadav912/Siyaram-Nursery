"use client";

import { useWishlistStore } from "@/app/_zustand/wishlistStore";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { FaXmark } from "react-icons/fa6";
import { useSession } from "next-auth/react";

const WishItem = ({ wish }) => {
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
            `http://localhost:3001/api/wishlist/${data?.id}/${wish?.id}`,
            {
              method: "DELETE",
            }
          );
        })
        .then((response) => {
          removeFromWishlist(wish?.id);
          toast.success("Product removed from the wishlist");
        });
    }
  };

  return (
    <tr>
      <td>
        <button onClick={() => removeFromWishlistFun()}>
          <FaXmark className="text-xl" />
        </button>
      </td>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <Image
                src={wish?.image ? `/${wish?.image}` : "/product_placeholder.jpg"}
                width={48}
                height={48}
                alt="Avatar Tailwind CSS Component"
              />
            </div>
          </div>
          <div>
            <Link href={`/product/${wish?.slug}`}>
              <div className="font-bold">{wish?.title}</div>
            </Link>
          </div>
        </div>
      </td>
      <td>
        {wish?.stockAvailabillity ? (
          <span className="badge badge-success text-white badge-sm">
            In stock
          </span>
        ) : (
          <span className="badge badge-error text-white badge-sm">
            Out of stock
          </span>
        )}
      </td>
      <td>${wish?.price}</td>
      <th>
        <Link href={`/product/${wish?.slug}`}>
          <button className="btn btn-ghost btn-xs">details</button>
        </Link>
      </th>
    </tr>
  );
};

export default WishItem;