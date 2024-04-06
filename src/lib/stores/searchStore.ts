import type { SearchStoreModel } from "$lib";
import { writable } from "svelte/store";

export const createSearchStore = <T extends Record<PropertyKey, any>>(
  searchableData: T[]
) => {
  const searchable = {
    data: searchableData,
    filtered: searchableData,
    searchTerm: "",
  };

  const { subscribe, set, update } = writable(<SearchStoreModel<T>>searchable);

  return { subscribe, set, update };
};

export const searchHandler = <T extends Record<PropertyKey, any>>(
  store: SearchStoreModel<T>
) => {
  const searchTerm = store.searchTerm.toLowerCase() || "";

  store.filtered = store.data.filter((item: T) =>
    item.searchTerms.toLowerCase().includes(searchTerm)
  );
};
