import { PrismaClient } from '@prisma/client';
import { sanitizeString, ipRateLimiter } from '@/lib/serverMiddleware';

const prisma = new PrismaClient();
export async function GET(req) {
  try {
    const url = new URL(req.url);
    const search = sanitizeString(url.searchParams.get('q') || '');
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const limit = Math.min(parseInt(url.searchParams.get('limit') || '12', 10), 100);
    const skip = (Math.max(page, 1) - 1) * limit;

    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { description: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const [items, count] = await Promise.all([
      prisma.product.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip,
      }),
      prisma.product.count({ where }),
    ]);

    return new Response(JSON.stringify({ data: items, total: count, page, limit }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('GET /api/products error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'local';
    const rl = ipRateLimiter(ip);
    if (!rl.ok) {
      return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), {
        status: 429,
        headers: { 'Retry-After': String(Math.ceil(rl.retryAfterMs / 1000)) },
      });
    }

    const body = await req.json();
    const name = sanitizeString(body.name);
    const description = sanitizeString(body.description || '');
    const price = Number(body.price || 0);
    const inStock = Number(body.inStock || 0);
    const images = Array.isArray(body.images) ? body.images.map(sanitizeString) : [];

    if (!name || price <= 0) {
      return new Response(JSON.stringify({ error: 'Invalid data' }), { status: 400 });
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        price,
        inStock,
        images: images, 
        slug: (body.slug && sanitizeString(body.slug)) || name.toLowerCase().replace(/\s+/g, '-'),
      },
    });

    return new Response(JSON.stringify({ data: product }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('POST /api/products error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
