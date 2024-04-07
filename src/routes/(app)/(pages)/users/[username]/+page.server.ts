import { API_URL } from "$env/static/private";
import { fail, redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import { profileSchema } from "$lib/validators";
import type { UserDetail } from "$lib";

export const load: PageServerLoad = async ({ params, cookies, parent }) => {
  await parent();

  const { username } = params;

  // get user profile by username
  const res: {
    success: boolean;
    message: string;
    user: UserDetail;
  } = await fetch(`${API_URL}/users/${username}`, {
    method: "POST",
    body: JSON.stringify({
      token: cookies.get("session"),
    }),
    headers: { "content-type": "application/json" },
  }).then((res) => res.json());

  if (!res.success) throw fail(400, { message: res.message });

  return {
    user: res.user,
    username,
  };
};

export const actions: Actions = {
  updateUser: async ({ request, fetch, cookies, params }) => {
    // get user data
    const formData = await request.formData();

    const profile = {
      full_name: formData.get("full_name") ?? "",
      sex: formData.get("sex") ?? "",
      birth_date: formData.get("birth_date") ?? "",
      phone: formData.get("phone") ?? "",
      email: formData.get("email") ?? "",
      avatar_url: formData.get("avatar_url") ?? "",
      biography: formData.get("biography") ?? "",
      location: formData.get("location") ?? "",
    };

    // validate user data
    const validator = await profileSchema.safeParseAsync({ ...profile });
    if (!validator.success) {
      const errors = validator.error.format();

      return {
        errors: {
          message:
            errors.full_name?._errors[0] ||
            errors.sex?._errors[0] ||
            errors.birth_date?._errors[0] ||
            errors.phone?._errors[0] ||
            errors.email?._errors[0] ||
            errors.avatar_url?._errors[0] ||
            errors.biography?._errors[0] ||
            errors.location?._errors[0],
        },
      };
    }

    // send data to an api endpoint
    const res = await fetch(`${API_URL}/profile`, {
      method: "PUT",
      body: JSON.stringify({
        token: cookies.get("session"),
        user: validator.data,
        username: params.username,
      }),
      headers: { "content-type": "application/json" },
    }).then((res) => res.json());

    if (!res.success)
      return {
        errors: { message: res.message },
      };

    throw redirect(303, `/users/${params.username}`);
  },
};
