const supabase = require("./db");
const { v4: uuidv4 } = require("uuid");

const demoCategories = [
  { id: uuidv4(), name: "Roses" },
  { id: uuidv4(), name: "Lilies" },
  { id: uuidv4(), name: "Bouquets" },
  { id: uuidv4(), name: "Orchids" },
];

const demoProducts = [
  {
    id: uuidv4(),
    title: "Red Rose Bouquet",
    price: 29.99,
    rating: 5,
    description: "A beautiful bouquet of fresh red roses.",
    mainImage: "/uploads/red-rose-bouquet.jpg",
    slug: "red-rose-bouquet",
    manufacturer: "Siyaram Nursery",
    categoryId: demoCategories[0].id,
    inStock: 50,
  },
  {
    id: uuidv4(),
    title: "White Lily Arrangement",
    price: 39.99,
    rating: 4,
    description: "Elegant white lilies arranged in a vase.",
    mainImage: "/uploads/white-lily-arrangement.jpg",
    slug: "white-lily-arrangement",
    manufacturer: "Siyaram Nursery",
    categoryId: demoCategories[1].id,
    inStock: 30,
  },
  {
    id: uuidv4(),
    title: "Mixed Flower Bouquet",
    price: 34.99,
    rating: 4,
    description: "A vibrant mix of seasonal flowers.",
    mainImage: "/uploads/mixed-flower-bouquet.jpg",
    slug: "mixed-flower-bouquet",
    manufacturer: "Siyaram Nursery",
    categoryId: demoCategories[2].id,
    inStock: 40,
  },
  {
    id: uuidv4(),
    title: "Purple Orchid Pot",
    price: 49.99,
    rating: 5,
    description: "A stunning purple orchid in a decorative pot.",
    mainImage: "/uploads/purple-orchid-pot.jpg",
    slug: "purple-orchid-pot",
    manufacturer: "Siyaram Nursery",
    categoryId: demoCategories[3].id,
    inStock: 20,
  },
];

async function insertDemoData() {
  try {
    for (const category of demoCategories) {
      const { error } = await supabase.from("Category").insert(category);
      if (error) throw error;
    }
    console.log("Demo categories inserted successfully!");

    for (const product of demoProducts) {
      const { error } = await supabase.from("Product").insert(product);
      if (error) throw error;
    }
    console.log("Demo products inserted successfully!");
  } catch (error) {
    console.error("Error inserting demo data:", error);
    process.exit(1);
  }
}

insertDemoData();