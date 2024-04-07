export const handleLoginRedirect = (url: URL) => {
  const fromUrl = url.pathname + url.search;
  return `/signin?redirectTo=${fromUrl.slice(1)}`;
};

export const getFormattedDate = (dateInput: string) => {
  return new Date(dateInput).toDateString().slice(4);
};
