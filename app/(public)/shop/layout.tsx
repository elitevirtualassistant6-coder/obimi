import type { Metadata } from 'next';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Shop',
  description: 'Support Obimi and spread awareness with our range of products.',
};

export default function Layout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
