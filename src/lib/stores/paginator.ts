import type { PaginateStoreModel } from "$lib";
import { writable } from "svelte/store";

const createPaginateStore = <T extends Record<PropertyKey, any>>(
  paginateData: T[]
) => {
  const { set, subscribe, update } = writable({
    data: paginateData,
    totalItems: paginateData.length,
    totalRows: 0,
  });

  return {
    set,
    subscribe,
    update,
  };
};

const handlePaginate = <T extends Record<PropertyKey, any>>(
  store: PaginateStoreModel<T>
) => {
  let pageSize = 10;
  let totalItems = store.totalItems;
  let totalRows = store.totalRows;

  let totalPages = Math.ceil(store.totalRows / pageSize);
};
