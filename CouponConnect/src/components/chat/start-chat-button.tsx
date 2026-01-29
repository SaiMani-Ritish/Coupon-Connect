'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';
import { Coupon } from '@/lib/definitions';
import { getOrCreateChat } from '@/lib/chat-actions';
import { useRouter } from 'next/navigation';

interface StartChatButtonProps {
  coupon: Coupon;
}

export function StartChatButton({ coupon }: StartChatButtonProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleStartChat = async () => {
    if (isLoading) return;

    setIsLoading(true);
    try {
      const chat = await getOrCreateChat(coupon.id, coupon.title, coupon.seller.id);
      if (chat) {
        router.push(`/chat/${chat.id}`);
      }
    } catch (error) {
      console.error('Failed to start chat:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button size="lg" onClick={handleStartChat} disabled={isLoading}>
      <MessageSquare className="mr-2 h-5 w-5" />
      {isLoading ? 'Starting Chat...' : 'Contact Seller'}
    </Button>
  );
}
