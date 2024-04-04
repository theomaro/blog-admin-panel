import { redirect, type Actions } from "@sveltejs/kit";
import { API_URL } from "$env/static/private";
import { signUpSchema } from "$lib/validators";

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
