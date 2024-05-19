"use client";

import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { useAppSelector } from "@/redux/hooks";
import useGetEventsByOrganizer from "@/hooks/api/admin/useGetEventsByOrganizer";
import { appConfig } from "@/utils/config";
import CardEvent from "@/components/CardEvent";
import AuthGuardOrganizer from "@/hoc/AuthGuardOrganizer";
import Pagination from "@/components/Pagination";
import { useState } from "react";
import { CirclePlus } from "lucide-react";

const Events = () => {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);
  const { id } = useAppSelector((state) => state.user);
  const { data: data, meta } = useGetEventsByOrganizer({
    id,
    page,
    take: 8,
  });

  console.log(data);
  
  const handleChangePaginate = ({ selected }: { selected: number }) => {     setPage(selected + 1);   };
  

  return (
    <div className="mb-14 grid h-full grid-cols-4 relative">
      <Sidebar />
      <div className="col-span-3 bg-white">
        <div className="mr-5 mt-5 flex h-20 w-auto items-center justify-between rounded-2xl bg-slate-300 pl-5 text-red-600">
          <div className="text-4xl font-bold">List of Events</div>
          <div className="flex">
            <div className="m-5 h-10 w-40 items-center justify-center rounded-full bg-slate-700 text-center text-base font-medium text-white">
              <div
                className="flex h-10 gap-2 cursor-pointer items-center justify-center rounded-2xl hover:bg-red-600"
                onClick={() => router.push("/create-event")}
              >
                Create Event
                <CirclePlus />
              </div>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 p-0 py-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-4">
          {data.map((event, index) => (
            <CardEvent
              key={event.id}
              title={event.title}
              startDate={new Date(event.startEvent)}
              endDate={new Date(event.endEvent)}
              location={event.location}
              thumbnail={`${appConfig.baseUrl}/assets${event.thumbnail}`}
              eventId={event.id}
              price={event.price}
            />
          ))}
        </div>
        <Pagination
        total={meta?.total || 0 }
        take={meta?.take || 0}
        onChangePage={handleChangePaginate}
        />
      </div>
    </div>
  );
};

export default AuthGuardOrganizer(Events);
