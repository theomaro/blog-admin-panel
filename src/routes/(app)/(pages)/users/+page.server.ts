import { API_URL } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const res = await fetch(`${API_URL}/users`, {
    method: "GET",
  }).then((res) => res.json());

  if (!res.success) throw fail(400, { message: res.message });

  return {
    users: res.users,
    totalCounts: res.totalCounts,
  };
};
