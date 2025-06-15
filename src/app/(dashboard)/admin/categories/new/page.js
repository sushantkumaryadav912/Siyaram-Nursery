'use client';
import { useState } from 'react';
import supabase from '@/utils/db';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';

export default function NewCategory() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase.from('Category').insert({
      id: nanoid(),
      name,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard/admin/categories');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12"
    >
      <h1 className="text-3xl font-bold mb-6">Add New Category</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Category Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
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