import z from "zod";
import { redirect, type Actions } from "@sveltejs/kit";
import { API_URL } from "$env/static/private";

const signInSchema = z.object({
  username: z
    .string({ required_error: "Username field is required" })
    .min(5, { message: "Username must be at least 5 character long" })
    .max(30, { message: "Username must be less than 30 character" })
    .trim(),

  password: z
    .string({ required_error: "Password field is required" })
    .min(8, { message: "Password must be at least 8 character long" })
    .trim(),
});

export const actions: Actions = {
  signin: async ({ fetch, request, cookies }) => {
    // read the form data sent by the browser
    const formData = await request.formData();

    const username: FormDataEntryValue = formData.get("username") ?? "";
    const password: FormDataEntryValue = formData.get("password") ?? "";

    // validate form input
    const validator = await signInSchema.safeParseAsync({
      username,
      password,
    });

    if (!validator.success) {
      const errors = validator.error.format();

      return {
        results: {
          username,
        },
        errors: {
          username: errors.username?._errors[0],
          password: errors.password?._errors[0],
        },
      };
    }

    // send data to an api endpoint
    const res: any = await fetch(`${API_URL}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(validator.data),
      headers: { "content-type": "application/json" },
    }).then((results) => results.json());

    if (!res.success)
      return {
        results: {
          username: validator.data.username,
        },
        errors: { message: res.message },
      };

    cookies.set("session", res.token, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      maxAge: res.expiresIn,
    });

    throw redirect(303, "/");
  },
};
