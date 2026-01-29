'use client';

import dynamic from 'next/dynamic';

// Import CouponFilters as a client-only component to avoid hydration issues with browser extensions
const CouponFilters = dynamic(() => import('./coupon-filters'), {
  ssr: false,
  loading: () => (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="h-10 bg-muted animate-pulse rounded-md flex-grow"></div>
      <div className="flex gap-4">
        <div className="h-10 bg-muted animate-pulse rounded-md w-full md:w-[180px]"></div>
        <div className="h-10 bg-muted animate-pulse rounded-md w-full md:w-[180px]"></div>
      </div>
    </div>
  ),
});

export default function CouponFiltersWrapper() {
  return <CouponFilters />;
}

