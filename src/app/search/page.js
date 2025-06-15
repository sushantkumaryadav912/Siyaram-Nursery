"use client";

import { ProductItem, SectionTitle } from "@/components";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (query) {
      const fetchProducts = async () => {
        const response = await fetch(`http://localhost:3001/api/products?search=${query}`);
        const data = await response.json();
        setProducts(data);
      };
      fetchProducts();
    }
  }, [query]);

  return (
    <div className="bg-white py-8">
      <SectionTitle title={`Search Results for "${query}"`} path="Home | Search" />
      <div className="container mx-auto">
        {products.length === 0 ? (
          <p>No plants found</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;