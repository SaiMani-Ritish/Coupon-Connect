'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Chat, User } from '@/lib/definitions';
import { loggedInUser } from '@/lib/mock-data';


interface ChatListProps {
  chats: Chat[];
  isCollapsed?: boolean;
}

function getOtherUser(chat: Chat): User {
    return chat.buyer.id === loggedInUser.id ? chat.seller : chat.buyer;
}

export function ChatList({ chats, isCollapsed }: ChatListProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full p-2" data-collapsed={isCollapsed}>
      <div className="flex-1 overflow-auto">
        <nav className="grid gap-1 px-2">
          {chats.map((chat) => {
            const otherUser = getOtherUser(chat);
            return (
              <Link
                key={chat.id}
                href={`/chat/${chat.id}`}
                className={cn(
                  buttonVariants({ variant: pathname === `/chat/${chat.id}` ? 'secondary' : 'ghost', size: 'lg' }),
                  'justify-start'
                )}
              >
                <Avatar className="h-8 w-8 mr-3">
                    <AvatarImage src={otherUser.avatarUrl} alt={otherUser.username} />
                    <AvatarFallback>{otherUser.username.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start truncate">
                    <span className="font-semibold">{otherUser.username}</span>
                    <span className="text-xs text-muted-foreground truncate">{chat.coupon.title}</span>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  );
}
