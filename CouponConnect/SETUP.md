# CouponConnect Setup Guide

## Environment Variables Setup

To run the app without errors, you should create a `.env.local` file in the root directory with the following content:

```bash
# NextAuth Configuration
NEXTAUTH_SECRET=your-super-secret-key-change-this-in-production-min-32-chars-long
NEXTAUTH_URL=http://localhost:3000
```

### How to Create the .env.local File

1. In the root directory of your project (`CouponConnect`), create a new file named `.env.local`
2. Copy and paste the environment variables above
3. Save the file
4. Restart the development server

**Note:** The app will still work without this file because I've added a fallback secret in the code for development purposes. However, for production, you **MUST** set a proper `NEXTAUTH_SECRET`.

## Generate a Secure NextAuth Secret

To generate a secure secret for production, you can run:

```bash
# Using OpenSSL
openssl rand -base64 32

# Or using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

## Current Configuration

The app now includes:
- ✅ NextAuth secret with development fallback
- ✅ Updated Next.js config (no more deprecation warnings)
- ✅ Hydration warning suppression for browser extension compatibility
- ✅ Proper image configuration using `remotePatterns`

## Hydration Warnings

If you see hydration warnings in the console about attributes like `jf-ext-cache-id`, this is caused by browser extensions (like form fillers or password managers) modifying the HTML. This is normal and won't affect functionality. The app already has `suppressHydrationWarning` configured to handle this.

## Running the App

```bash
npm run dev
```

The app will be available at `http://localhost:3000` (or the next available port if 3000 is in use).


