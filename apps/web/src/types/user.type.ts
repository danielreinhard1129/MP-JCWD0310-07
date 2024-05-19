import { number } from 'yup';
export interface User {
    id: number;
    fullName: string;
    email: string;
    password: string
    reff?: string
    referralCode: string
    role: string
    createdAt: string
    points: {
      total :number;
      expiredAt:string;
    }[]
    rewards: {
      rewards:number;
      expiredDate:string;
    }[]
  }
  
