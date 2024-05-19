"use client";

import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import useRegister from "@/hooks/api/auth/useRegister";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { validationSchema } from "./validationSchema";
import Image from "next/image";

const Register = () => {
  const router = useRouter();

  const { register } = useRegister();
  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
      reff: "",
      rewards: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      register(values);
    },
  });

  return (
    <div className="relative flex min-h-screen justify-center bg-slate-100 p-4 sm:p-0 md:items-center">
      <div className="mx-auto grid h-full w-full max-w-4xl grid-cols-1 sm:h-[600px] sm:w-[900px] sm:grid-cols-3">
        <div className="col-span-1 rounded-t-xl border border-r-red-200 bg-black p-4 sm:rounded-l-xl sm:rounded-tr-none sm:p-0">
          <div className="h-[30px] w-[30px] rounded-full">
            <div
              className="relative ml-2 mt-2 h-full w-full cursor-pointer rounded-full bg-white"
              onClick={() => router.push("/login")}
            >
              <Image
                src="/back.png"
                alt="back"
                fill
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="mt-10 flex flex-col items-center justify-center gap-5 sm:mt-28">
            <p className="text-2xl font-extrabold text-red-500">WELCOME!</p>
            <p className="mx-5 text-center font-semibold text-white">
              To keep connected with us please register first as user with your
              personal info
            </p>
            <p className="mx-5 text-center text-sm font-light text-white">
              But if you want to create your event please register as{" "}
              <span className="font-bold text-red-500">organizer</span>
            </p>
          </div>
          <div className="flex w-full items-center justify-center ">
            <Button
              className="mt-6 w-[175px] rounded-full hover:bg-red-500"
              onClick={() => router.push("/register-organizer")}
            >
              Register as organizer
            </Button>
          </div>
        </div>
        <div className="relative col-span-2 rounded-b-xl border border-l-red-200 bg-black sm:rounded-r-xl sm:rounded-bl-none">
          <Image
            src="/bg-create.jpg"
            alt="background"
            fill
            className="h-full w-full rounded-b-xl opacity-50 sm:rounded-r-xl"
          />
          <main className="container absolute mx-auto h-full px-4 sm:h-[40vh]">
            <div className="mt-10 flex justify-center sm:mt-16">
              <Card className="w-full max-w-[350px]">
                <CardHeader>
                  <CardTitle className="text-primary text-center text-3xl">
                    Create Your Account
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
                      <FormInput
                        name="reff"
                        type="text"
                        label="Referral Code"
                        placeholder="Refferal Code"
                        value={formik.values.reff}
                        error={formik.errors.reff}
                        isError={!!formik.touched.reff && !!formik.errors.reff}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                    </div>
                    <Button
                      type="submit"
                      className="mt-6 w-full hover:bg-blue-500"
                    >
                      Register
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

export default Register;
