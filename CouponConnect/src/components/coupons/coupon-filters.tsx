'use client';

import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function CouponFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get('query') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'all');

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('query', query);
    } else {
      params.delete('query');
    }

    if (category && category !== 'all') {
      params.set('category', category);
    } else {
      params.delete('category');
    }

    const timer = setTimeout(() => {
      router.push(`/?${params.toString()}`);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, category, router, searchParams]);

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="relative flex-grow">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search for coupons (e.g., 'pizza', 'fashion')..."
          className="pl-10 w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="food-drink">Food & Drink</SelectItem>
            <SelectItem value="apparel">Apparel</SelectItem>
            <SelectItem value="electronics">Electronics</SelectItem>
            <SelectItem value="books-media">Books & Media</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
