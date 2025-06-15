import supabase from './db';

const demoProducts = [
  {
    id: '1',
    title: 'Rose',
    price: 599,
    rating: 5,
    description: 'Beautiful red rose',
    mainImage: '/images/rose.jpg',
    slug: 'rose',
    inStock: 50,
    categoryId: 'flowers',
  },
  {
    id: '2',
    title: 'Tulip',
    price: 399,
    rating: 4,
    description: 'Vibrant tulip',
    mainImage: '/images/tulip.jpg',
    slug: 'tulip',
    inStock: 30,
    categoryId: 'flowers',
  },
  {
    id: '3',
    title: 'Cactus',
    price: 1299,
    rating: 3,
    description: 'Low-maintenance cactus',
    mainImage: '/images/cactus.jpg',
    slug: 'cactus',
    inStock: 20,
    categoryId: 'plants',
  },
  {
    id: '4',
    title: 'Fern',
    price: 899,
    rating: 4,
    description: 'Lush green fern',
    mainImage: '/images/fern.jpg',
    slug: 'fern',
    inStock: 25,
    categoryId: 'plants',
  },
  {
    id: '5',
    title: 'Clay Pot',
    price: 499,
    rating: 5,
    description: 'Durable clay pot',
    mainImage: '/images/pot.jpg',
    slug: 'clay-pot',
    inStock: 100,
    categoryId: 'pots',
  },
];

const demoCategories = [
  { id: 'flowers', name: 'flowers' },
  { id: 'plants', name: 'plants' },
  { id: 'pots', name: 'pots' },
  { id: 'seeds', name: 'seeds' },
  { id: 'stones', name: 'stones' },
];

async function insertDemoData() {
  for (const category of demoCategories) {
    await supabase.from('Category').insert(category);
  }
  console.log('Demo categories inserted successfully!');

  for (const product of demoProducts) {
    await supabase.from('Product').insert(product);
  }
  console.log('Demo products inserted successfully!');
}

insertDemoData().catch((error) => {
  console.error(error);
  process.exit(1);
});