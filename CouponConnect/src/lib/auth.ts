import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { users } from './mock-data';

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || 'development-secret-key-min-32-characters-long-for-nextauth',
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        console.log('Authorize attempt:', credentials);
        if (!credentials?.email || !credentials?.password) {
          console.log('Missing credentials');
          return null;
        }

        // In a real app, you would query your database here
        const userId = credentials.email.split('@')[0];
        const user = users.find(u => u.id === userId || u.id === credentials.email);

        if (!user) {
          console.log('User not found:', userId);
          return null;
        }

        console.log('User found:', user.username);

        // For demo purposes, we'll use a simple password check
        // In a real app, you would compare with a hashed password from the database
        const isValidPassword = credentials.password === 'password123'; // Demo password

        if (!isValidPassword) {
          return null;
        }

        return {
          id: user.id,
          email: `${user.id}@example.com`,
          name: user.username,
          image: user.avatarUrl,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
};
