"use client";

import { toast, useToast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user.type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface RegisterArgs
  extends Omit<User, "id" | "points" | "role" | "referralCode" | "rewards" | "createdAt"> {}
const useRegister = () => {
  const router = useRouter();
  const { toast } = useToast();
  const register = async (payload: RegisterArgs) => {
    try {
      await axiosInstance.post("/auth/register", payload);
      toast({
        title: "Register Success",
        description: "You are succesfully register as user",
      });
      router.push("/login");
    } catch (error) {
      //   console.log(error);
      if (error instanceof AxiosError) {
       toast({
        description: "Email already exist!",
        variant: "destructive"
       })
      }
    }
  };
  return { register };
};

export default useRegister;
