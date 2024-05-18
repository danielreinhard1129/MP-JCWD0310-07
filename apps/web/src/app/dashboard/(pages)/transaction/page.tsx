"use client";

import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logoutAction } from "@/redux/slices/userSlice";
import { LogOut } from "lucide-react";

const Transactions = () => {
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
      <Sidebar />
      <div className="col-span-3 bg-white">
        <div className="mr-5 mt-5 flex h-20 w-auto items-center justify-between rounded-2xl bg-slate-300 pl-5 text-red-600">
          <div className="text-4xl font-bold">Transactions</div>
        </div>
        <div className="lex justify-center mx-auto">
          <table className="justify-center flex mt-5">
            <thead className="flex w-screen border-slate-200 border-b-2 border-t-2 justify-between mr-10 ml-5">
              <th className="ml-4">No</th>
              <th>Title</th>
              <th></th>
              <th>Image</th>
              <th className="mr-4">Approve</th>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Transactions;
