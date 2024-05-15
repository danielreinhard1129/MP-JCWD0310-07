"use client";

import { useToast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/lib/axios";
import { Event, IFormCreatedEvent } from "@/types/event.type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { FileWithPath } from "react-dropzone";

const useCreateEvent = () => {
  const router = useRouter();
  const { toast } = useToast();
  const createEvent = async (payload: IFormCreatedEvent) => {
    try {
      const {
        title,
        category,
        price,
        stock,
        startEvent,
        endEvent,
        description,
        thumbnail,
        location,
        userId,
      } = payload;

      const createEventForm = new FormData();

      createEventForm.append("title", title);
      createEventForm.append("category", category);
      createEventForm.append("price", String(price));
      createEventForm.append("stock", String(stock));
      createEventForm.append("startEvent", startEvent.toString());
      createEventForm.append("endEvent", endEvent.toString());
      createEventForm.append("location", location);
      createEventForm.append("description", description);
      createEventForm.append("userId", String(userId));

      thumbnail.forEach((file: FileWithPath) => {
        createEventForm.append("thumbnail", file);
      });

      await axiosInstance.post<Event>("/events", createEventForm);

      toast({
        title: "Event Created",
        description: "Your event has been created successfully.",
      });

      router.push("/");
    } catch (error) {
      if (error instanceof AxiosError) { 
        toast({
          title: "Error",
          description: "Event already in use",
          duration: 5000, 
        });
      }
    }
  };

  return { createEvent };
};

export default useCreateEvent;
