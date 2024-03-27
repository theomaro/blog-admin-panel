import { redirect, type Actions } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const actions: Actions = {
  signout: async ({ cookies }) => {
    // get a cookie
    // check if token are valid
    // delete that cookie token for that specific user
    cookies.delete("session", { path: "/", httpOnly: true, sameSite: true });
    throw redirect(303, "/signin");
  },
};

export const load: PageServerLoad = async ({ parent }) => {
  await parent();

  // do some backend logic to load data specific for this user

  return {
    someData: "", // TODO
  };
};
// Jos2018(Mat
