'use server';

import { z } from 'zod';
import { verifyCoupon } from '@/ai/flows/coupon-verification';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createCoupon as dbCreateCoupon, getAllCoupons, getCouponById } from './db';
import { loggedInUser } from './mock-data';

const FormSchema = z.object({
  id: z.string(),
  title: z.string({
    invalid_type_error: 'Please enter a title.',
  }),
  description: z.string().optional(),
  originalPrice: z.coerce.number().min(0, { message: 'Original price must be a positive number.' }),
  sellingPrice: z.coerce.number().min(0, { message: 'Selling price must be a positive number.' }),
  expirationDate: z.string(),
  couponCode: z.string().min(1, { message: 'Please enter a coupon code or link.' }),
  terms: z.string().optional(),
  category: z.string().min(1, { message: 'Please select a category.' }),
});

const CreateCoupon = FormSchema.omit({ id: true });

export type State = {
  errors?: {
    title?: string[];
    description?: string[];
    originalPrice?: string[];
    sellingPrice?: string[];
    expirationDate?: string[];
    couponCode?: string[];
    terms?: string[];
    category?: string[];
  };
  message?: string | null;
  verification?: {
    isValid: boolean;
    confidenceScore: number;
    flaggedIssues: string[];
  } | null;
};

export async function createCoupon(prevState: State, formData: FormData) {
  const validatedFields = CreateCoupon.safeParse({
    title: formData.get('title'),
    description: formData.get('description'),
    originalPrice: formData.get('originalPrice'),
    sellingPrice: formData.get('sellingPrice'),
    expirationDate: formData.get('expirationDate'),
    couponCode: formData.get('couponCode'),
    terms: formData.get('terms'),
    category: formData.get('category'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Coupon.',
    };
  }

  const { title, description, originalPrice, sellingPrice, expirationDate, couponCode, terms, category } = validatedFields.data;

  try {
    const verificationResult = await verifyCoupon({
      title,
      description: description || '',
      originalPrice,
      sellingPrice,
      expirationDate: expirationDate,
      couponCode,
      terms: terms || '',
    });

    // Create the coupon in the database
    const newCoupon = await dbCreateCoupon({
      title,
      description: description || '',
      originalPrice,
      sellingPrice,
      expirationDate,
      couponCode,
      seller: loggedInUser,
      imageUrl: 'https://picsum.photos/seed/' + Date.now() + '/600/400',
      imageHint: title.toLowerCase(),
      category: category === 'food-drink' ? 'Food & Drink' : 
                category === 'books-media' ? 'Books & Media' : 
                category === 'health-beauty' ? 'Health & Beauty' :
                category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' & '),
      isVerified: verificationResult.isValid,
      verificationConfidence: verificationResult.confidenceScore,
      verificationIssues: verificationResult.flaggedIssues,
    });

    console.log('Coupon created:', newCoupon);
    console.log('Verification result:', verificationResult);

    // Revalidate the page to show the new coupon
    revalidatePath('/');
    
    // Return verification result to show in a dialog on the client
    return {
      message: 'Coupon submitted for verification!',
      verification: verificationResult
    };

  } catch (error) {
    console.error(error);
    return {
      message: 'Database Error: Failed to Create or Verify Coupon.',
    };
  }
}
