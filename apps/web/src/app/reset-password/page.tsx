'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useFormik } from 'formik';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { validationSchema } from './validationSchema';
import useLogin from '@/hooks/api/auth/useLogin';
import { notFound, useSearchParams } from 'next/navigation';
import useResetPassword from '@/hooks/api/auth/useResetPassword';

const ResetPassword = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  if (!token) {
    notFound();
  }

  const { resetPassword, isLoading } = useResetPassword();

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        password: '',
        confirmPassword: '',
      },
      validationSchema,
      onSubmit: ({ password }) => {
        resetPassword(password, token);
      },
    });

  return (
    <main className="container mx-auto h-[90vh] px-4">
      <div className="mt-40 flex justify-center">
        <Card className="w-[450px]">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-primary">
              Reset Password
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
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
                <FormInput
                  name="confirmPassword"
                  type="password"
                  label="Confirm Password"
                  placeholder="Confirm Password"
                  value={values.confirmPassword}
                  error={values.confirmPassword}
                  isError={!!touched.confirmPassword && !!errors.confirmPassword}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </div>
              <Button type='submit' className="mt-6 w-full">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default ResetPassword;
