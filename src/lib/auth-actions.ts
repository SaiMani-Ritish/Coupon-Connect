'use server';

import { signIn, signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { createUser, getUserByUsername } from './db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const LoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const SignupSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export type AuthState = {
  errors?: {
    email?: string[];
    password?: string[];
    username?: string[];
  };
  message?: string | null;
};

export async function loginAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const validatedFields = LoginSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Invalid credentials',
    };
  }

  const { email, password } = validatedFields.data;

  try {
    // For demo purposes, we'll use a simple password check
    // In a real app, you would verify against hashed passwords in the database
    if (password !== 'password123') {
      return {
        message: 'Invalid credentials',
      };
    }

    // Extract user ID from email (demo logic)
    const userId = email.split('@')[0];
    
    // In a real app, you would redirect after successful login
    redirect('/');
  } catch (error) {
    console.error('Login error:', error);
    return {
      message: 'An error occurred during login',
    };
  }
}

export async function signupAction(prevState: AuthState, formData: FormData): Promise<AuthState> {
  const validatedFields = SignupSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Please check your input',
    };
  }

  const { username, email, password } = validatedFields.data;

  try {
    // Check if user already exists
    const existingUser = await getUserByUsername(username);
    if (existingUser) {
      return {
        message: 'Username already exists',
      };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const newUser = await createUser({
      username,
      avatarUrl: `https://i.pravatar.cc/150?u=${username}`,
    });

    // In a real app, you would save the user with hashed password to database
    console.log('New user created:', newUser);

    return {
      message: 'Account created successfully! Please login.',
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      message: 'An error occurred during signup',
    };
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: '/' });
}
