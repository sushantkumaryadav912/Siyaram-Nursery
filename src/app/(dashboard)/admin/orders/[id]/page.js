'use client';
import { useEffect, useState } from 'react';
import supabase from '@/utils/db';
import { motion } from 'framer-motion';

export default function OrderDetail({ params }) {
  const [order, setOrder] = useState(null);
  const { id } = params;

  useEffect(() => {
    async function fetchOrder() {
      const { data } = await supabase
        .from('Order')
        .select('*, OrderProduct(*, Product(*))')
        .eq('id', id)
        .single();
      setOrder(data);
    }
    fetchOrder();
  }, [id]);

  if (!order) return <p>Loading...</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12"
    >
      <h1 className="text-3xl font-bold mb-6">Order #{order.id}</h1>
      <p>Status: {order.status}</p>
      <p>Total: ${(order.total / 100).toFixed(2)}</p>
      <h2 className="text-xl font-bold mt-6">Products</h2>
      <div className="grid grid-cols-1 gap-4">
        {order.OrderProduct.map((item) => (
          <div key={item.id} className="border p-4 rounded">
            <p>{item.Product.title}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${(item.Product.price / 100).toFixed(2)}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}