"use client";

import { CustomButton, SectionTitle } from "@/components";
import Image from "next/image";
import React from "react";
import { useProductStore } from "../../_zustand/store";
import toast from "react-hot-toast";

const ProductPage = async ({ params: { productSlug } }) => {
  const response = await fetch(`http://localhost:3001/api/products?slug=${productSlug}`);
  const product = await response.json();
  const { addToCart } = useProductStore();

  const handleAddToCart = () => {
    addToCart(product);
    toast.success("Added to cart");
  };

  if (!product) return <div>Product not found</div>;

  return (
    <div className="bg-white py-8">
      <SectionTitle title={product.title} path="Home | Shop | Product" />
      <div className="container mx-auto flex">
        <Image src={product.mainImage || "/plant_placeholder.jpg"} alt={product.title} width={400} height={400} />
        <div className="ml-8">
          <h1 className="text-3xl">{product.title}</h1>
          <p>Price: ${product.price}</p>
          <p>Plant Type: {product.plantType}</p>
          <p>Care Instructions: {product.careInstructions}</p>
          <CustomButton text="Add to Cart" onClick={handleAddToCart} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;