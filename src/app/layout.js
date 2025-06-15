import './globals.css';
import { Navbar, Footer } from '@/components';
import SessionProvider from '@/utils/SessionProvider';
import Providers from '@/Providers';
import { getServerSession } from 'next-auth';

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en" data-theme="light">
      <body className="font-sans">
        <SessionProvider session={session}>
          <Navbar />
          <Providers>{children}</Providers>
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}