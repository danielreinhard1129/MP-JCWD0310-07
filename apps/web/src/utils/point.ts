// utils.ts (or any utility file)
import { User } from "@/types/user.type";

export const getTotalPoints = (user: User): number => {
  if (!user.points) {
    return 0;
  }
  return user.points.reduce((sum, point) => sum + point.total, 0);
};


