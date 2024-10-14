"use server";

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { NewPasswordSchema } from "@/schemas";
import { User } from "@prisma/client";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | null
) => {
  if (!token) {
    return { error: "Missing token!" };
  }
  const validateFields = NewPasswordSchema.safeParse(values);
  if (!validateFields) {
    return { error: "Invalid Fields!" };
  }

  const existingToken = await getPasswordResetTokenByToken(token);
  if (!existingToken) {
    return {
      error: "Invalid token!",
    };
  }
  const hasExpired = new Date(existingToken.expires) < new Date();
  if (hasExpired) {
    return { error: "Token has expired!" };
  }

  const existingUser = (await getUserByEmail(existingToken.email)) as User;
  if (!existingToken) {
    return { error: "Email does not exist!" };
  }
  const hashPassword = await bcrypt.hash(values.password, 10);
  await db.user.update({
    where: { id: existingUser.id },
    data: { password: hashPassword },
  });
  await db.passwordResetToken.delete({
    where: {
      id: existingToken.id,
    },
  });
  return { success: "password updated" };
};
