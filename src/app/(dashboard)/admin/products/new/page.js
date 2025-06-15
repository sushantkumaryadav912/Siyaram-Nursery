'use client';
import { useState, useEffect } from 'react';
import supabase from '@/utils/db';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

export default function NewProduct() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [inStock, setInStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      const { data } = await supabase.from('Category').select('*');
      setCategories(data || []);
    }
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const slug = title.toLowerCase().replace(/\s+/g, '-');
    const { error } = await supabase.from('Product').insert({
      id: nanoid(),
      title,
      price: parseInt(price),
      description,
      inStock: parseInt(inStock),
      categoryId,
      slug,
      mainImage: '/images/product_placeholder.jpg',
    });
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard/admin/products');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12"
    >
      <h1 className="text-3xl font-bold mb-6">Add New Product</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price (cents)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Stock</label>
          <input
            type="number"
            value={inStock}
            onChange={(e) => setInStock(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save
        </button>
      </form>
    </motion.div>
  );
}