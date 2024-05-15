export interface User {
    id: number;
    fullName: string;
    email: string;
    password: string
    reff?: string
    referralCode: string
    role: string
    points: {
      total :number;
    }[]
    // referral_code?: string;
  }
  
