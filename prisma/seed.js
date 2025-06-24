// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const prisma = new PrismaClient();
const SUPABASE_URL = process.env.SUPABASE_URL;

if (!SUPABASE_URL) {
  throw new Error('SUPABASE_URL is not defined in .env.local');
}

async function main() {
  // Create Categories
  const categories = await Promise.all([
    prisma.category.create({ data: { name: 'Indoor Plants' } }),
    prisma.category.create({ data: { name: 'Outdoor Plants' } }),
    prisma.category.create({ data: { name: 'Seeds' } }),
    prisma.category.create({ data: { name: 'Gardening Tools' } }),
    prisma.category.create({ data: { name: 'Pots' } }),
  ]);

  // Create Products with Images
  const products = await Promise.all([
    prisma.product.create({
      data: {
        title: 'Rose Plant',
        slug: 'rose-plant',
        mainImage: `${SUPABASE_URL}/storage/v1/object/public/product-images/rose.jpeg`,
        price: 1999, // $19.99 in cents
        rating: 4,
        description: 'A vibrant red rose plant for indoor or outdoor gardens.',
        inStock: 10,
        categoryId: categories[0].id, // Indoor Plants
        images: {
          create: [
            { image: `${SUPABASE_URL}/storage/v1/object/public/product-images/rose-alt1.jpeg` },
            { image: `${SUPABASE_URL}/storage/v1/object/public/product-images/rose-alt2.jpeg` },
          ],
        },
      },
    }),
    prisma.product.create({
      data: {
        title: 'Sunflower Seeds',
        slug: 'sunflower-seeds',
        mainImage: `${SUPABASE_URL}/storage/v1/object/public/product-images/sunflower-seeds.jpeg`,
        price: 599, // $5.99
        rating: 5,
        description: 'High-quality sunflower seeds for planting.',
        inStock: 50,
        categoryId: categories[2].id, // Seeds
        images: {
          create: [{ image: `${SUPABASE_URL}/storage/v1/object/public/product-images/sunflower-seeds-alt1.jpeg` }],
        },
      },
    }),
    prisma.product.create({
      data: {
        title: 'Clay Pot',
        slug: 'clay-pot',
        mainImage: `${SUPABASE_URL}/storage/v1/object/public/product-images/clay-pot.jpeg`,
        price: 999, // $9.99
        rating: 3,
        description: 'Durable clay pot for plants.',
        inStock: 20,
        categoryId: categories[4].id, // Pots
        images: {
          create: [{ image: `${SUPABASE_URL}/storage/v1/object/public/product-images/clay-pot-alt1.jpeg` }],
        },
      },
    }),
  ]);

  // Create User
  const user = await prisma.user.create({
    data: {
      email: 'sushantkumaryadav912@gmail.com',
      password: '$2y$12$bxqvdaB1ADm9gL3SYL8f8uGLny8.A0ZMYC12O1RIhrA8a9HmCjrcO', // Replace with bcrypt hash in production
      role: 'admin',
    },
  });

  // Create Wishlist
  await prisma.wishlist.create({
    data: {
      productId: products[0].id, // Rose Plant
      userId: user.id,
    },
  });

  console.log('Demo data seeded successfully');
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });