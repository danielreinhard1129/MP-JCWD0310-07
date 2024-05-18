"use client";

import { useEffect, useState } from "react";
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
import axios from "axios";
import { Event } from "@/types/event.type"; // Import the Event type

const Events = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [events, setEvents] = useState<Event[]>([]);
  const { id, email, referralCode, role, points } = useAppSelector(
    (state) => state.user,
  );

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(logoutAction());
    router.push("/");
  };

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("Fetching events...");
        const response = await axios.get<Event[]>("/api/events");
        console.log("Fetched events:", response.data);
        if (Array.isArray(response.data)) {
          setEvents(response.data);
        } else {
          console.error("Response data is not an array:", response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios error while fetching events:", error.message);
          console.error("Axios error details:", error.response?.data);
        } else {
          console.error("Unexpected error while fetching events:", error);
        }
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="mb-14 grid h-screen grid-cols-4">
      <Sidebar />
      <div className="col-span-3 bg-white">
        <div className="mr-5 mt-5 flex h-20 w-auto items-center justify-between rounded-2xl bg-slate-300 pl-5 text-red-600">
          <div className="text-4xl font-bold">List of Events</div>
          <div className="flex">
            <div className="m-5 h-10 w-40 items-center justify-center rounded-full bg-slate-700 text-center text-base font-medium text-white">
              <div
                className="flex h-10 cursor-pointer items-center justify-center rounded-2xl hover:bg-red-600"
                onClick={() => router.push("/create-event")}
              >
                Create Event
              </div>
            </div>
          </div>
        </div>
        <div className="mr-5 mt-5 flex h-[600px] items-center justify-center rounded-2xl bg-slate-700">
          <table className="m-2 h-[550px] w-full rounded-2xl bg-slate-300">
            <thead className="w-full">
              <tr className="mx-5 mt-5 flex items-center justify-between gap-5 rounded-md border border-black bg-slate-100 px-2 text-center">
                <th>No</th>
                <th>Title</th>
                <th>Location</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Description</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody className="overscroll-contain">
              {events.length > 0 ? (
                events.map((event, index) => (
                  <tr
                    key={event.id}
                    className="mx-5 mt-5 flex items-center justify-between gap-5 rounded-md border border-black bg-slate-100 px-2 text-center"
                  >
                    <td>{index + 1}</td>
                    <td>{event.title}</td>
                    <td>{event.location}</td>
                    <td>{event.price}</td>
                    <td>{event.stock}</td>
                    <td>{event.description}</td>
                    <td>{new Date(event.startEvent).toLocaleDateString()}</td>
                    <td>{new Date(event.endEvent).toLocaleDateString()}</td>
                    <td></td>
                  </tr>
                ))
              ) : (
                <tr className="mx-5 mt-5 flex items-center justify-between gap-5 rounded-md border border-black bg-slate-100 px-2 text-center">
                  <td colSpan={9}>No events found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Events;
