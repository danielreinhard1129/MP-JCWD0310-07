"use client";

import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";

const Events = () => {
  const router = useRouter();
  return (
    <div className="mb-14 grid h-screen grid-cols-4">
      <Sidebar />
      <div className="col-span-3 bg-white">
        <div className="mr-5 mt-5 flex h-20 w-auto items-center justify-between rounded-2xl bg-slate-300 pl-5 text-red-600">
          <div className="text-4xl font-bold">List of Events</div>
          <div className="flex">
            <div className="m-5 h-10 w-40 items-center justify-center rounded-full bg-slate-800 text-center text-base font-medium text-white">
              <div
                className="flex h-10 cursor-pointer items-center justify-center rounded-2xl hover:bg-red-600 "
                onClick={() => router.push("/create-event")}
              >
                Create Event
              </div>
            </div>
          </div>
        </div>
        <div>
        <table>
          <thead>
            <tr className="flex gap-5">
                <th>No</th>
                <th>Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
          </thead>
        </table>
      </div>
      </div>
    </div>
  );
};

export default Events;
