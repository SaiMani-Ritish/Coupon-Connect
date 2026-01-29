'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';

const navItems = [
  {
    name: 'Discover',
    href: '/',
  },
  {
    name: 'Post a Coupon',
    href: '/post-coupon',
  },
  {
    name: 'My Chats',
    href: '/chat',
  },
];

export default function MainNav({ className }: { className?: string }) {
  const pathname = usePathname();

  return (
    <nav className={cn('hidden md:flex items-center space-x-4 lg:space-x-6', className)}>
      {navItems.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'text-sm font-medium transition-colors hover:text-primary',
            pathname === item.href ? 'text-primary' : 'text-muted-foreground'
          )}
        >
          {item.name}
        </Link>
      ))}
    </nav>
  );
}
