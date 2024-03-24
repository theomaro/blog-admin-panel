import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
  await parent();

  // do some backend logic to load data specific for this user

  return {
    someData: "", // TODO
  };
};
