"use client";

import AuthGuardUser from "@/hoc/AuthGuard";
import SidebarProfile from "../../components/SidebarProfile";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";
import { getTotalPoints } from "@/utils/point";
import { format } from "date-fns";

const Vouchers = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const {
    id,
    fullName,
    email,
    referralCode,
    role,
    points,
    createdAt,
    rewards,
  } = useAppSelector((state) => state.user);
  console.log(rewards);

  const user = useAppSelector((state) => state.user);
  const totalPoints = getTotalPoints(user);
  const rewardsUser = rewards[0]?.rewards;
  console.log(rewardsUser);
  return (
    <div className="grid grid-cols-4 bg-slate-300">
      <SidebarProfile />
      <div className="col-span-3">
        <div className="flex h-screen flex-col justify-start">
          <div className="ml-28 mr-10 mt-3 flex h-[40px] items-center justify-start rounded-full bg-red-500 pl-10 text-2xl font-bold text-white">
            Your Vouchers
          </div>
          {Boolean(rewardsUser) ? (
          <div className="relative ml-48 mr-28 mt-[27px] flex h-[69vh] w-[750px] justify-center rounded-xl bg-white px-5">
            <div className={`${!rewardsUser  ? "hidden" : ""} relative h-[150px] w-[350px] rounded-3xl bg-slate-200 mt-5`}>
              <div className="absolute left-0 flex flex-col h-[150px] w-[200px] items-center justify-center rounded-l-3xl bg-slate-200">
                <p className="text-black text-2xl font-extralight">DISCOUNT</p>
                <p className="text-red-600 text-4xl font-extrabold">COUPON</p>
                <p className="text-xs font-bold">VALID UNTIL: {format(new Date(rewards[0].expiredDate), "dd MMMM yyyy")}</p>
              </div>
              <div className="absolute right-0 flex h-[150px] w-[150px] items-center justify-center rounded-r-3xl bg-red-600">
                <p className="text-6xl font-extrabold text-white">{rewardsUser}%</p>
              </div>
            </div>
          </div>
          ) : (
            <div className="relative ml-48 mr-28 mt-[27px] flex h-[69vh] w-[750px] justify-center rounded-xl bg-white px-5">
           <h1 className="mt-5 text-black text-2xl font-extralight"> No Discount Coupon </h1>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AuthGuardUser(Vouchers);
