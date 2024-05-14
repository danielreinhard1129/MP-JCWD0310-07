
"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import useRegister from '@/hooks/api/auth/useRegister';
import { validationSchema } from './validationSchema';
import { Mail } from 'lucide-react';
import useRegisterOrganizer from '@/hooks/api/auth/useRegisterOrganizer';

const RegisterOrganizer = () => {
  const { registerOrganizer } = useRegisterOrganizer();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      referralCode: '',
      role: 'organizer',
    },
    validationSchema,
    onSubmit: async (values) => {
      registerOrganizer(values);
    },
  });

  return (
    <main className="container mx-auto h-[90vh] px-4">
      <div className="mt-40 flex justify-center">
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
              </div>
              <Button type='submit' className="mt-6 w-full">Register as organizer</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <hr className="my-24 w-full border-gray-300" />
    </main>
  );
};

export default RegisterOrganizer;
