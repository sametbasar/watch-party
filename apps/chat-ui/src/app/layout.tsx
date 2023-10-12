import { Suspense } from 'react';

import { Theme } from '@radix-ui/themes';
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import { Inter } from 'next/font/google';

import { HeaderSkeleton } from '~/components/header';

import LayoutClient from './layout.client';

import '@radix-ui/themes/styles.css';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Watch Party',
  description: 'watch party netflix together mode',
};

const DynamicHeader = dynamic(() => import('~/components/header/header'), {
  ssr: false,
  loading: () => <HeaderSkeleton />,
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html className="dark" lang="en">
      <body className={inter.className}>
        <LayoutClient>
          <Theme>
            <div className="h-screen px-3">
              <Suspense fallback={<HeaderSkeleton />}>
                <DynamicHeader />
              </Suspense>
              {children}
            </div>
          </Theme>
        </LayoutClient>
      </body>
    </html>
  );
}
