"use client";

import { DashboardSidebar, CustomButton } from "@/components";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("http://localhost:3001/api/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/products/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setProducts(products.filter((prod) => prod.id !== id));
        toast.success("Product deleted");
      } else {
        toast.error("Failed to delete product");
      }
    } catch (error) {
      toast.error("Server error");
    }
  };

  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-8">
        <h2>Products</h2>
        <Link href="/admin/products/new">
          <CustomButton text="Add New Product" />
        </Link>
        <table className="w-full mt-4">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Plant Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>{product.title}</td>
                <td>${product.price}</td>
                <td>{product.plantType}</td>
                <td>
                  <Link href={`/admin/products/${product.id}`}>Edit</Link>
                  <CustomButton text="Delete" onClick={() => handleDelete(product.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsPage;