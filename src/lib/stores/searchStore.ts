import type { SearchStoreModel } from "$lib/app";
import { writable } from "svelte/store";

export const createSearchStore = <T extends Record<PropertyKey, any>>(
  data: T[]
) => {
  const { subscribe, set, update } = writable(<SearchStoreModel<T>>{
    data: data,
    filtered: data,
    search: "",
  });

  return { subscribe, set, update };
};

export const searchHandler = <T extends Record<PropertyKey, any>>(
  store: SearchStoreModel<T>
) => {
  const searchTerm = store.search.toLowerCase() || "";

  store.filtered = store.data.filter((item: any) =>
    item.searchTerms.toLowerCase().includes(searchTerm)
  );
};
