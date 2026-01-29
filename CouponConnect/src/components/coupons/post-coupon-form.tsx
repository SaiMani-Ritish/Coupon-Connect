'use client';

import { useActionState } from 'react';
import { createCoupon, type State } from '@/lib/actions';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Calendar as CalendarIcon, Loader2, CheckCircle, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';

function SubmitButton() {
  // This is a placeholder for a more complex pending state.
  // In a real app, you might use useFormStatus().
  const [pending, setPending] = useState(false);

  // A simple way to show pending state on form submission.
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    const form = formRef.current?.closest('form');
    if (!form) return;
    const handleSubmission = () => {
      setPending(true);
    };
    form.addEventListener('submit', handleSubmission);
    return () => form.removeEventListener('submit', handleSubmission);
  }, []);

  return (
    <Button type="submit" className="w-full" disabled={pending} ref={formRef as any}>
      {pending ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Submitting...
        </>
      ) : (
        'Post and Verify Coupon'
      )}
    </Button>
  );
}

export default function PostCouponForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, dispatch] = useActionState(createCoupon, initialState);
  const [date, setDate] = useState<Date>();
  const [showDialog, setShowDialog] = useState(false);
  const [category, setCategory] = useState<string>('');

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.message && state.verification) {
      setShowDialog(true);
      formRef.current?.reset();
      setDate(undefined);
    }
  }, [state]);

  return (
    <>
      <form ref={formRef} action={dispatch} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Coupon Title</Label>
          <Input id="title" name="title" placeholder="e.g., 20% off at Fashion Forward" required />
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
              state.errors.title.map((error: string) => (
                <p className="mt-2 text-sm text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="originalPrice">Original Price ($)</Label>
            <Input id="originalPrice" name="originalPrice" type="number" step="0.01" placeholder="e.g., 50.00" required />
             <div id="originalPrice-error" aria-live="polite" aria-atomic="true">
                {state.errors?.originalPrice &&
                state.errors.originalPrice.map((error: string) => (
                    <p className="mt-2 text-sm text-destructive" key={error}>
                    {error}
                    </p>
                ))}
             </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="sellingPrice">Your Selling Price ($)</Label>
            <Input id="sellingPrice" name="sellingPrice" type="number" step="0.01" placeholder="e.g., 5.00" required />
             <div id="sellingPrice-error" aria-live="polite" aria-atomic="true">
                {state.errors?.sellingPrice &&
                state.errors.sellingPrice.map((error: string) => (
                    <p className="mt-2 text-sm text-destructive" key={error}>
                    {error}
                    </p>
                ))}
             </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expirationDate">Expiration Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={'outline'}
                className={cn(
                  'w-full justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
            </PopoverContent>
          </Popover>
          <input type="hidden" name="expirationDate" value={date ? format(date, 'yyyy-MM-dd') : ''} />
          <div id="expirationDate-error" aria-live="polite" aria-atomic="true">
            {state.errors?.expirationDate &&
              state.errors.expirationDate.map((error: string) => (
                <p className="mt-2 text-sm text-destructive" key={error}>
                  {error}
                </p>
              ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="couponCode">Coupon Code or Link</Label>
            <Input id="couponCode" name="couponCode" placeholder="e.g., SAVE20NOW" required />
             <div id="couponCode-error" aria-live="polite" aria-atomic="true">
              {state.errors?.couponCode &&
                state.errors.couponCode.map((error: string) => (
                  <p className="mt-2 text-sm text-destructive" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select name="category" value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="food-drink">Food & Drink</SelectItem>
                <SelectItem value="apparel">Apparel</SelectItem>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="books-media">Books & Media</SelectItem>
                <SelectItem value="health-beauty">Health & Beauty</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
                <SelectItem value="entertainment">Entertainment</SelectItem>
                <SelectItem value="general">General</SelectItem>
              </SelectContent>
            </Select>
            <div id="category-error" aria-live="polite" aria-atomic="true">
              {state.errors?.category &&
                state.errors.category.map((error: string) => (
                  <p className="mt-2 text-sm text-destructive" key={error}>
                    {error}
                  </p>
                ))}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Description (Optional)</Label>
          <Textarea id="description" name="description" placeholder="Provide a brief description of the coupon." />
        </div>

        <div className="space-y-2">
          <Label htmlFor="terms">Terms & Conditions (Optional)</Label>
          <Textarea id="terms" name="terms" placeholder="Enter any terms and conditions, e.g., 'Not valid with other offers'." />
        </div>
        
        <SubmitButton />
      </form>

      {state.verification && (
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="flex items-center">
                {state.verification.isValid ? (
                  <CheckCircle className="h-6 w-6 text-green-500 mr-2" />
                ) : (
                  <AlertTriangle className="h-6 w-6 text-yellow-500 mr-2" />
                )}
                Coupon Verification Result
              </DialogTitle>
              <DialogDescription>{state.message}</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <p>
                Our AI has analyzed your coupon. Here's the result:
              </p>
              <div className="p-4 bg-secondary rounded-lg space-y-2">
                <p><strong>Likely Valid:</strong> {state.verification.isValid ? 'Yes' : 'No'}</p>
                <p><strong>Confidence Score:</strong> {Math.round(state.verification.confidenceScore * 100)}%</p>
                {state.verification.flaggedIssues.length > 0 && (
                  <div>
                    <strong>Potential Issues:</strong>
                    <ul className="list-disc pl-5 mt-1 text-sm text-destructive">
                      {state.verification.flaggedIssues.map((issue, index) => (
                        <li key={index}>{issue}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
               <p className="text-xs text-muted-foreground">
                A moderator will review this assessment. Your coupon will be marked as verified upon approval.
              </p>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowDialog(false)}>Close</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
