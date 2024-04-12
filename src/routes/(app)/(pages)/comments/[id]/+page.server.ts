import { API_URL } from "$env/static/private";
import { fail, type Actions, redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import type { CommentDetail } from "$lib";

export const load: PageServerLoad = async ({
  fetch,
  params,
  cookies,
  parent,
}) => {
  await parent();

  const { id } = params;

  const res: {
    success: boolean;
    message: string;
    comment: CommentDetail;
    replies: CommentDetail[];
  } = await fetch(`${API_URL}/comments/${id}`, {
    method: "POST",
    body: JSON.stringify({
      token: cookies.get("session"),
    }),
    headers: { "content-type": "application/json" },
  }).then((res) => res.json());

  if (!res.success) throw fail(400, { message: res.message });

  return {
    comment: res.comment,
    replies: res.replies,
  };
};

export const actions: Actions = {
  approve: async ({ fetch, cookies, params, request }) => {
    const { id } = params;
    const formData = await request.formData();
    const commentId = formData.get("id");

    const res = await fetch(
      `${API_URL}/comments/${commentId}/change-status?status=approved`,
      {
        method: "POST",
        body: JSON.stringify({
          token: cookies.get("session"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    if (!res.success) throw fail(400, { message: res.message });

    throw redirect(302, `/comments/${id}`);
  },

  disapprove: async ({ fetch, cookies, params, request }) => {
    const { id } = params;
    const formData = await request.formData();
    const commentId = formData.get("id");

    const res = await fetch(
      `${API_URL}/comments/${commentId}/change-status?status=disapproved`,
      {
        method: "POST",
        body: JSON.stringify({
          token: cookies.get("session"),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res) => res.json());

    if (!res.success) throw fail(400, { message: res.message });

    throw redirect(302, `/comments/${id}`);
  },
};
