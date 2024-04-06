import { API_URL } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { User } from "$lib";

export const load: PageServerLoad = async ({ fetch, url, cookies, parent }) => {
  await parent();

  const res: {
    message: string;
    success: boolean;
    users: User[];
  } = await fetch(`${API_URL}/users`, {
    method: "POST",
    body: JSON.stringify({
      token: cookies.get("session"),
    }),
    headers: { "content-type": "application/json" },
  }).then((res) => res.json());

  if (!res.success) throw fail(400, { message: res.message });

  return {
    users: res.users,
  };
};
