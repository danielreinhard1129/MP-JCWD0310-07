'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import useRegister from '@/hooks/api/auth/useRegister';
import { validationSchema } from './validationSchema';

const Register = () => {
  const { register } = useRegister();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      password: '',
      refferal_code: '',
    },
    validationSchema,
    onSubmit: (values) => {
      register(values);
    },
  });
  return (
    <main className="container mx-auto h-[90vh] px-4">
      <div className="mt-40 flex justify-center">
        <Card>
          <CardHeader>
            <CardTitle className="text-center text-3xl text-primary">
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
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                />
                <FormInput
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                  value={formik.values.email}
                  error={formik.errors.email}
                  isError={!!formik.touched.email && !!formik.errors.email}
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
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
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                />
                <FormInput
                  name="refferal_code"
                  type="refferal_code"
                  label="Refferal Code"
                  placeholder="Refferal Code"
                  value={formik.values.refferal_code}
                  error={formik.errors.refferal_code}
                  isError={
                    !!formik.touched.refferal_code && !!formik.errors.refferal_code
                  }
                  handleChange={formik.handleChange}
                  handleBlur={formik.handleBlur}
                />
              </div>
              <Button className="mt-6 w-full">Register</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      <hr className="my-24 w-full border-gray-300" />
    </main>
    
  );
};

export default Register;
