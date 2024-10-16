import { UserRole } from "@prisma/client";
import * as z from "zod";

// Login schema
export const LoginSchema = z.object({
  email: z.string().email({
    message: "email is required ",
  }),
  password: z.string().min(1, {
    message: "password is required",
  }),
  code: z.optional(z.string()),
});

// Reset schema
export const ResetSchema = z.object({
  email: z.string().email({
    message: "email is required ",
  }),
});

// New password schema
export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum of 6 character required!",
  }),
});

//Register schema
export const RegisterSchema = z.object({
  email: z.string().email({
    message: "email is required ",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters",
  }),
  name: z.string().min(4, {
    message: "Name is required",
  }),
});

// setting schema
export const settingsSchema = z
  .object({
    name: z.optional(z.string()),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) return false;
      return true;
    },
    { message: "New Password is required", path: ["newPassword"] }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) return false;
      return true;
    },
    { message: "Password is required", path: ["password"] }
  );
