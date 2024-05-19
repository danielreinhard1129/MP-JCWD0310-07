"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import ChartByMonth from "./components/ChartByMonth";
import ChartByYear from "./components/ChartByYear";

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
        <div className="flex  items-center justify-center">
          <div className="-mt-10 h-[700px] w-80 rounded-3xl bg-slate-700">
            <div className="mb-14 flex flex-col justify-start gap-12 pl-20 pt-60 text-xl text-white">
              <h4
                className="flex cursor-pointer gap-2"
                onClick={() => router.push("/dashboard")}
              >
                <LayoutDashboard size={20} strokeWidth={1.5} />
                Dashboard
              </h4>
              <h4
                className="flex cursor-pointer gap-2"
                onClick={() => router.push("/dashboard/event")}
              >
                <Calendar />
                Events
              </h4>
              <h4
                className="flex cursor-pointer gap-2"
                onClick={() => router.push("/dashboard/transaction")}
              >
                <BadgeDollarSign />
                Transactions
              </h4>
            </div>
          </div>
        </div>
      </div>
      <div className="col-span-3 bg-white">
        <div className="mr-5 mt-5 flex  h-20 w-auto items-center justify-between rounded-2xl bg-slate-300 pl-5 text-red-600">
          <div className="text-4xl font-bold">Overview</div>
        </div>
        <div>
          <ChartByMonth />
        </div>
      </div>
    </div>
  );
};

export default AuthGuardOrganizer(EventDashboard);
