import { getChatsByUser } from '@/lib/db';
import { ChatList } from '@/components/chat/chat-list';
import { loggedInUser } from '@/lib/mock-data';

export default async function ChatPage() {
    const chats = await getChatsByUser(loggedInUser.id);

    return (
        <div className="flex h-[calc(100vh-14rem)]">
            <div className="w-1/3 border-r">
                <div className="p-4 border-b">
                    <h2 className="text-xl font-bold font-headline">My Chats</h2>
                </div>
                <ChatList chats={chats} />
            </div>
            <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold font-headline">Select a chat</h2>
                    <p className="text-muted-foreground">
                        Choose one of your existing conversations to continue messaging.
                    </p>
                </div>
            </div>
        </div>
    );
}
