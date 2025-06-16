// src/components/ProductsSection.js
import React from "react";
import ProductItem from "./ProductItem";
import Heading from "./Heading";

const ProductsSection = async () => {
  try {
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/products`, {
      headers: {
        apikey: process.env.SUPABASE_ANON_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_ANON_KEY}`,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch products: ${response.statusText}`);
    }

    const products = await response.json();

    return (
      <div className="bg-blue-500 border-t-4 border-white">
        <div className="max-w-screen-2xl mx-auto pt-20">
          <Heading title="FEATURED PRODUCTS" />
          <div className="grid grid-cols-4 justify-items-center max-w-screen-2xl mx-auto py-10 gap-x-2 px-10 gap-y-8 max-xl:grid-cols-3 max-md:grid-cols-2 max-sm:grid-cols-1">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductItem key={product.id} product={product} color="white" />
              ))
            ) : (
              <p className="text-white text-center col-span-4">
                No products available.
              </p>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching products:", error);
    return (
      <div className="bg-blue-500 border-t-4 border-white">
        <div className="max-w-screen-2xl mx-auto pt-20">
          <Heading title="FEATURED PRODUCTS" />
          <p className="text-white text-center py-10">
            Unable to load products at this time. Please try again later.
          </p>
        </div>
      </div>
    );
  }
};

export default ProductsSection;