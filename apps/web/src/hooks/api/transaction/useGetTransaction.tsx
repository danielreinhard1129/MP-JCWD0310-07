"use client";

import { axiosInstance } from "@/lib/axios";
import { Transaction } from "@/types/transaction.type";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

const useGetTransaction = (id: number) => {
  const [data, setData] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getTransaction = async () => {
      try {
        const { data } = await axiosInstance.get<Transaction>(
          `/transactions/${id}`,
        );
        setData(data);
      } catch (error) {
        if (error instanceof AxiosError) {
          console.log(error)
        }
      } finally {
        setLoading(false);
      }
    };

    getTransaction();
  }, [id]);

  return { data, setLoading };
};

export default useGetTransaction;
