"use client";
import AuthGuardOrganizer from "@/hoc/AuthGuardOrganizer";
import {
  BadgeDollarSign,
  BarChart2,
  Calendar,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const EventDashboard = () => {
  const router = useRouter();
  return (
    <div className="mb-14 grid h-screen grid-cols-4">
      <div className="col-span-1 flex items-center justify-center bg-white">
        <div className="h-[700px] w-80 rounded-3xl bg-slate-800">
          <div className="flex flex-col justify-start gap-12 pl-20 pt-36 text-xl text-white">
            <h4 className="flex gap-2">
              <LayoutDashboard size={20} strokeWidth={1.5} />
              Dashboard
            </h4>
            <h4 className="flex gap-2 cursor-pointer" onClick={() => router.push('/dashboard/events')}>
              <Calendar />
              Event
            </h4>
            <h4 className="flex gap-2">
              <Users />
              Attendant
            </h4>
            <h4 className="flex gap-2">
              <BadgeDollarSign />
              Transaction
            </h4>
            <h4 className="flex gap-2">
              <BarChart2 />
              Statistic
            </h4>
          </div>
        </div>
      </div>
      <div className="col-span-3 bg-white">
        <div className="mr-5 mt-5 flex  h-20 w-auto items-center rounded-2xl bg-slate-300 pl-5 text-red-600 justify-between">
          <div className="text-4xl font-bold">Overview</div>
          <div className="flex">
            <div className="m-5 grid h-10 w-72 grid-cols-3 items-center justify-center rounded-full bg-red-600 text-center text-base font-medium text-white">
              <div className="flex h-10 cursor-pointer items-center justify-center rounded-2xl hover:bg-black">
                Day
              </div>
              <div className="flex h-10 cursor-pointer items-center justify-center rounded-2xl hover:bg-black">
                Month
              </div>
              <div className="flex h-10 cursor-pointer items-center justify-center rounded-2xl hover:bg-black">
                Year
              </div>
            </div>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  );
};

export default AuthGuardOrganizer(EventDashboard);
