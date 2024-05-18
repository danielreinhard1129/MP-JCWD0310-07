"use client";

import { useToast } from "@/components/ui/use-toast";
import { axiosInstance } from "@/lib/axios";
import { User } from "@/types/user.type";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";

interface RegisterArgsOrganizer
  extends Omit<User, "id" | "points" | "reff" | "referralCode"> {
  role: string;
}
const useRegisterOrganizer = () => {
  const router = useRouter();
  const { toast } = useToast();
  const registerOrganizer = async (payload: RegisterArgsOrganizer) => {
    try {
      await axiosInstance.post("/auth/register-organizer", payload);
      toast({
        title: "Register Success",
        description: "You are succesfully register as organizer",
      });
      router.push("/login");
    } catch (error) {
      //   console.log(error);
      if (error instanceof AxiosError) {
        toast({
          description: "Email already exist!",
          variant: "destructive",
        });
      }
    }
  };
  return { registerOrganizer };
};

export default useRegisterOrganizer;
