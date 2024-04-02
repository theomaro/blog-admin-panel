import { API_URL } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, url, cookies, parent }) => {
  await parent();

  const limit = url.searchParams.get("limit") ?? "";
  const page = url.searchParams.get("page") ?? "";

  const res = await fetch(`${API_URL}/users`, {
    method: "POST",
    body: JSON.stringify({
      token: cookies.get("session"),
      limit: parseInt(limit) || 10,
      page: parseInt(page) || 1,
    }),
    headers: { "content-type": "application/json" },
  }).then((res) => res.json());

  if (!res.success) throw fail(400, { message: res.message });

  return {
    users: res.users,
    totalCounts: res.totalCounts,
  };
};
