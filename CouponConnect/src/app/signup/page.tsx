'use client';

import { useActionState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { signupAction, type AuthState } from '@/lib/auth-actions';

export default function SignupPage() {
  const initialState: AuthState = { message: null, errors: {} };
  const [state, dispatch] = useActionState(signupAction, initialState);

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-headline">Create an Account</CardTitle>
            <CardDescription>
              Join the marketplace to start buying and selling coupons.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={dispatch} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" name="username" type="text" placeholder="Your Username" required />
                {state.errors?.username && (
                  <p className="text-sm text-destructive">{state.errors.username[0]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {state.errors?.email && (
                  <p className="text-sm text-destructive">{state.errors.email[0]}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" name="password" type="password" required />
                {state.errors?.password && (
                  <p className="text-sm text-destructive">{state.errors.password[0]}</p>
                )}
              </div>
              {state.message && (
                <p className={`text-sm text-center ${state.message.includes('successfully') ? 'text-green-600' : 'text-destructive'}`}>
                  {state.message}
                </p>
              )}
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
            <div className="mt-6 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="font-medium text-primary hover:underline">
                Login
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
