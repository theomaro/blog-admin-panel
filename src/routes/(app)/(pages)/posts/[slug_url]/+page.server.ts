import { API_URL } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { PostDetail } from "$lib";

export const load: PageServerLoad = async ({
  fetch,
  params,
  cookies,
  parent,
}) => {
  await parent();

  const { slug_url } = params;

  const res: {
    success: boolean;
    message: string;
    post: PostDetail;
  } = await fetch(`${API_URL}/posts/${slug_url}`, {
    method: "POST",
    body: JSON.stringify({
      token: cookies.get("session"),
      slug_url,
    }),
    headers: { "content-type": "application/json" },
  }).then((res) => res.json());

  if (!res.success) throw fail(400, { message: res.message });

  return {
    post: res.post,
  };
};
