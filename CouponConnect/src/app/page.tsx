import { searchCoupons } from '@/lib/db';
import CouponList from '@/components/coupons/coupon-list';
import CouponFiltersWrapper from '@/components/coupons/coupon-filters-wrapper';

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string; category?: string }>;
}) {
  const { query, category } = await searchParams;
  const coupons = await searchCoupons(query || '', category || 'all');

  return (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Discover Your Next Great Deal
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Browse and buy coupons from sellers across the marketplace.
        </p>
      </header>
      <div className="mb-8">
        <CouponFiltersWrapper />
      </div>
      <div>
        {coupons.length > 0 ? (
          <CouponList coupons={coupons} />
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No coupons available at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
}
