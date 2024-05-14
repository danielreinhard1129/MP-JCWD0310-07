'use client';

import { axiosInstance } from '@/lib/axios';
import { User } from '@/types/user.types';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';

interface RegisterArgsOrganizer extends Omit<User, 'id' | 'points' | 'reff' | 'referralCode'> {role: string}
const useRegisterOrganizer = () => {
  const router = useRouter();
  const registerOrganizer = async (payload: RegisterArgsOrganizer) => {
    try {
      await axiosInstance.post('/auth/register-organizer', payload);
      router.push('/login');
    } catch (error) {
      //   console.log(error);
      if (error instanceof AxiosError) {
        alert(JSON.stringify(error.message));
      }
    }
  };
  return { registerOrganizer };
};

export default useRegisterOrganizer;
