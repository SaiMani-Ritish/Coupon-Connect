'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Chat, Message } from '@/lib/definitions';
import { cn } from '@/lib/utils';
import { Send } from 'lucide-react';
import { loggedInUser } from '@/lib/mock-data';
import { useState, useRef, useEffect } from 'react';
import { addMessageToChat } from '@/lib/db';

interface ChatDisplayProps {
  chat: Chat;
}

export function ChatDisplay({ chat }: ChatDisplayProps) {
  const [messages, setMessages] = useState<Message[]>(chat.messages);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isLoading) return;

    setIsLoading(true);
    const messageText = newMessage.trim();
    setNewMessage('');

    try {
      const newMsg = await addMessageToChat(chat.id, {
        sender: loggedInUser,
        text: messageText,
      });

      if (newMsg) {
        setMessages(prev => [...prev, newMsg]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <h3 className="font-semibold">{chat.coupon.title}</h3>
        <p className="text-sm text-muted-foreground">
          Chat with {chat.buyer.id === loggedInUser.id ? chat.seller.username : chat.buyer.username}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div
            key={`${message.id}-${index}`}
            className={cn(
              'flex items-end gap-2',
              message.sender.id === loggedInUser.id ? 'justify-end' : 'justify-start'
            )}
          >
            {message.sender.id !== loggedInUser.id && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.sender.avatarUrl} alt={message.sender.username} />
                <AvatarFallback>{message.sender.username.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={cn(
                'rounded-lg px-4 py-2 max-w-xs lg:max-w-md',
                message.sender.id === loggedInUser.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-secondary'
              )}
            >
              <p className="text-sm">{message.text}</p>
            </div>
            {message.sender.id === loggedInUser.id && (
              <Avatar className="h-8 w-8">
                <AvatarImage src={message.sender.avatarUrl} alt={message.sender.username} />
                <AvatarFallback>{message.sender.username.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <form onSubmit={handleSubmit} className="flex w-full items-center space-x-2">
          <Input
            id="message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            autoComplete="off"
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading || !newMessage.trim()}>
            <Send className="h-4 w-4" />
            <span className="sr-only">Send</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
