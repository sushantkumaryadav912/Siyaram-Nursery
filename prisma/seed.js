const { PrismaClient, Prisma } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient({
  log: ['error', 'warn'],
});

const DEFAULT_ADMIN_EMAIL = process.env.ADMIN_EMAIL || '';
const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || ''; // plain: only used here to create hashed password
const SEED_DEMO_DATA = (process.env.SEED_DEMO_DATA || 'false').toLowerCase() === 'true';
const SEED_SAMPLE_ORDERS = (process.env.SEED_SAMPLE_ORDERS || 'false').toLowerCase() === 'true';

async function upsertCategory(name, slug) {
  return prisma.category.upsert({
    where: { slug },
    update: {},
    create: { name, slug },
  });
}

async function upsertProduct({ name, slug, description = '', price, stock = 0, categorySlug, images = [] }) {
  const category = await prisma.category.findUnique({ where: { slug: categorySlug } });
  if (!category) throw new Error(`Category ${categorySlug} not found for product ${name}`);

  // Upsert product by slug
  const product = await prisma.product.upsert({
    where: { slug },
    update: {
      name,
      description,
      price: new Prisma.Decimal(price.toFixed ? price.toFixed(2) : price),
      stock,
      categoryId: category.id,
    },
    create: {
      name,
      slug,
      description,
      price: new Prisma.Decimal(price.toFixed ? price.toFixed(2) : price),
      stock,
      categoryId: category.id,
    },
  });

  // Add or update images: ensure we have image rows for each url; do not duplicate
  for (const url of images) {
    await prisma.productImage.upsert({
      where: { url_productId: { url, productId: product.id } }, // composite unique key - must exist in schema if you want this; otherwise use findFirst
      update: {},
      create: { url, productId: product.id },
    }).catch(async (err) => {
      // fallback if composite unique not present: check existence then create
      if (err.message && err.message.includes('Unique constraint failed')) return;
      const found = await prisma.productImage.findFirst({ where: { url, productId: product.id } });
      if (!found) await prisma.productImage.create({ data: { url, productId: product.id } });
    });
  }

  return product;
}

async function ensureAdminUser() {
  if (!DEFAULT_ADMIN_EMAIL || !DEFAULT_ADMIN_PASSWORD) {
    console.log('ADMIN_EMAIL or ADMIN_PASSWORD not provided — skipping admin creation.');
    return null;
  }

  const existing = await prisma.user.findUnique({ where: { email: DEFAULT_ADMIN_EMAIL } });
  if (existing) {
    console.log('Admin already exists — skipping creation.');
    return existing;
  }

  const hashed = await bcrypt.hash(DEFAULT_ADMIN_PASSWORD, 12);
  const admin = await prisma.user.create({
    data: {
      name: 'Administrator',
      email: DEFAULT_ADMIN_EMAIL,
      password: hashed,
      role: 'ADMIN',
    },
  });
  console.log(`Admin created: ${DEFAULT_ADMIN_EMAIL}`);
  return admin;
}

async function createDemoData() {
  console.log('Seeding demo categories & products...');

  // Categories
  const roses = await upsertCategory('Roses', 'roses');
  const indoor = await upsertCategory('Indoor Plants', 'indoor-plants');
  const bouquets = await upsertCategory('Flower Bouquets', 'flower-bouquets');
  const succulents = await upsertCategory('Succulents', 'succulents');

  // Products (example) — adjust images to your public URLs or Supabase paths
  await upsertProduct({
    name: 'Red Rose Bouquet (12 stem)',
    slug: 'red-rose-bouquet-12',
    description: 'A bouquet of 12 fresh red roses.',
    price: 499.0,
    stock: 50,
    categorySlug: 'roses',
    images: ['/uploads/product-images/rose.jpeg', '/uploads/product-images/rose-alt1.jpeg'],
  });

  await upsertProduct({
    name: 'Snake Plant (Sansevieria)',
    slug: 'snake-plant',
    description: 'Hardy indoor plant. Low maintenance.',
    price: 299.0,
    stock: 120,
    categorySlug: 'indoor-plants',
    images: ['/uploads/product-images/clay-pot.jpeg'],
  });

  await upsertProduct({
    name: 'Mixed Flower Bouquet',
    slug: 'mixed-flower-bouquet',
    description: 'Assorted seasonal flowers arranged with care.',
    price: 699.0,
    stock: 30,
    categorySlug: 'flower-bouquets',
    images: ['/uploads/product-images/sunflower-seeds.jpeg'],
  });

  await upsertProduct({
    name: 'Mini Succulent Set',
    slug: 'mini-succulent-set',
    description: 'Three small succulents in decorative pots.',
    price: 399.0,
    stock: 75,
    categorySlug: 'succulents',
    images: ['/uploads/product-images/clay-pot-alt1.jpeg'],
  });

  console.log('Demo products seeded.');
}

async function maybeCreateSampleOrder(customer) {
  if (!SEED_SAMPLE_ORDERS) {
    console.log('Skipping sample orders (SEED_SAMPLE_ORDERS not enabled).');
    return;
  }

  // find a product
  const product = await prisma.product.findFirst();
  if (!product) return;

  // create order only if customer has none
  const existingOrder = await prisma.order.findFirst({ where: { userId: customer.id } });
  if (existingOrder) {
    console.log('Customer already has orders; skipping sample order.');
    return;
  }

  const order = await prisma.order.create({
    data: {
      userId: customer.id,
      addressId: (await prisma.address.findFirst({ where: { userId: customer.id } }))?.id,
      totalAmount: new Prisma.Decimal(product.price),
      status: 'PENDING',
      orderItems: {
        create: [
          {
            productId: product.id,
            quantity: 1,
            price: new Prisma.Decimal(product.price),
          },
        ],
      },
    },
  });
  console.log(`Created sample order ${order.id} for customer ${customer.email}`);
}

async function main() {
  console.log('🧩 Starting seeding process...');

  // create admin if requested (admin creation is explicit via env vars)
  await ensureAdminUser();

  if (SEED_DEMO_DATA) {
    await createDemoData();

    // create a demo customer if none exists (dev only)
    const demoEmail = 'customer@siyaram.local';
    let customer = await prisma.user.findUnique({ where: { email: demoEmail } });
    if (!customer) {
      const hashed = await bcrypt.hash('customer123', 10);
      customer = await prisma.user.create({
        data: {
          name: 'Demo Customer',
          email: demoEmail,
          password: hashed,
          role: 'CUSTOMER',
        },
      });
      // optionally create an address
      await prisma.address.create({
        data: {
          userId: customer.id,
          line1: '123 Demo Lane',
          city: 'Pune',
          state: 'Maharashtra',
          postalCode: '411001',
          country: 'India',
        },
      });
      console.log('Demo customer created.');
    } else {
      console.log('Demo customer exists.');
    }

    await maybeCreateSampleOrder(customer);
  } else {
    console.log('SEED_DEMO_DATA flag not set — skipping demo product seeding.');
  }

  console.log('✅ Seeding finished.');
}

main()
  .catch((e) => {
    console.error('Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
