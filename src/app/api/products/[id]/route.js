import { PrismaClient } from '@prisma/client';
import { sanitizeString, ipRateLimiter } from '@/lib/serverMiddleware';

const prisma = new PrismaClient();

export async function GET(req, { params }) {
  const id = params.id;
  try {
    const product = await prisma.product.findUnique({ where: { id } });
    if (!product) return new Response(JSON.stringify({ error: 'Not found' }), { status: 404 });
    return new Response(JSON.stringify({ data: product }), { status: 200 });
  } catch (err) {
    console.error('GET /api/products/[id] error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'local';
    const rl = ipRateLimiter(ip);
    if (!rl.ok) return new Response(JSON.stringify({ error: 'Rate limit' }), { status: 429 });

    const body = await req.json();
    const id = params.id;
    const data = {};
    if (body.name) data.name = sanitizeString(body.name);
    if (body.description) data.description = sanitizeString(body.description);
    if (body.price) data.price = Number(body.price);
    if (typeof body.inStock !== 'undefined') data.inStock = Number(body.inStock);
    if (body.images) data.images = Array.isArray(body.images) ? body.images.map(sanitizeString) : [];

    const updated = await prisma.product.update({ where: { id }, data });
    return new Response(JSON.stringify({ data: updated }), { status: 200 });
  } catch (err) {
    console.error('PUT /api/products/[id] error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const id = params.id;
    await prisma.product.delete({ where: { id } });
    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('DELETE /api/products/[id] error', err);
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}
