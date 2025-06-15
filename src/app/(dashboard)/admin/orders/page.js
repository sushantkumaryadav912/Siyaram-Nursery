'use client';
import { useEffect, useState } from 'react';
import supabase from '@/utils/db';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const { data } = await supabase.from('Order').select('*');
      setOrders(data || []);
    }
    fetchOrders();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12"
    >
      <h1 className="text-3xl font-bold mb-6">Manage Orders</h1>
      <div className="grid grid-cols-1 gap-4">
        {orders.map((order) => (
          <div key={order.id} className="border p-4 rounded">
            <Link href={`/dashboard/admin/orders/${order.id}`} className="text-primary hover:underline">
              Order #{order.id}
            </Link>
            <p>Status: {order.status}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}