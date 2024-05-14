"use client";

import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useRegister from '@/hooks/api/auth/useRegister';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { validationSchema } from './validationSchema';

const Register = () => {
  const router = useRouter();
  const { register } = useRegister();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      reff: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      register(values);
    },
  });

  return (
    <main className="container mx-auto h-[90vh] px-4">
      <div className="mt-40 flex justify-center">
        <Card>
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
                  isError={!!formik.touched.email && !!formik.errors.email}
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
                  isError={
                    !!formik.touched.reff && !!formik.errors.reff
                  }
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </div>
              <div className="flex justify-between mt-2">
                  <p
                    className="text-xs"
                  >
                    Want to create your event? <span className='font-bold cursor-pointer' onClick={() => router.push("/register-organizer")}>Register as organizer</span>
                  </p>
                </div>
              <Button type='submit' className="mt-6 w-full">Register</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <hr className="my-24 w-full border-gray-300" />
    </main>
  );
};

export default Register;
