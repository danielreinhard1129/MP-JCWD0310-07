import React from "react";
import { Button } from "./ui/button";

const BrowseEvents = () => {
  return (
    <>
      <main className="padding-container max-container mt-4 flex flex-col p-4">
        <h1 className="text-xl font-semibold text-slate-500">Browse Events</h1>

        <div className="mt-8 flex flex-row gap-4">
          <Button className="rounded-full border border-black bg-white text-black">
            Change Location
          </Button>
          <Button className="rounded-full border border-black bg-white text-black">
            Filter by Date
          </Button>
        </div>
      </main>
      <hr className="mt-12 w-full border-gray-300" />
    </>
  );
};

export default BrowseEvents;
