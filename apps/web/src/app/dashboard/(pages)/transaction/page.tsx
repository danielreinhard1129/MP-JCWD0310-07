"use client";

import { notFound, useRouter } from "next/navigation";
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
import useGetTransactionsByOrganizer from "@/hooks/api/tx/useTransactions";
import AuthGuardOrganizer from "@/hoc/AuthGuardOrganizer";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Transactions = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { id, email, referralCode, role, points } = useAppSelector(
    (state) => state.user,
  );

  // const { data: transactions } = useGetTransactionsByOrganizer();

  // if(!id) {
  //   return notFound()
  // }
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
        <div className="flex ml-4 mr-10 mt-7 justify-center">
        <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">No</TableHead>
                  <TableHead>Event</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">1</TableCell>
                  <TableCell>Vincent Show</TableCell>
                  <TableCell>200000</TableCell>
                  <TableCell>5</TableCell>
                  <TableCell>1000000</TableCell>
                  <TableCell className="text-right">paid</TableCell>
                </TableRow>
              </TableBody>
            </Table>
        </div>
      </div>
    </div>
  );
};

export default AuthGuardOrganizer(Transactions);
