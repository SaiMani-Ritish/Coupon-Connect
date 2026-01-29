import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loggedInUser } from "@/lib/mock-data";
import { getCouponsBySeller, getChatsByUser } from "@/lib/db";
import { Edit } from "lucide-react";
import CouponList from "@/components/coupons/coupon-list";
import { ChatList } from "@/components/chat/chat-list";

export default async function ProfilePage() {
    const user = loggedInUser;
    const [userCoupons, userChats] = await Promise.all([
        getCouponsBySeller(user.id),
        getChatsByUser(user.id)
    ]);

    return (
        <div className="container mx-auto max-w-5xl px-4 py-8">
            <Card className="mb-8">
                <CardContent className="p-6 flex flex-col md:flex-row items-center gap-6">
                    <Avatar className="h-24 w-24 border-2 border-primary">
                        <AvatarImage src={user.avatarUrl} alt={user.username} />
                        <AvatarFallback className="text-3xl">{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div className="flex-grow text-center md:text-left">
                        <h1 className="text-3xl font-bold font-headline">{user.username}</h1>
                        <p className="text-muted-foreground">{user.id}@example.com</p>
                    </div>
                    <Button variant="outline">
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Profile
                    </Button>
                </CardContent>
            </Card>

            <Tabs defaultValue="listings">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="listings">My Listings</TabsTrigger>
                    <TabsTrigger value="chats">Chat History</TabsTrigger>
                </TabsList>
                <TabsContent value="listings" className="mt-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Your Active Listings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {userCoupons.length > 0 ? (
                                <CouponList coupons={userCoupons} />
                            ) : (
                                <p className="text-muted-foreground">You have not listed any coupons yet.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="chats" className="mt-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>Your Conversations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ChatList chats={userChats} />
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
