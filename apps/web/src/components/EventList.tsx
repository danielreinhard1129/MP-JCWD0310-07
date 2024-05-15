import { format } from "date-fns";
import Link from "next/link";
import { FC } from "react";

interface EventListProps {
  title: string;
  // description: string;
  location: string;
  startEvent: Date;
  endEvent: Date;
  eventId: number;
}

const EventList: FC<EventListProps> = ({
  title,
  // description,
  location,
  startEvent,
  endEvent,
  eventId,
}) => {

  return (
    <>
      <main className="p-4">
        <section>
          {/* Event */}
          <Link href={`/${eventId}`}>
            <div className="flex flex-col gap-2">
              <p className="transition duration-300 hover:cursor-pointer hover:font-bold hover:text-blue-600">
                {title}
              </p>
              {/* <p className="transition duration-300">{description}</p> */}
              <div className="flex flex-row gap-2">
              <span> in </span>
              <p className="text-underline">{location}</p>
              </div>
            </div>

            <div className="flex flex-row">
              <p className="text-base font-bold">
                {format(new Date(startEvent), "dd MMMM")}
              </p>
              <span> - </span>
              <p className="text-base font-bold">
                {format(new Date(endEvent), "dd MMMM")}
              </p>
            </div>
          </Link>
        </section>
      </main>
    </>
  );
};

export default EventList;
