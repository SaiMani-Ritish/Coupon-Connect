import { getChatsByUser } from '@/lib/db';
import { loggedInUser } from '@/lib/mock-data';
import { ChatLayout } from '@/components/chat/chat-layout';

export default async function ChatAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chats = await getChatsByUser(loggedInUser.id);
  
  return (
    <div className="container mx-auto py-8">
        <ChatLayout defaultLayout={[320, 1080]} navCollapsedSize={8} chats={chats}>
            {children}
        </ChatLayout>
    </div>
  );
}
