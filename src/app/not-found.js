'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8"
    >
      <div className="text-center">
        <p className="text-lg font-semibold bg-primary text-white border border-1 border-black py-2 rounded-full w-16 mx-auto">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-black sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-black">
          Sorry, we couldn’t find the page you’re looking for.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6 max-[350px]:flex-col max-[350px]:gap-y-5">
          <Link
            href="/"
            className="rounded-md bg-primary border border-1 border-black px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:text-primary hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          >
            Go back home
          </Link>
          <Link
            href="/contact"
            className="text-sm font-semibold text-black hover:underline hover:underline-offset-4"
          >
            Contact support <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </motion.main>
  );
}