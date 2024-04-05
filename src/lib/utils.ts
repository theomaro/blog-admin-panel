export const handleLoginRedirect = (url: URL) => {
  const fromUrl = url.pathname + url.search;
  return `/signin?redirectTo=${fromUrl.slice(1)}`;
};
