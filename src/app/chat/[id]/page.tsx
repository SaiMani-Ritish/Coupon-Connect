import { getChatById, getChatsByUser } from '@/lib/db';
import { ChatDisplay } from '@/components/chat/chat-display';
import { ChatList } from '@/components/chat/chat-list';
import { notFound } from 'next/navigation';
import { loggedInUser } from '@/lib/mock-data';

export default async function ChatConversationPage({ params }: { params: { id: string } }) {
    const [chat, chats] = await Promise.all([
        getChatById(params.id),
        getChatsByUser(loggedInUser.id)
    ]);

    if (!chat) {
        notFound();
    }

    return (
        <div className="flex h-[calc(100vh-14rem)]">
            <div className="w-1/3 border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold font-headline">My Chats</h2>
                </div>
                <ChatList chats={chats} />
            </div>
            <div className="flex-1 flex flex-col">
                <ChatDisplay chat={chat} />
            </div>
        </div>
    );
}
