"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormik } from "formik";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { validationSchema } from "./validationSchema";
import useLogin from "@/hooks/api/auth/useLogin";
import { useRouter } from "next/navigation";
import Image from "next/image";

const Login = () => {
  const router = useRouter();
  const { login } = useLogin();
  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema,
      onSubmit: async (values) => {
        login(values);
      },
    });

  return (
    <div className="relative flex md:items-center justify-center min-h-screen bg-slate-100 p-4 sm:p-0">
      <div className="mx-auto grid h-full w-full max-w-4xl grid-cols-1 sm:grid-cols-3 sm:h-[600px] sm:w-[900px]">
        <div className="col-span-1 bg-black p-4 sm:rounded-l-xl sm:rounded-tr-none sm:p-0 border border-r-red-200">
          <div className="mt-5 sm:mt-40 md:mt-48 flex flex-col items-center justify-center gap-5">
            <p className="text-2xl font-extrabold text-red-500">WELCOME BACK!</p>
            <p className="text-center font-semibold text-white">
              To keep connected with us please login with your personal info
            </p>
            <p className="text-center text-sm font-light text-white">
              But if you don&apos;t have an account please register first
            </p>
          </div>
          <div className="flex w-full items-center justify-center ">
            <Button
              className="mt-6 w-[100px] rounded-full bg-slate-700
               hover:bg-red-500"
              onClick={() => router.push("/register")}
            >
              Register
            </Button>
          </div>
        </div>
        <div className="relative col-span-2 bg-black rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none border-l-red-200 border">
          <Image src='/bg-create.jpg' alt="background" fill className="w-full h-full opacity-50 rounded-b-xl sm:rounded-r-xl"/>
          <main className="container mx-auto h-full sm:h-[40vh] px-4 absolute">
            <div className="mt-10 sm:mt-32 flex justify-center">
              <Card className="w-full max-w-[350px]">
                <CardHeader>
                  <CardTitle className="text-primary text-center text-3xl">
                    Login
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit}>
                    <div className="grid w-full items-center gap-4">
                      <FormInput
                        name="email"
                        type="email"
                        label="Email"
                        placeholder="Email"
                        value={values.email}
                        error={values.email}
                        isError={!!touched.email && !!errors.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <FormInput
                        name="password"
                        type="password"
                        label="Password"
                        placeholder="Password"
                        value={values.password}
                        error={values.password}
                        isError={!!touched.password && !!errors.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      <div className="flex justify-end">
                        <p
                          className="cursor-pointer text-xs"
                          onClick={() => router.push("/forgot-password")}
                        >
                          Forgot Password
                        </p>
                      </div>
                    </div>
                    <Button className="mt-6 w-full hover:bg-blue-500">
                      Sign in
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

export default Login;


