import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from './Providers';
import { Toaster } from '@/components/ui/toaster';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Client Satisfaction Measurement',
  description: 'Thesis Program'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <main className=' overflow-scroll md:overflow-hidden'>
          <AuthProvider>{children}</AuthProvider>{' '}
        </main>
        <Toaster />
      </body>
    </html>
  );
}
