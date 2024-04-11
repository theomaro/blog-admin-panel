export const handleLoginRedirect = (url: URL) => {
  const fromUrl = url.pathname + url.search;
  return `/signin?redirectTo=${fromUrl.slice(1)}`;
};

// custom redirect from joy of code `https://github.com/JoysOfCode/sveltekit-auth-cookies/blob/migration/src/hooks.ts`
export const customRedirect = (location: string, body?: string) =>
  new Response(body, {
    status: 303,
    headers: { location },
  });

export const getFormattedDate = (dateInput: string) => {
  return new Date(dateInput).toDateString().slice(4);
};
