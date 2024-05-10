"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { useFormik } from "formik";
import { ArrowBigDownDash } from "lucide-react";
import { useState } from "react";
import { EVENT_CATEGORIES } from "../../../constant";
import FormTextArea from "@/components/FormTextArea";

const CreateEvent = () => {
  const [isPaidEvent, setIsPaidEvent] = useState(false);
  const [isClick, setIsClick] = useState(false);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        eventName: "",
        price: "",
        date: "",
        time: "",
        location: "",
        description: "",
        availableSeats: "",
        promotion: "",
      },
      // validationSchema,
      onSubmit: () => {},
    });

  const handleClick = () => {
    setIsClick(!isClick);
  };

  return (
    <>
      <main
        className="padding-container max-container"
        style={{
          backgroundImage: `url('/bg-create.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex justify-center">
          <Card className="relative mb-10 mt-10 px-0 md:px-10 ">
            <CardHeader>
              <CardTitle className="text-primary text-center text-3xl">
                Create Your Event
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <div className="grid w-80 items-center gap-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger
                      className="flex justify-start rounded-md border border-slate-300 px-3 py-2 font-sans text-xs text-zinc-500"
                      style={{ width: "150px" }}
                    >
                      Select Category
                    </DropdownMenuTrigger>

                    <ArrowBigDownDash
                      className="right-98 absolute top-20 ml-28 mt-3 text-xs text-stone-500"
                      onClick={handleClick}
                    />
                    {isClick && (
                      <ul className="rounded-md border border-slate-300">
                        {EVENT_CATEGORIES.map((link, index) => (
                          <li
                            key={index}
                            className="cursor-pointer p-1 hover:bg-slate-50"
                          >
                            {link.title}
                          </li>
                        ))}
                      </ul>
                    )}
                  </DropdownMenu>
                  <FormInput
                    name="eventName"
                    type="text"
                    label="Event Name"
                    placeholder="Event Name"
                    value={values.eventName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.eventName}
                    isError={!!touched.eventName && !!errors.eventName}
                  />
                  {isPaidEvent && (
                    <FormInput
                      name="price"
                      type="number"
                      label="Price (IDR)"
                      placeholder="Price (IDR)"
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={errors.price}
                      isError={!!touched.price && !!errors.price}
                    />
                  )}
                  <FormInput
                    name="date"
                    type="date"
                    label="Date"
                    placeholder="YYYY-MM-DD"
                    value={values.date}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.date}
                    isError={!!touched.date && !!errors.date}
                  />
                  <FormInput
                    name="time"
                    type="time"
                    label="Time"
                    placeholder="HH:MM"
                    value={values.time}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.time}
                    isError={!!touched.time && !!errors.time}
                  />
                  <FormInput
                    name="location"
                    type="text"
                    label="Location"
                    placeholder="Location"
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.location}
                    isError={!!touched.location && !!errors.location}
                  />
                  <FormTextArea
                    name="description"
                    label="Description"
                    placeholder="Description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.description}
                    isError={!!touched.description && !!errors.description}
                  />
                  <FormInput
                    name="availableSeats"
                    type="number"
                    label="Available Seats"
                    placeholder="Available Seats"
                    value={values.availableSeats}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.availableSeats}
                    isError={
                      !!touched.availableSeats && !!errors.availableSeats
                    }
                  />
                  <FormInput
                    name="promotion"
                    type="text"
                    label="Promotion (if any)"
                    placeholder="Promotion details"
                    value={values.promotion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={errors.promotion}
                    isError={!!touched.promotion && !!errors.promotion}
                  />
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="isPaidEvent"
                      checked={isPaidEvent}
                      onChange={() => setIsPaidEvent(!isPaidEvent)}
                      className="form-checkbox text-primary h-5 w-5"
                    />
                    <label htmlFor="isPaidEvent" className="text-primary ml-2">
                      Paid Event
                    </label>
                  </div>
                </div>
                <Button className="mt-6 w-full">Create Event</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <Separator className="mb-36 mt-36" />
    </>
  );
};

export default CreateEvent;
