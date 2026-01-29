import type { Coupon } from '@/lib/definitions';
import CouponCard from './coupon-card';

type CouponListProps = {
  coupons: Coupon[];
};

export default function CouponList({ coupons }: CouponListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {coupons.map((coupon) => (
        <CouponCard key={coupon.id} coupon={coupon} />
      ))}
    </div>
  );
}
