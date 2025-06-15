import { ProductItem, SectionTitle } from "@/components";

const improveCategoryText = (text) => {
  if (text.includes("-")) {
    return text.split("-").join(" ");
  }
  return text;
};

export default async function ShopPage({ params }) {
  const slug = params?.slug?.join("/") || "";
  const response = await fetch(`http://localhost:3001/api/products?category=${slug}`);
  const products = await response.json();

  return (
    <div className="bg-white py-8">
      <SectionTitle
        title={slug ? improveCategoryText(slug) : "Shop"}
        path="Home | Shop"
      />
      <div className="container mx-auto">
        {products.length === 0 ? (
          <p>No plants found</p>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}