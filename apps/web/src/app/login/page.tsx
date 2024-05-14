"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFormik } from "formik";
import FormInput from "@/components/FormInput";
import { Button } from "@/components/ui/button";
import { validationSchema } from "./validationSchema";
import useLogin from "@/hooks/api/auth/useLogin";
import { useRouter } from "next/navigation";

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
    <main className="container mx-auto h-[90vh] px-4">
      <div className="mt-40 flex justify-center">
        <Card className="w-[450px]">
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
                <div className="flex justify-between">
                  <p
                    onClick={() => router.push("/register")}
                    className="cursor-pointer text-xs"
                  >
                    Dont have account? <span className='font-bold'>Register first</span>
                  </p>
                  <p
                    className="cursor-pointer text-xs"
                    onClick={() => router.push("/forgot-password")}
                  >
                    Forgot Password
                  </p>
                </div>
              </div>
              <Button className="mt-6 w-full">Login</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Login;