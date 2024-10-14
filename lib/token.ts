import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "@/lib/db";
import { PasswordResetToken, VerificationToken } from "@prisma/client";
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

export const generatePasswordResetToken = async (email: string) => {
  const token = uuid();
  const expires = new Date(new Date().getTime() + 3600 * 1000);
  const existingToken = (await getPasswordResetTokenByEmail(
    email
  )) as PasswordResetToken;

  if (existingToken) {
    await db.passwordResetToken.delete({ where: { id: existingToken.id } });
  }
  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      email,
      token,
      expires,
    },
  });
  console.log(passwordResetToken, "create verification");
  return passwordResetToken;
};
