import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { z } from "zod";

const deleteSchema = z.object({
  username: z
    .string({ required_error: "Username field is required" })
    .min(5, { message: "Username must be at least 5 character long" })
    .max(30, { message: "Username must be less than 30 character" })
    .trim(),
  verify: z
    .string({ required_error: "Verify field is required" })
    .trim()
    .includes("delete my account", {
      message: "must contain on `delete my account`",
    }),
  password: z
    .string({ required_error: "Password field is required" })
    .min(8, { message: "Password must be at least 8 character long" })
    .trim(),
});

export const load: PageServerLoad = async ({ parent }) => {
  await parent();

  // do some backend logic to load data specific for this user

  return {
    someData: "", // TODO
  };
};

export const actions: Actions = {
  deleteProfile: async ({ request, fetch, cookies }) => {
    const formData = await request.formData();

    const username: FormDataEntryValue = formData.get("username") ?? "";
    const verify: FormDataEntryValue = formData.get("verify") ?? "";
    const password: FormDataEntryValue = formData.get("password") ?? "";

    // validate form input
    const validator = await deleteSchema.safeParseAsync({
      username,
      verify,
      password,
    });

    if (!validator.success) {
      const errors = validator.error.format();

      return {
        results: {
          username,
          verify,
          password,
        },
        errors: {
          message:
            errors.username?._errors[0] ||
            errors.verify?._errors[0] ||
            errors.password?._errors[0],
        },
      };
    }

    // send data to the server to delete a user
    const res = await fetch("http://localhost:3000/api/users", {
      method: "DELETE",
      body: JSON.stringify({
        token: cookies.get("session"),
        user: {
          username,
          password,
        },
      }),
      headers: { "content-type": "application/json" },
    }).then((results) => results.json());

    if (!res.success) {
      return {
        errors: { message: res.message },
      };
    }

    // delete session cookie and redirect to login page
    cookies.delete("session", { path: "/", httpOnly: true, sameSite: true });
    throw redirect(303, "/signin");
  },
};
