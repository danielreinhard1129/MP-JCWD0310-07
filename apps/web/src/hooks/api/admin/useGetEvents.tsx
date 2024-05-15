"use client";

import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event.type";
import { IPaginationMeta, IPaginationQueries } from "@/types/pagination.type";
import { useEffect, useState } from "react";

interface IGetEventsQueries extends IPaginationQueries {
  search?: string;
  category?: string
}

const useGetEvents = (queries: IGetEventsQueries) => {
  const [data, setData] = useState<Event[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getEvents = async () => {
    try {
      const { data } = await axiosInstance.get("/events", {
        params: queries,
      });

      setData(data.data);
      setMeta(data.meta);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, [queries?.page, queries?.search, queries?.category]);

  return { data, meta, isLoading };
};

export default useGetEvents;
