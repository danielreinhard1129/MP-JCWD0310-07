"use client";

import AuthGuardUser from "@/hoc/AuthGuard";
import SidebarProfile from "../../components/SidebarProfile";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

const Order = () => {
  return (
    <div className="grid grid-cols-4 bg-slate-300">
      <SidebarProfile />
      <div className="col-span-3 ">
        <div className="flex h-screen flex-col justify-start">
          <div className="ml-28 mr-10 mt-3 flex h-[40px] items-center justify-start rounded-full bg-red-500 pl-10 text-2xl font-bold text-white">
            Your Order
          </div>
          <div className="ml-48 mr-28 mt-[27px] flex h-[69vh] w-[750px] justify-center rounded-xl bg-white px-5 text-black">
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
    </div>
  );
};
export default AuthGuardUser(Order);
