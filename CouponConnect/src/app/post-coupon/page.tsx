import PostCouponForm from "@/components/coupons/post-coupon-form";

export default function PostCouponPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight font-headline">
          Sell Your Coupon
        </h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Fill out the form below to list your coupon on the marketplace.
        </p>
      </header>
      <PostCouponForm />
    </div>
  );
}
