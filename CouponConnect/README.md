# CouponConnect

A peer-to-peer marketplace for buying and selling digital coupons, built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Coupon Listings**: Browse and search through available coupons with filtering options
- **Coupon Upload**: Sellers can upload coupon details with AI-powered verification
- **Real-time Chat**: Direct messaging between buyers and sellers
- **User Authentication**: Secure login and registration system
- **AI Verification**: Automated coupon verification using Google's Gemini AI
- **Responsive Design**: Beautiful UI that works on all devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd CouponConnect
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Update `.env.local` with your configuration:
   - Add your Google AI API key for coupon verification
   - Set a secure NextAuth secret

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Demo Credentials

For testing purposes, use these demo credentials:
- **Email**: user-1@example.com
- **Password**: password123

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Radix UI components
- **Authentication**: NextAuth.js
- **AI Integration**: Google Gemini AI via Genkit
- **Database**: In-memory storage (easily replaceable with PostgreSQL, MongoDB, etc.)
- **Real-time**: WebSocket support ready for Socket.io

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
│   ├── ui/             # Base UI components (buttons, cards, etc.)
│   ├── chat/           # Chat-related components
│   ├── coupons/        # Coupon-related components
│   └── layout/         # Layout components
├── lib/                # Utility functions and configurations
├── ai/                 # AI integration and flows
└── hooks/              # Custom React hooks
```

## Key Features Implementation

### AI-Powered Coupon Verification
- Uses Google's Gemini AI to analyze coupon legitimacy
- Provides confidence scores and flags potential issues
- Helps moderators make informed decisions

### Real-time Chat System
- Direct messaging between buyers and sellers
- Chat history persistence
- Clean, intuitive chat interface

### Responsive Design
- Mobile-first approach
- Beautiful animations and transitions
- Accessible UI components

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
