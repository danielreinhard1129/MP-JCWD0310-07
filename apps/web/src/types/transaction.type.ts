import { User } from "./user.type";

export interface Transaction {
    id: number;
    amount: number;
    total: number;
    status: string;
    eventId: number;
    userId: number;
    paymentProof: string;
    userVoucherId?: number | null;

    event: Event
    user: User
}

export interface IFormTransaction {
    total: number;
    amount: number;
    status: string;
    referralCode: string;
    userId?: number;
    eventId?: number
    transactionId?: number;
    paymentProof: File[]
    userVoucherId?: number | null
}