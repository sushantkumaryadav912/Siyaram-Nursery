import supabase from '@/utils/db';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

export async function POST(request) {
  const { name, email, password } = await request.json();
  try {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const { error } = await supabase.from('User').insert({
      id: nanoid(),
      email,
      password: hashedPassword,
      role: 'user',
    });
    if (error) {
      return new Response(JSON.stringify({ error: error.message }), { status: 400 });
    }
    return new Response(JSON.stringify({ message: 'User registered' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Server error' }), { status: 500 });
  }
}