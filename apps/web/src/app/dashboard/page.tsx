"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import AuthGuardOrganizer from "@/hoc/AuthGuardOrganizer";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlice";
import {
  BadgeDollarSign,
  BarChart2,
  Calendar,
  LayoutDashboard,
  LogOut,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const EventDashboard = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id, email, referralCode, role, points } = useAppSelector(
    (state) => state.user,
  );

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logoutAction());
    router.push("/");
  };
  return (
    <div className="mb-14 grid h-screen grid-cols-4">
      <div className="col-span-1 flex items-center justify-center bg-white">
        <div className="h-[700px] w-80 rounded-3xl bg-slate-700 -mt-10">
          <div className="flex flex-col justify-start gap-12 pl-20 pt-32 text-xl text-white mb-14">
            <h4 className="flex gap-2 cursor-pointer" onClick={() => router.push('/dashboard')}>
              <LayoutDashboard size={20} strokeWidth={1.5} />
              Dashboard
            </h4>
            <h4 className="flex gap-2 cursor-pointer" onClick={() => router.push('/dashboard/event')}>
              <Calendar />
              Events
            </h4>
            <h4 className="flex gap-2">
              <Users />
              Attendants
            </h4>
            <h4 className="flex gap-2 cursor-pointer" onClick={() => router.push('/dashboard/transaction')}>
              <BadgeDollarSign />
              Transactions
            </h4>
            <h4 className="flex gap-2 cursor-pointer" onClick={() => router.push('/dashboard/statistic')}>
              <BarChart2 />
              Statistics
            </h4>
          </div>
        </div>
      </div>
      <div className="col-span-3 bg-white">
        <div className="mr-5 mt-5 flex  h-20 w-auto items-center rounded-2xl bg-slate-300 pl-5 text-red-600 justify-between">
          <div className="text-4xl font-bold">Overview</div>
          <div className="flex">
            <div className="m-5 grid h-10 w-72 grid-cols-3 items-center justify-center rounded-full bg-slate-700 text-center text-base font-medium text-white">
              <div className="flex h-10 cursor-pointer items-center justify-center rounded-2xl hover:bg-red-600">
                Day
              </div>
              <div className="flex h-10 cursor-pointer items-center justify-center rounded-2xl hover:bg-red-600">
                Month
              </div>
              <div className="flex h-10 cursor-pointer items-center justify-center rounded-2xl hover:bg-red-600">
                Year
              </div>
            </div>
          </div>
    
        </div>
      </div>
    </div>
  );
};

export default AuthGuardOrganizer(EventDashboard);
