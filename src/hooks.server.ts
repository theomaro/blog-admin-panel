import { type Handle } from "@sveltejs/kit";
import { API_URL } from "$env/static/private";

export const handle: Handle = async ({ event, resolve }) => {
  const unProtectedRoutes = ["/signin", "/signup"];
  const protectedRoutes = event.route.id?.includes("/(app)");
  const token = event.cookies.get("session");

  if (!token && protectedRoutes)
    return redirect("/signin", "No authenticated user.");

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
      return redirect("/signin", "No authenticated user.");
    }
    event.locals.currentUser = { ...res.user, isAuthenticated: true };
  }

  return await resolve(event);
};

// custom redirect from joy of code `https://github.com/JoysOfCode/sveltekit-auth-cookies/blob/migration/src/hooks.ts`
const redirect = (location: string, body?: string) =>
  new Response(body, {
    status: 303,
    headers: { location },
  });
