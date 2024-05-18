"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useRegisterOrganizer from "@/hooks/api/auth/useRegisterOrganizer";
import { useFormik } from "formik";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { validationSchema } from "./validationSchema";

const RegisterOrganizer = () => {
  const { registerOrganizer } = useRegisterOrganizer();
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      referralCode: "",
      role: "organizer",
    },
    validationSchema,
    onSubmit: async (values) => {
      registerOrganizer(values);
    },
  });

  return (
    <div className="relative flex min-h-screen md:items-center justify-center bg-slate-100 p-4 sm:p-0">
      <div className="mx-auto grid h-full w-full max-w-4xl grid-cols-1 sm:grid-cols-3 sm:h-[600px] sm:w-[900px]">
        <div className="col-span-1 bg-black p-4 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none sm:p-0 border border-r-slate-600">
          <div className="h-[30px] w-[30px]">
            <div
              className="relative ml-2 h-full w-full cursor-pointer rounded-full bg-white mt-2"
              onClick={() => router.push("/register")}
            >
              <Image
                src="/back.png"
                alt="back"
                fill
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="mt-10 sm:mt-36 flex flex-col items-center justify-center gap-5">
            <p className="text-2xl font-extrabold text-red-500">WELCOME!</p>
            <p className="mx-5 text-center font-semibold text-white">
              To create your event please register first as
              <span className="text-red-500">organizer</span> with your
              personal info
            </p>
            <p className="mx-5 text-center text-sm font-light text-white">
              Lets promote your event and spread happiness.
              <span className="font-bold">Good Luck! :)</span>
            </p>
          </div>
        </div>
        <div className="relative col-span-1 sm:col-span-2 bg-black rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none border border-l-slate-600">
          <Image src="/bg-create.jpg" alt="background" fill className="w-full h-full opacity-50 rounded-b-xl sm:rounded-r-xl" />
          <main className="container mx-auto h-full sm:h-[40vh] px-4 absolute">
            <div className="mt-10 sm:mt-28 flex justify-center">
              <Card>
                <CardHeader>
                  <CardTitle className="text-primary text-center text-2xl">
                    Create Your Organizer Account
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={formik.handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                      <FormInput
                        name="fullName"
                        type="text"
                        label="Full Name"
                        placeholder="Full Name"
                        value={formik.values.fullName}
                        error={formik.errors.fullName}
                        isError={
                          !!formik.touched.fullName && !!formik.errors.fullName
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <FormInput
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Email"
                        value={formik.values.email}
                        error={formik.errors.email}
                        isError={
                          !!formik.touched.email && !!formik.errors.email
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <FormInput
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Password"
                        value={formik.values.password}
                        error={formik.errors.password}
                        isError={
                          !!formik.touched.password && !!formik.errors.password
                        }
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="mt-6 w-full hover:bg-blue-500"
                    >
                      Register as organizer
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RegisterOrganizer;
