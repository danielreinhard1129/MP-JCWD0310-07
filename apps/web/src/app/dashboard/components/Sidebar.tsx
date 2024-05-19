"use client";
import AuthGuard from "@/hoc/AuthGuard";
import {
  BadgeDollarSign,
  BarChart2,
  Calendar,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { useRouter } from "next/navigation";

const Sidebar = () => {
  const router = useRouter();
  return (
    <div className="col-span-1 bg-white">
      <div className="flex mt-16 items-center justify-center">
        <div className="-mt-10 h-[700px] w-80 rounded-3xl bg-slate-700">
          <div className="flex flex-col justify-start gap-12 pl-20 pt-44 text-xl text-white">
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
            <h4
              className="flex cursor-pointer gap-2"
              onClick={() => router.push("/dashboard/statistic")}
            >
              <BarChart2 />
              Statistics
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthGuard(Sidebar);
