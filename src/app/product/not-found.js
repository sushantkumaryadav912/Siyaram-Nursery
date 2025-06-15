import Link from "next/link";

export default function ProductNotFound() {
  return (
    <div className="text-center py-16">
      <h2 className="text-4xl">Product Not Found</h2>
      <p className="mt-4">Sorry, the plant you’re looking for doesn’t exist.</p>
      <Link href="/shop" className="text-blue-500">
        Browse Plants
      </Link>
    </div>
  );
}