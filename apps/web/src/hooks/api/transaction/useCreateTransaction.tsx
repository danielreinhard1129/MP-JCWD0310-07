"use client";

import { axiosInstance } from "@/lib/axios";
import { IFormTransaction, Transaction } from "@/types/transaction.type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useCreateTransaction = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const createTransaction = async (payload: IFormTransaction) => {
    try {
      const response = await axiosInstance.post<Transaction>("/transactions", {
        ...payload,
      });
      const { id, total } = response.data;

      router.push(
        `/${payload.eventId}/transaction/payment?total=${total}&transactionId=${id}`,
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error.response?.data);
      }
    } finally {
      setLoading(false);
    }
  };
  return { createTransaction, isLoading: loading };
};

export default useCreateTransaction;
