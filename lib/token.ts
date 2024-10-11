import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "@/lib/db";
import { VerificationToken } from "@prisma/client";
import { v4 as uuid } from "uuid";

export const generateVerificationToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = (await getVerificationTokenByEmail(
    email
  )) as VerificationToken;

  if (existingToken) {
    await db.verificationToken.delete({ where: { id: existingToken.id } });
  }
  const verificationToken = await db.verificationToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  console.log(verificationToken, "create verification");
  return verificationToken;
};
