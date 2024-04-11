import { redirect, type Handle } from "@sveltejs/kit";
import { API_URL } from "$env/static/private";
import { customRedirect, handleLoginRedirect } from "$lib/utils";

export const handle: Handle = async ({ event, resolve }) => {
  const unProtectedRoutes = ["/signin", "/signup"];
  const protectedRoutes = event.route.id?.includes("/(app)");
  const token = event.cookies.get("session");
  const fromUrl = event.url.pathname + event.url.search;

  if (!token && protectedRoutes) {
    if (!event.locals.currentUser) {
      throw redirect(302, handleLoginRedirect(event.url));
    }
  }

  if (token && unProtectedRoutes.includes(event.url.pathname)) {
    return customRedirect("/", "Welcome back");
  }

  if (token && !unProtectedRoutes.includes(event.url.pathname)) {
    // get user data from database by valid token
    const res: any = await event
      .fetch(`${API_URL}/profile`, {
        method: "POST",
        body: JSON.stringify({
          token,
        }),
        headers: { "content-type": "application/json" },
      })
      .then((results) => results.json());

    if (!res.success) {
      return customRedirect(
        `/signin?redirectTo=${fromUrl.slice(1)}`,
        "No authenticated user."
      );
    }
    event.locals.currentUser = { ...res.user, isAuthenticated: true };
  }

  return await resolve(event);
};
