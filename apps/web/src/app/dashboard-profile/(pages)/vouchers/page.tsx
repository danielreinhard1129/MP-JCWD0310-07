"use client";

import AuthGuardUser from "@/hoc/AuthGuard";
import SidebarProfile from "../../components/SidebarProfile";

const Vouchers = () => {
  return (
    <div className="grid grid-cols-4 bg-slate-300">
      <SidebarProfile/>
      <div className="col-span-3"></div>
    </div>
  );
};
export default AuthGuardUser(Vouchers);
