import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

export async function requireAdmin(req) {
  const session = await getServerSession(authOptions);
  if (!session?.user) throw new Error('UNAUTHORIZED');
  if (session.user.role !== 'ADMIN') throw new Error('FORBIDDEN');
  return session;
}
