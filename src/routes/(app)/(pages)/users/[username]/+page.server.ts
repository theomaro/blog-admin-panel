import { API_URL } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ params, cookies, parent }) => {
  await parent();

  const { username } = params;

  // get user profile by username
  const res = await fetch(`${API_URL}/users/${username}`, {
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
