"use client";

import AutoComplete from "@/components/AutoComplete";
import EventList from "@/components/EventList";
import Pagination from "@/components/Pagination";
import useGetEvents from "@/hooks/api/admin/useGetEvents";
import { useState } from "react";
import SkeletonCategoryDetail from "../components/SkeletonCategoryDetail";
import { CATEGORY_BACKGROUND } from "../../../../constant";
import { Separator } from "@/components/ui/separator";

const Page = ({ params }: { params: { category: string } }) => {
  const category = params.category;
  const [page, setPage] = useState<number>(1);

  const {
    data: events,
    meta,
    isLoading,
  } = useGetEvents({
    page: 1,
    take: 10,
    category: category,
  });

  const handleChangePaginate = ({ selected }: { selected: number }) => {
    setPage(selected + 1);
  };

  if (isLoading)
    return (
      <div>
        <SkeletonCategoryDetail />
      </div>
    );

  const backgroundImage = CATEGORY_BACKGROUND.find(
    (bg) => bg.title.toLowerCase() === category.toLowerCase(),
  )?.url;

  return (
    <main className="">
      {/* Jumbotron */}
      <section
        className="py-40 md:py-72"
        style={{
          backgroundImage: `url('${backgroundImage}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bold-40 ml-5 flex flex-col justify-start text-base xl:max-w-[400px]">
          <h1 className="text-white">Find your favorite events here</h1>
          <p className="mt-4 font-sans text-2xl font-bold text-white">
            Alright, here we go! click your favorite event
          </p>
          <Separator className="mt-5" />
        </div>
      </section>

      <div className="padding-container max-container">
        <div className="mt-10">
          <AutoComplete />
        </div>

        <h1 className="mb-4 mt-12 text-2xl font-bold">Event List</h1>
        {/* Event List */}
        <div className="grid gap-4">
          {events.map((event, index) => (
            // eslint-disable-next-line react/jsx-key
            <div className="rounded-md border" style={{ maxWidth: "700px" }}>
              <EventList
                key={index}
                title={event.title}
                location={event.location}
                startEvent={event.startEvent}
                endEvent={event.endEvent}
                eventId={event.id}
  
              />
            </div>
          ))}

          <div className="my-8 flex justify-center">
            <Pagination
              total={meta?.total || 0}
              take={meta?.take || 0}
              onChangePage={handleChangePaginate}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
