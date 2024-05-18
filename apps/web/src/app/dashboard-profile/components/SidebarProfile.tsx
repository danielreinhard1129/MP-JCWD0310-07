"use client";

import AuthGuardUser from "@/hoc/AuthGuard";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getTotalPoints } from "@/utils/point";
import { ListOrdered, SquareUser, Tag, Ticket } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SidebarProfile = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { id, fullName, email, referralCode, role, points } = useAppSelector(
    (state) => state.user,
  );

  const user = useAppSelector((state) => state.user);
  const totalPoints = getTotalPoints(user);

  return (
    <div className="col-span-1 h-screen">
      <div className="ml-8 flex h-screen w-full justify-center bg-slate-300 text-black">
        <div className="relative ml-3 h-full w-full bg-slate-300 text-black">
          <div className="absolute left-4 top-40 flex h-[120px] w-[120px] items-center justify-center rounded-full bg-white">
            <div className="h-[100px] w-[100px] rounded-full bg-green-400">
              <div className="relative h-full w-full rounded-full">
                <Image
                  src="/user.jpg"
                  alt="user photo"
                  fill
                  className="h-full w-full rounded-full"
                />
              </div>
            </div>
          </div>
          <div className="mt-20 flex h-[130px] w-full justify-end rounded-t-xl bg-black pr-3 pt-3">
            <div className="flex h-[30px] w-[120px] items-center justify-center rounded-2xl bg-red-700 text-sm text-yellow-300 font-semibold">
              {totalPoints} points
            </div>
          </div>
          <div className="flex h-[400px] w-full flex-col rounded-b-xl bg-white">
            <div className="mb-8 mt-8 flex flex-col items-center pl-28">
              <p className="text-xl font-semibold">{fullName}</p>
              <p className="text-base font-medium text-red-600">
                {referralCode}
              </p>
              <p className="italic">{role}</p>
            </div>
            <hr />
            <div className="flex flex-col gap-6 pt-11">
              <p
                className="ml-10 flex cursor-pointer gap-2"
                onClick={() => router.push("/dashboard-profile/order")}
              >
                <ListOrdered />
                Orders
              </p>
              <p
                className="ml-10 flex gap-2 cursor-pointer"
                onClick={() => router.push("/dashboard-profile/profile")}
              >
                <SquareUser />
                Profile
              </p>
              <p
                className="ml-10 flex gap-2 cursor-pointer"
                onClick={() => router.push("/dashboard-profile/mytickets")}
              >
                <Tag />
                My Tickets
              </p>
              <p className="ml-10 flex gap-2 cursor-pointer" onClick={() => router.push('/dashboard-profile/vouchers')}>
                <Ticket />
                Vouchers
              </p>
            </div>
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
export default AuthGuardUser(SidebarProfile);
