import z from "zod";
import { redirect, type Actions } from "@sveltejs/kit";
import { API_URL } from "$env/static/private";

const signUpSchema = z.object({
  email: z
    .string({ required_error: "Email field is required" })
    .trim()
    .email({ message: "Email must be a valid email address" }),

  username: z
    .string({ required_error: "Username field is required" })
    .min(5, { message: "Username must be at least 5 character long" })
    .max(30, { message: "Username must be less than 30 character" })
    .trim(),

  password: z
    .string({ required_error: "Password field is required" })
    .min(8, { message: "Password must be at least 8 character long" })
    .trim(),

  confirmed_password: z
    .string({ required_error: "You must confirm your password" })
    .trim(),
});
// Jos2018(Mat

export const actions: Actions = {
  signup: async ({ fetch, request }) => {
    // read the form data sent by the browser
    const formData = await request.formData();

    const email: FormDataEntryValue = formData.get("email") ?? "";
    const username: FormDataEntryValue = formData.get("username") ?? "";
    const password: FormDataEntryValue = formData.get("password") ?? "";
    const confirmed_password: FormDataEntryValue =
      formData.get("confirmed-password") ?? "";

    // validate form input
    const validator = await signUpSchema.safeParseAsync({
      email,
      username,
      password,
      confirmed_password,
    });

    if (!validator.success) {
      const errors = validator.error.format();

      return {
        results: {
          email,
          username,
          password,
          confirmed_password,
        },
        errors: {
          email: errors.email?._errors[0],
          username: errors.username?._errors[0],
          password: errors.password?._errors[0],
          confirmed_password: errors.confirmed_password?._errors[0],
        },
      };
    } else {
      // send data to an api endpoint
      const res: any = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(validator.data),
        headers: { "content-type": "application/json" },
      }).then((res) => res.json());

      if (!res.success)
        return {
          results: {
            email,
            username,
          },
          errors: { message: res.message },
        };

      throw redirect(303, "/signin");
    }
  },
};
