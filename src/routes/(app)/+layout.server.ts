import { redirect } from "@sveltejs/kit";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ locals }) => {
  if (!locals.currentUser) {
    throw redirect(303, "/signin");
  }

  return {
    currentUser: locals.currentUser,
  };
};
