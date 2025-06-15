'use client';
import { motion } from 'framer-motion';

export default function Checkout() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12"
    >
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <p>Checkout functionality coming soon (Stripe/Razorpay integration).</p>
    </motion.div>
  );
}