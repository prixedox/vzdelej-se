import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      subscriptionStatus: string;
      xp: number;
      level: number;
      streak: number;
      dailyLessonsUsed: number;
      role: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
  }
}
