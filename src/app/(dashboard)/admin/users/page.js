'use client';
import { useEffect, useState } from 'react';
import supabase from '@/utils/db';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data } = await supabase.from('User').select('*');
      setUsers(data || []);
    }
    fetchUsers();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12"
    >
      <h1 className="text-3xl font-bold mb-6">Manage Users</h1>
      <Link
        href="/dashboard/admin/users/new"
        className="mb-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Add New User
      </Link>
      <div className="grid grid-cols-1 gap-4">
        {users.map((user) => (
          <div key={user.id} className="border p-4 rounded">
            <Link href={`/dashboard/admin/users/${user.id}`} className="text-primary hover:underline">
              {user.email}
            </Link>
            <p>Role: {user.role}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}