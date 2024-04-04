import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { z } from "zod";
import { API_URL } from "$env/static/private";
import {
  changePasswordSchema,
  deleteUserSchema,
  usernameSchema,
} from "$lib/validators";

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
    const validator = await deleteUserSchema.safeParseAsync({
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
    const res = await fetch(`${API_URL}/profile`, {
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

  changeUsername: async ({ request, fetch, cookies }) => {
    const formData = await request.formData();
    const username = formData.get("username") ?? "";

    // validate user input
    const isUsernameValid = await usernameSchema.safeParseAsync({ username });

    if (!isUsernameValid.success)
      return {
        results: {
          username,
        },
        errors: {
          message: isUsernameValid.error.format().username?._errors[0],
        },
      };

    // send data to the server to update a username
    const res = await fetch(`${API_URL}/profile/change-username`, {
      method: "PUT",
      body: JSON.stringify({ token: cookies.get("session"), username }),
      headers: {
        "content-type": "application/json",
      },
    }).then((results) => results.json());

    if (!res.success)
      return {
        errors: { message: res.message },
      };

    throw redirect(303, "/account/settings");
  },

  changePassword: async ({ cookies, fetch, request }) => {
    const formData = await request.formData();

    const oldPassword = formData.get("old-password") ?? "";
    const newPassword = formData.get("new-password") ?? "";
    const confirmedNewPassword = formData.get("confirmed-new-password") ?? "";

    // validate user input
    const validator = await changePasswordSchema.safeParseAsync({
      oldPassword,
      newPassword,
      confirmedNewPassword,
    });

    if (!validator.success) {
      const errors = validator.error.format();

      return {
        errors: {
          message:
            errors.oldPassword?._errors[0] ||
            errors.newPassword?._errors[0] ||
            errors.confirmedNewPassword?._errors[0],
        },
      };
    }

    // send data to the server to update a username
    const res = await fetch(`${API_URL}/profile/change-password`, {
      method: "PUT",
      body: JSON.stringify({
        token: cookies.get("session"),
        ...validator.data,
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
