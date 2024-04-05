import { API_URL } from "$env/static/private";
import { error, fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { User } from "$lib";

export const load: PageServerLoad = async ({ fetch, url, cookies, parent }) => {
  await parent();

  const limit = Number(url.searchParams.get("limit")) || 10;
  const page = Number(url.searchParams.get("page")) || 1;

  if (limit > 100) throw error(400, "Bad request");

  const res: {
    message: string;
    success: boolean;
    totalCounts: number;
    totalRows: number;
    users: User[];
  } = await fetch(`${API_URL}/users?limit=${limit}&page=${page}`, {
    method: "POST",
    body: JSON.stringify({
      token: cookies.get("session"),
    }),
    headers: { "content-type": "application/json" },
  }).then((res) => res.json());

  if (!res.success) throw fail(400, { message: res.message });

  return {
    users: res.users,
    totalCounts: res.totalCounts,
    totalRows: res.totalRows,
  };
};
