'use client';
import { useStore } from '@/lib/store';
import { CartElement } from '@/components';
import { motion } from 'framer-motion';

export default function Cart() {
  const { cart, removeFromCart, clearCart } = useStore();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-12"
    >
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <CartElement key={item.id} item={item} removeFromCart={removeFromCart} />
          ))}
          <button
            onClick={clearCart}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Clear Cart
          </button>
          <a
            href="/checkout"
            className="mt-4 ml-4 inline-block bg-primary text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Proceed to Checkout
          </a>
        </>
      )}
    </motion.div>
  );
}