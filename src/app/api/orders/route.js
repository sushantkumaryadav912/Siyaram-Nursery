import { PrismaClient } from '@prisma/client';
import { sanitizeString, ipRateLimiter } from '@/lib/serverMiddleware';

const prisma = new PrismaClient();

export async function POST(req) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'local';
    const rl = ipRateLimiter(ip);
    if (!rl.ok) return new Response(JSON.stringify({ error: 'Rate limit exceeded' }), { status: 429 });

    const body = await req.json();
    const { userId, items, shipping, paymentIntent } = body;

    if (!Array.isArray(items) || items.length === 0) {
      return new Response(JSON.stringify({ error: 'No items' }), { status: 400 });
    }
    const cleanItems = items.map((it) => ({
      productId: sanitizeString(it.productId),
      qty: Number(it.qty) || 0,
      price: Number(it.price) || 0,
    }));

    const result = await prisma.$transaction(async (tx) => {
      for (const it of cleanItems) {
        const p = await tx.product.findUnique({ where: { id: it.productId } });
        if (!p) throw new Error(`Product not found: ${it.productId}`);
        if (p.inStock < it.qty) throw new Error(`Insufficient stock for product ${p.id}`);
      }

      const order = await tx.order.create({
        data: {
          userId: userId || null,
          total: cleanItems.reduce((s, i) => s + i.qty * i.price, 0),
          shipping: shipping ? JSON.stringify(shipping) : null,
          paymentIntent: paymentIntent || null,
          status: 'PENDING',
        },
      });

      for (const it of cleanItems) {
        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: it.productId,
            qty: it.qty,
            price: it.price,
          },
        });

        await tx.product.update({
          where: { id: it.productId },
          data: { inStock: { decrement: it.qty } },
        });
      }

      return order;
    });

    return new Response(JSON.stringify({ data: result }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    console.error('POST /api/orders error', err);
    const msg = err.message || 'Server error';
    return new Response(JSON.stringify({ error: msg }), { status: 400 });
  }
}
