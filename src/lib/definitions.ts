export type User = {
  id: string;
  username: string;
  avatarUrl: string;
};

export type Coupon = {
  id: string;
  title: string;
  description: string;
  originalPrice: number;
  sellingPrice: number;
  expirationDate: string;
  couponCode: string;
  seller: User;
  postDate: string;
  imageUrl: string;
  imageHint: string;
  category: string;
  isVerified: boolean;
  verificationConfidence?: number;
  verificationIssues?: string[];
};

export type Message = {
  id: string;
  sender: User;
  text: string;
  timestamp: string;
};

export type Chat = {
  id: string;
  buyer: User;
  seller: User;
  coupon: Pick<Coupon, 'id' | 'title'>;
  messages: Message[];
};
