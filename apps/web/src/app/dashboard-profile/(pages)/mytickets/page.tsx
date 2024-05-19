"use client";

import AuthGuardUser from "@/hoc/AuthGuard";
import SidebarProfile from "../../components/SidebarProfile";

const MyTicket = () => {
  return (
    <div className="grid grid-cols-4 bg-slate-300">
      <SidebarProfile />
      <div className="col-span-3">
        <div className="flex h-screen justify-start">
          <div className="ml-28 mr-10 mt-3 flex h-[40px] w-full items-center justify-start rounded-full bg-red-500 pl-10 text-2xl font-bold text-white">
            Your Ticket
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthGuardUser(MyTicket);
