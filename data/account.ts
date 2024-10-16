import { db } from "@/lib/db";

export const getAccountByUserId = async (userId: string) => {
  try {
    // get account by user userId
    return await db.account.findFirst({ where: { userId } });
  } catch (error) {
    return null;
  }
};
