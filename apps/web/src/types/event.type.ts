import { User } from "./user.type";

export interface Event {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
  book: number;
  price: number;
  thumbnail: string;
  userId: number;
  startEvent: Date;
  endEvent: Date;
  role: string
  stock: number;
  isFree: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  user: User;
}

export interface IFormCreatedEvent {
  title: string;
  category: string;
  price: string;
  stock: string;
  isFree: boolean;
  startEvent: string;
  endEvent: string;
  location: string;
  description: string;
  thumbnail: File[];
  userId?: number;
}

export interface ListEvent {
  id: number;
  title: string;
  location: string;
  price: number;
  stock: number;
  description: string;
  startEvent: string; // Ensure this matches the backend field name
  endEvent: string; // Ensure this matches the backend field name
  thumbnail: string;
}

