// Note: This is a simplified, non-resizable version for demonstration.
// A full implementation would use a library like 'react-resizable-panels'.

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { ChatList } from './chat-list';
import { Chat } from '@/lib/definitions';

interface ChatLayoutProps {
  defaultLayout: number[] | undefined;
  navCollapsedSize: number;
  chats: Chat[];
  children: React.ReactNode;
}

export function ChatLayout({
  chats,
  children,
}: ChatLayoutProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(false);

  return (
    <div className="flex h-[calc(100vh-14rem)] border rounded-lg overflow-hidden">
      <div
        className={cn(
          'transition-all duration-300 ease-in-out',
          isCollapsed ? 'w-0' : 'w-[320px]'
        )}
      >
        <ChatList chats={chats} isCollapsed={isCollapsed} />
      </div>
      {/* Simple separator */}
      <div className="w-px bg-border" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
