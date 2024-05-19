"use client";

import useGetEvent from "@/hooks/api/admin/useGetEvent";
import { appConfig } from "@/utils/config";
import { format } from "date-fns";
import Image from "next/image";
import TransactionCard from "./components/TransactionCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const Page = ({ params }: { params: { id: string } }) => {
  const { event, isLoading } = useGetEvent(Number(params.id));

  if (isLoading)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (!event) {
    return <div className="container mx-auto px-4">Event not found</div>;
  }

  const startEvent = new Date(event.startEvent);
  const endEvent = new Date(event.endEvent);
  const price = Number(event.price);
  const eventName = event.title;
  const eventStock = event.stock;

  return (
    <section
      className="padding-container max-container p-6 md:p-12"
      style={{
        backgroundColor: 'black',
        backgroundSize: "cover",
        backgroundPosition: "top",
        backgroundRepeat: "no-repeat",
        height: "250px",
        marginBottom: "900px",
      }}
    >
      <div>
        <p className="text-4xl font-semibold text-red-400">
          Book your ticket now!
        </p>
      </div>
      <div className="flex flex-col items-start justify-between p-6 md:flex-row md:items-center md:p-12">
        {/* Event */}
        <div className="w-full md:w-1/2">
          <div className="relative h-64 overflow-hidden rounded-lg shadow-md md:h-80">
            <Image
              fill
              src={`${appConfig.baseUrl}/assets${event.thumbnail}`}
              alt="Event thumbnail"
              className="object-cover"
            />
          </div>

          <div className="mt-6">
            <h2 className="text-2xl font-bold text-gray-800">{eventName}</h2>
            <p className="mt-2 text-lg text-gray-600">
              {format(startEvent, "dd MMMM yyyy")} -{" "}
              {format(endEvent, "dd MMMM yyyy")}
            </p>
            <p className="mt-2 text-lg text-gray-600">
              Start: {format(startEvent, "HH:mm")}
            </p>
          </div>
        </div>

        {/* Transaction */}
        <div className="mt-6 w-full md:ml-10 md:mt-0 md:w-1/2">
          <TransactionCard
            pricePerTicket={price}
            eventStock={eventStock}
            eventId={event.id}
            paramsId={params.id}
          />
        </div>
      </div>
    </section>
  );
};

export default Page;
