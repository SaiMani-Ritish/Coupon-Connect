import { getCouponById } from '@/lib/db';
import { loggedInUser } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format, parseISO, formatDistanceToNow } from 'date-fns';
import { CheckCircle2, XCircle, MessageSquare, AlertTriangle, User, Calendar, Tag, Info } from 'lucide-react';
import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import { StartChatButton } from '@/components/chat/start-chat-button';

export default async function CouponDetailPage({ params }: { params: { couponId: string } }) {
  const coupon = await getCouponById(params.couponId);

  if (!coupon) {
    notFound();
  }

  const isSeller = coupon.seller.id === loggedInUser.id;

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="relative aspect-video w-full overflow-hidden rounded-lg shadow-lg mb-4">
            <Image
              src={coupon.imageUrl}
              alt={coupon.title}
              fill
              className="object-cover"
              data-ai-hint={coupon.imageHint}
            />
          </div>
          {isSeller && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <AlertTriangle className="h-5 w-5 mr-2 text-primary" />
                  AI Verification Report
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <p>
                  <strong>Likely Valid:</strong> {coupon.isVerified ? 'Yes' : 'No'}
                </p>
                <p>
                  <strong>Confidence:</strong> {coupon.verificationConfidence ? Math.round(coupon.verificationConfidence * 100) : 'N/A'}%
                </p>
                {coupon.verificationIssues && coupon.verificationIssues.length > 0 && (
                  <div>
                    <strong>Potential Issues:</strong>
                    <ul className="list-disc pl-5 mt-1 text-destructive">
                      {coupon.verificationIssues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="text-xs text-muted-foreground pt-2">
                  This report is visible only to you.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
        <div>
          <Badge variant="secondary" className="mb-2">{coupon.category}</Badge>
          <h1 className="text-3xl font-bold font-headline mb-2">{coupon.title}</h1>
          <div className="flex items-center space-x-2 mb-4">
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
          <p className="text-muted-foreground mb-6">{coupon.description}</p>

          <div className="mb-6 space-y-3 text-sm">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-3 text-muted-foreground" />
              <span>Sold by: <strong className="text-primary">{coupon.seller.username}</strong></span>
            </div>
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
              <span>Expires: <strong>{format(parseISO(coupon.expirationDate), 'MMMM d, yyyy')}</strong></span>
            </div>
            <div className="flex items-center">
              <Tag className="h-4 w-4 mr-3 text-muted-foreground" />
              <span>Code: <strong className="font-mono bg-muted px-2 py-1 rounded">{coupon.couponCode}</strong></span>
            </div>
            <div className="flex items-center">
              <Info className="h-4 w-4 mr-3 text-muted-foreground" />
              <span>Posted {formatDistanceToNow(parseISO(coupon.postDate))} ago</span>
            </div>
          </div>

          <Separator className="my-6" />

          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Price</p>
              <p className="text-3xl font-bold text-primary">${coupon.sellingPrice.toFixed(2)}</p>
              <p className="text-sm text-muted-foreground line-through">
                Original Value: ${coupon.originalPrice.toFixed(2)}
              </p>
            </div>
            {!isSeller ? (
              <StartChatButton coupon={coupon} />
            ) : (
              <Button size="lg" disabled>
                <MessageSquare className="mr-2 h-5 w-5" />
                Your Coupon
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
