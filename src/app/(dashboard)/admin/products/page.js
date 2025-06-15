'use client';
import { useEffect, useState } from 'react';
import supabase from '@/utils/db';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      const { data } = await supabase.from('Product').select('*');
      setProducts(data || []);
    }
    fetchProducts();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12"
    >
      <h1 className="text-3xl font-bold mb-6">Manage Products</h1>
      <Link
        href="/dashboard/admin/products/new"
        className="mb-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add New Product
      </Link>
      <div className="grid grid-cols-1 gap-4">
        {products.map((product) => (
          <div key={product.id} className="border p-4 rounded">
            <Link href={`/dashboard/admin/products/${product.id}`} className="text-primary hover:underline">
              {product.title}
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
  );
}