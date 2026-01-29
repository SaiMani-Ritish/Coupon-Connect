import type { Coupon } from '@/lib/definitions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { CheckCircle2, XCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

type CouponCardProps = {
  coupon: Coupon;
};

export default function CouponCard({ coupon }: CouponCardProps) {
  const expirationDate = parseISO(coupon.expirationDate);

  return (
    <Card className="flex flex-col overflow-hidden h-full transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={coupon.imageUrl}
            alt={coupon.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
            data-ai-hint={coupon.imageHint}
          />
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Badge variant="secondary">{coupon.category}</Badge>
          {coupon.isVerified ? (
            <Badge variant="default" className="bg-accent text-accent-foreground hover:bg-accent/80">
              <CheckCircle2 className="h-4 w-4 mr-1" />
              Verified
            </Badge>
          ) : (
            <Badge variant="destructive">
              <XCircle className="h-4 w-4 mr-1" />
              Not Verified
            </Badge>
          )}
        </div>
        <CardTitle className="text-lg font-headline mb-2 h-14 line-clamp-2">{coupon.title}</CardTitle>
        <CardDescription className="line-clamp-3 h-[60px]">{coupon.description}</CardDescription>
        <div className="mt-4 flex justify-between items-center text-sm text-muted-foreground">
          <span>Sold by: {coupon.seller.username}</span>
          <span>Expires: {format(expirationDate, 'MMM d, yyyy')}</span>
        </div>
      </CardContent>
      <CardFooter className="p-4 bg-secondary/30 flex justify-between items-center">
        <div className="font-bold text-xl text-primary">
          ${coupon.sellingPrice.toFixed(2)}
          <span className="text-sm font-normal text-muted-foreground line-through ml-2">
            ${coupon.originalPrice.toFixed(2)}
          </span>
        </div>
        <Button asChild size="sm">
          <Link href={`/coupons/${coupon.id}`}>
            View Deal <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
