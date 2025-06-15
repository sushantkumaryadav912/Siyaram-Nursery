import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import supabase from '@/utils/db';
import bcrypt from 'bcryptjs';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const { data: user } = await supabase
          .from('User')
          .select('*')
          .eq('email', credentials.email)
          .single();
        if (user && bcrypt.compareSync(credentials.password, user.password)) {
          return { id: user.id, email: user.email, role: user.role };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/auth/login',
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };