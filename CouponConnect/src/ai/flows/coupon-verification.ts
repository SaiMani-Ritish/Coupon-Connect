'use server';

/**
 * @fileOverview An AI tool for verifying coupon legitimacy.
 *
 * - verifyCoupon - A function that verifies coupon details against known patterns.
 * - CouponVerificationInput - The input type for the verifyCoupon function.
 * - CouponVerificationOutput - The return type for the verifyCoupon function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CouponVerificationInputSchema = z.object({
  title: z.string().describe('The title of the coupon.'),
  description: z.string().describe('The description of the coupon.'),
  originalPrice: z.number().describe('The original price of the product/service.'),
  sellingPrice: z.number().describe('The selling price of the coupon.'),
  expirationDate: z.string().describe('The expiration date of the coupon (YYYY-MM-DD).'),
  couponCode: z.string().describe('The coupon code or link.'),
  terms: z.string().describe('Terms and conditions of the coupon'),
});
export type CouponVerificationInput = z.infer<typeof CouponVerificationInputSchema>;

const CouponVerificationOutputSchema = z.object({
  isValid: z.boolean().describe('Whether the coupon is likely valid based on the details provided.'),
  confidenceScore: z.number().describe('A score between 0 and 1 indicating the confidence in the validity.'),
  flaggedIssues: z.array(z.string()).describe('A list of potential issues or inconsistencies found in the coupon details.'),
});
export type CouponVerificationOutput = z.infer<typeof CouponVerificationOutputSchema>;

export async function verifyCoupon(input: CouponVerificationInput): Promise<CouponVerificationOutput> {
  return ai.verifyCoupon(input);
}
