// Simple in-memory database for demo purposes
// In a real app, you would use a proper database like PostgreSQL, MongoDB, etc.

import type { User, Coupon, Chat, Message } from './definitions';
import { v4 as uuidv4 } from 'uuid';

// In-memory storage
let dbUsers: User[] = [];
let dbCoupons: Coupon[] = [];
let dbChats: Chat[] = [];

// Initialize with mock data
export function initializeDatabase() {
  const { users, coupons, chats } = require('./mock-data');
  dbUsers = [...users];
  dbCoupons = [...coupons];
  dbChats = [...chats];
}

// User operations
export async function createUser(userData: Omit<User, 'id'>): Promise<User> {
  const newUser: User = {
    id: uuidv4(),
    ...userData,
  };
  dbUsers.push(newUser);
  return newUser;
}

export async function getUserById(id: string): Promise<User | null> {
  return dbUsers.find(user => user.id === id) || null;
}

export async function getUserByUsername(username: string): Promise<User | null> {
  return dbUsers.find(user => user.username === username) || null;
}

export async function getAllUsers(): Promise<User[]> {
  return [...dbUsers];
}

// Coupon operations
export async function createCoupon(couponData: Omit<Coupon, 'id' | 'postDate'>): Promise<Coupon> {
  const newCoupon: Coupon = {
    id: uuidv4(),
    postDate: new Date().toISOString(),
    ...couponData,
  };
  dbCoupons.push(newCoupon);
  return newCoupon;
}

export async function getCouponById(id: string): Promise<Coupon | null> {
  return dbCoupons.find(coupon => coupon.id === id) || null;
}

export async function getAllCoupons(): Promise<Coupon[]> {
  return [...dbCoupons];
}

export async function getCouponsBySeller(sellerId: string): Promise<Coupon[]> {
  return dbCoupons.filter(coupon => coupon.seller.id === sellerId);
}

export async function searchCoupons(query: string, category?: string): Promise<Coupon[]> {
  let filteredCoupons = [...dbCoupons];
  
  if (query) {
    const searchTerm = query.toLowerCase();
    filteredCoupons = filteredCoupons.filter(coupon => 
      coupon.title.toLowerCase().includes(searchTerm) ||
      coupon.description.toLowerCase().includes(searchTerm) ||
      coupon.category.toLowerCase().includes(searchTerm)
    );
  }
  
  if (category && category !== 'all') {
    filteredCoupons = filteredCoupons.filter(coupon => 
      coupon.category.toLowerCase().replace(' & ', '-').replace(' ', '-') === category
    );
  }
  
  return filteredCoupons;
}

export async function updateCoupon(id: string, updates: Partial<Coupon>): Promise<Coupon | null> {
  const index = dbCoupons.findIndex(coupon => coupon.id === id);
  if (index === -1) return null;
  
  dbCoupons[index] = { ...dbCoupons[index], ...updates };
  return dbCoupons[index];
}

export async function deleteCoupon(id: string): Promise<boolean> {
  const index = dbCoupons.findIndex(coupon => coupon.id === id);
  if (index === -1) return false;
  
  dbCoupons.splice(index, 1);
  return true;
}

// Chat operations
export async function createChat(chatData: Omit<Chat, 'id' | 'messages'>): Promise<Chat> {
  const newChat: Chat = {
    id: uuidv4(),
    messages: [],
    ...chatData,
  };
  dbChats.push(newChat);
  return newChat;
}

export async function getChatById(id: string): Promise<Chat | null> {
  return dbChats.find(chat => chat.id === id) || null;
}

export async function getChatsByUser(userId: string): Promise<Chat[]> {
  return dbChats.filter(chat => 
    chat.buyer.id === userId || chat.seller.id === userId
  );
}

export async function addMessageToChat(chatId: string, message: Omit<Message, 'id' | 'timestamp'>): Promise<Message | null> {
  const chat = dbChats.find(c => c.id === chatId);
  if (!chat) return null;
  
  const newMessage: Message = {
    id: uuidv4(),
    timestamp: new Date().toISOString(),
    ...message,
  };
  
  chat.messages.push(newMessage);
  return newMessage;
}

// Initialize database on import
initializeDatabase();
