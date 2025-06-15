'use client';
import { useState } from 'react';
import supabase from '@/utils/db';
import { motion } from 'framer-motion';
import { nanoid } from 'nanoid';
import { useRouter } from 'next/navigation';
import bcrypt from 'bcryptjs';

export default function NewUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hashedPassword = bcrypt.hashSync(password, 10);
    const { error } = await supabase.from('User').insert({
      id: nanoid(),
      email,
      password: hashedPassword,
      role,
    });
    if (error) {
      setError(error.message);
    } else {
      router.push('/dashboard/admin/users');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12"
    >
      <h1 className="text-3xl font-bold mb-6">Add New User</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            <option value="user">User</option>
            <option value="shopkeeper">Shopkeeper</option>
            <option value="admin">Admin</option>
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