import { type Handle } from "@sveltejs/kit";

export const handle: Handle = async ({ event, resolve }) => {
  const unProtectedRoutes = ["/signin", "/signup"];
  const protectedRoutes = event.route.id?.includes("/(app)");
  const session = event.cookies.get("session");

  if (!session && protectedRoutes)
    return redirect("/signin", "No authenticated user.");

  if (session && unProtectedRoutes.includes(event.url.pathname))
    return redirect("/", "Welcome back");

  // check if token is valid and give access to a only that user
  // get user data from database
  const res = await event
    .fetch("http://localhost:3000/api/users", {
      method: "POST",
      body: JSON.stringify({
        token: session,
      }),
      headers: { "content-type": "application/json" },
    })
    .then((results) => results.json());

  if (!res.success && !unProtectedRoutes.includes(event.url.pathname))
    return redirect("signin", "Not a valid user");

  event.locals.currentUser = { ...res.user, isAuthenticated: true };

  return await resolve(event);
};

// custom redirect from joy of code `https://github.com/JoysOfCode/sveltekit-auth-cookies/blob/migration/src/hooks.ts`
function redirect(location: string, body?: string) {
  return new Response(body, {
    status: 303,
    headers: { location },
  });
}
