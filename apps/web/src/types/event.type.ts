import { User } from "./user.type";

export interface Event {
  id: number;
  title: string;
  category: string;
  location: string;
  description: string;
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
