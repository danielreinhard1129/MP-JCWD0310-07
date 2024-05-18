"use client";

import { useToast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/lib/axios";
import { useAppDispatch } from "@/redux/hooks";
import { loginAction } from "@/redux/slices/userSlice";
import { User } from "@/types/user.type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface LoginArgs
  extends Omit<User, "id" | "fullName" | "refferal_code" | "reff"> {
  password: string;
}

interface Login {
  email: string;
  password: string;
}

interface LoginResponse {
  message: string;
  data: User;
  token: string;
}

const useLogin = () => {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const login = async (payload: Login) => {
    try {
      const { data } = await axiosInstance.post<LoginResponse>(
        "/auth/login",
        payload,
      );
      console.log(data);

      dispatch(loginAction(data.data));
      localStorage.setItem("token", data.token);

      if (data.data.role === "client") {
        toast({
          title: "Login Success",
          description: "You are login as user",
        });
      }

      if (data.data.role === "organizer") {
        toast({
          title: "Login Success",
          description: "You are login as organizer",
        });
      }
      router.replace("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        // FIXME: chane alert to toast
        toast({
          description: "Incorrect password!",
          variant: "destructive",
        });
      }
    }
  };
  return { login };
};

export default useLogin;
