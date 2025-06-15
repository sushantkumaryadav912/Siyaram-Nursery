'use client';
import { useEffect, useState } from 'react';
import supabase from '@/utils/db';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('Category').select('*');
      setCategories(data || []);
    }
    fetchCategories();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12"
    >
      <h1 className="text-3xl font-bold mb-6">Manage Categories</h1>
      <Link
        href="/dashboard/admin/categories/new"
        className="mb-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add New Category
      </Link>
      <div className="grid grid-cols-1 gap-4">
        {categories.map((category) => (
          <div key={category.id} className="border p-4 rounded">
            <Link href={`/dashboard/admin/categories/${category.id}`} className="text-primary hover:underline">
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </motion.div>
  );
}