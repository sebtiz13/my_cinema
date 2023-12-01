import type { Metadata } from 'next';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import { SearchBar } from '@/components';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'My cinema',
  description: 'NestJS + Next.JS app',
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-slate-800">
          <div className="relative container mx-auto h-10 flex items-center">
            <div className="z-[2]">
              <Link href="/">My library</Link>
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-[1]">
              <SearchBar />
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}
