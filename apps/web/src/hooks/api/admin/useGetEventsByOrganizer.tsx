"use client";

import { axiosInstance } from "@/lib/axios";
import { Event } from "@/types/event.type";
import { IPaginationMeta, IPaginationQueries } from "@/types/pagination.type";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";

interface IGetEventsQueries extends IPaginationQueries {
    id: number;
  }

const useGetEventsByOrganizer = (queries: IGetEventsQueries) => {
  const [data, setData] = useState<Event[]>([]);
  const [meta, setMeta] = useState<IPaginationMeta | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getEvents = async () => {
    try {
      const { data } = await axiosInstance.get(`/events/dashboard/event`, {
        params: queries,
    });

      setData(data.data);
      setMeta(data.meta);

    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getEvents();
  }, [queries?.page, queries.id]);

  return { data, isLoading, meta,  refetch: getEvents };
};

export default useGetEventsByOrganizer;
