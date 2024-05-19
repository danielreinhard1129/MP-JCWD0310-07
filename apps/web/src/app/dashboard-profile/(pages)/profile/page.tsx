"use client";

import AuthGuardUser from "@/hoc/AuthGuard";
import SidebarProfile from "../../components/SidebarProfile";
import { format } from "date-fns";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { getTotalPoints } from "@/utils/point";
import { useRouter } from "next/navigation";

const Profile = () => {
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
  return (
    <div className="grid grid-cols-4 bg-slate-300">
      <SidebarProfile />
      <div className="col-span-3 h-screen">
        <div className="flex h-screen flex-col justify-start">
          <div className="ml-28 mr-10 mt-3 flex h-[40px] items-center justify-start rounded-full bg-red-500 pl-10 text-2xl font-bold text-white">
            Your Profile
          </div>
          <div className="ml-48 mr-28 mt-[70px] flex h-[60vh] flex-col rounded-xl bg-white pl-10">
            <p className="mt-28 text-3xl font-medium text-black">
              HELLOOO{" "}
              <span className="font-extrabold text-red-600">{fullName}</span>{" "}
              WELCOME :){" "}
            </p>
            <p className="mt-1">
              Your account was created at{" "}
              <span className="text-blue-600">
                {format(new Date(createdAt), "dd MMMM yyyy")}
              </span>
              .
            </p>
            {totalPoints != 0 && (
              <p className="mr-10 mt-8 text-balance">
                Because some people use your referral code :{" "}
                <span className="text-base font-medium text-red-600">
                  {referralCode}
                </span>
                , you get{" "}
                <span className="text-base font-medium text-red-600">
                  {totalPoints}
                </span>{" "}
                points. The points can be redeemed in your transactions and{" "}
                <span className="text-base font-medium text-red-600">
                  be aware
                </span>{" "}
                your points would be expired at{" "}
                <span className="text-red-600">
                  {format(new Date(points[0].expiredAt), "dd MMMM yyyy")}
                </span>
                .
                <p className={`${!rewardsUser ? "hidden" : ""} mt-6`}>
                  {" "}
                  <span className="text-base font-medium text-red-600">
                    Congratulation!
                  </span>{" "}
                  you got{" "}
                  <span className="text-base font-medium text-red-600">
                    {rewardsUser}%
                  </span>{" "}
                  discount, because you register with someone&apos;s referral
                  code.
                </p>
              </p>
            )}
            {totalPoints == 0 && (
              <p className="mr-10 mt-8 text-balance">
                <span className="text-base font-medium text-red-600">
                  Be patient!
                </span>{" "}
                some people will use your referral code :{" "}
                <span className="text-base font-medium text-red-600">
                  {referralCode}
                </span>{" "}
                and you will get{" "}
                <span className="text-base font-medium text-red-600">
                  10000
                </span>{" "}
                points every user use your referral code. The points can be
                redeemed in your transactions.
                <p className={`${!rewardsUser ? "hidden" : ""} mt-8`}>
                  {" "}
                  <span className="text-base font-medium text-green-600">
                    Congratulation!
                  </span>{" "}
                  you got{" "}
                  <span className="text-base font-medium text-red-600">
                    {rewardsUser}%
                  </span>{" "}
                  discount, because you register with someone&apos;s referral
                  code.
                </p>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AuthGuardUser(Profile);
