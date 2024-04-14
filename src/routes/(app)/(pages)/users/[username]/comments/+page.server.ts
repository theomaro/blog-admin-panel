import { API_URL } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { Comment } from "$lib";

export const load: PageServerLoad = async ({
  parent,
  cookies,
  fetch,
  params,
}) => {
  await parent();

  const res: {
    success: boolean;
    message: string;
    comments: Comment[];
  } = await fetch(`${API_URL}/users/${params.username}/comments`, {
    method: "POST",
    body: JSON.stringify({
      token: cookies.get("session"),
    }),
    headers: { "content-type": "application/json" },
  })
    .then((res) => res.json())
    .catch((error) => console.log(error.message));

  if (!res.success) throw fail(400, { message: res.message });

  return {
    comments: res.comments,
  };
};
