"use client";

import AuthGuardUser from "@/hoc/AuthGuard";
import { ListOrdered, SquareUser, Tag, Ticket } from "lucide-react";
import SidebarProfile from "./components/SidebarProfile";

const Profile = () => {
  return (
    <div className="grid grid-cols-4 bg-slate-300">
      <SidebarProfile/>
      <div className="col-span-3">
      </div>
    </div>
  );
};
export default AuthGuardUser(Profile);
