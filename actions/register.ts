"use server";
import { getUserByEmail } from "@/data/user";
import { db } from "@/lib/db";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/token";
import { RegisterSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) return { error: "Invalid fields!" };

  const { email, password, name } = validatedFields.data;

  const hashPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(email);
  if (existingUser) return { error: "email already in use" };
  await db.user.create({
    data: {
      name,
      email,
      password: hashPassword,
    },
  });
  const verificationToken = await generateVerificationToken(email);

  // TODO sent verification token to email
  await sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "User created !" };
};
