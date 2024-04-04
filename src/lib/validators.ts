// place files you want to import through the `$lib` alias in this folder.

import { z } from "zod";

export const profileSchema = z.object({
  full_name: z.string().trim(),
  sex: z.string().trim(),
  birth_date: z.string().trim(),
  phone: z.string().trim(),
  email: z
    .string({ required_error: "Email field is required" })
    .trim()
    .email({ message: "Email must be a valid email address" }),
  avatar_url: z.string().trim(),
  biography: z
    .string()
    .trim()
    .min(10, { message: "Biography must be at least 10 character long" })
    .max(80, { message: "Biography must be less than 80 character" }),
  location: z.string().trim(),
});

export const usernameSchema = z.object({
  username: z
    .string({ required_error: "Username field is required" })
    .trim()
    .min(5, { message: "Username must be at least 5 character long" })
    .max(30, { message: "Username must be less than 30 character" })
    .refine((data: string) => !/\s/.test(data), {
      message: "Username can not contain whitespace",
    }),
});

const passwordSchema = z
  .string({ required_error: "Old password is required" })
  .trim()
  .min(8, { message: "Password must be at least 8 character long" })
  .refine((data: string) => !/\s/.test(data), {
    message: "Password can not contain whitespace",
  })
  .superRefine((data: string, ctx: z.RefinementCtx) => {
    if (data.search("(?=.*([A-Z]){1,})")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must have at least one uppercase",
      });
    }

    if (data.search("(?=.*[a-z]{1,})")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must have at least one lowercase",
      });
    }

    if (data.search("(?=.*[)(!@#$&*]{1,})")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must have at least one special character",
      });
    }

    if (data.search("(?=.*[0-9]{1,})")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Must have at least one number",
      });
    }
  });

const emailSchema = z
  .string({ required_error: "Email field is required" })
  .trim()
  .email({ message: "Email must be a valid email address" });

const confirmPasswordSchema = z
  .string({ required_error: "You must confirm your password" })
  .trim();

export const signUpSchema = z.object({
  email: emailSchema,
  username: usernameSchema,
  password: passwordSchema,
  confirmed_password: confirmPasswordSchema,
});

export const signInSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
});

export const deleteUserSchema = z.object({
  username: usernameSchema,
  verify: z
    .string({ required_error: "Verify field is required" })
    .trim()
    .includes("delete my account", {
      message: "must contain on `delete my account`",
    }),
  password: passwordSchema,
});

export const changePasswordSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    confirmedNewPassword: confirmPasswordSchema,
  })
  .refine(async (values) => values.oldPassword !== values.newPassword, {
    message: "New password must be different",
    path: ["newPassword"],
  })
  .refine(
    async (values) => values.newPassword === values.confirmedNewPassword,
    {
      message: "New password must match",
      path: ["confirmedNewPassword"],
    }
  );
