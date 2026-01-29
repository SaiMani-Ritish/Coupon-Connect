import { Ticket } from 'lucide-react';
import Link from 'next/link';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <Ticket className="h-6 w-6 text-primary" />
      <span className="font-bold inline-block font-headline">CouponConnect</span>
    </Link>
  );
}
