'use client'
import { BadgeDollarSign, BarChart2, Calendar, CircleUserRound, Home, Users } from "lucide-react";
import AuthGuardOrganizer from "@/hoc/AuthGuardOrganizer"

const EventDashboard = () => {
  return (
  <div className="grid grid-cols-4 h-screen mb-14">
    <div className="col-span-1 bg-red-600">
        <div className="text-white flex flex-col justify-start text-xl pl-24 pt-24 gap-7">
           <div className="h-56 w-36 items-center text-center flex flex-col">
           <CircleUserRound size={125}/>
           <h4 className="mt-2">email</h4>
           <h4>role</h4>
           </div>
            <h4 className="flex gap-2"><Home/>Home</h4>
            <h4 className="flex gap-2"><Calendar />Events</h4>
            <h4 className="flex gap-2"><Users />Attendants</h4>
            <h4 className="flex gap-2"><BadgeDollarSign />Transactions</h4>
            <h4 className="flex gap-2"><BarChart2 />Statistics</h4>
        </div>
    </div>
    <div className="col-span-3 bg-slate-500 flex justify-between">
        <div className="m-5 text-6xl font-bold text-white">Dashboard</div>
        <div className="h-10 w-64 bg-slate-400 rounded-full m-5 text-center items-center flex justify-center text-base font-medium">05.05.2024 --&gt; 06.06.2024</div>
        <div className="h-10 w-72 bg-slate-400 rounded-full m-5 grid grid-cols-3 items-center justify-center text-center text-base font-medium">
          <div className="h-10 items-center flex justify-center rounded-2xl hover:bg-red-500 cursor-pointer">Day</div>
          <div className="h-10 items-center flex justify-center rounded-2xl hover:bg-red-500 cursor-pointer">Month</div>
          <div className="h-10 items-center flex justify-center rounded-2xl hover:bg-red-500 cursor-pointer">Year</div>
        </div>
    </div>
  </div>
);
};

export default AuthGuardOrganizer(EventDashboard);
