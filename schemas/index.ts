import * as z from "zod";

// Login schema
export const LoginSchema = z.object({
  email: z.string().email({
    message: "email is required ",
  }),
  password: z.string().min(1, {
    message: "password is required",
  }),
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
