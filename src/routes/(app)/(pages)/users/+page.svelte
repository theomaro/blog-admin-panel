<script lang="ts">
  import Paginator from "./../components/Paginator.svelte";
  import SearchFilter from "../components/SearchFilter.svelte";
  import UserTable from "../components/UserTable.svelte";
  import type { PageData } from "./$types";
  import type { SearchUser, User } from "$lib";
  import { createSearchStore, searchHandler } from "$lib/stores/search";
  import { onDestroy } from "svelte";

  export let data: PageData;

  const searchUsers: SearchUser[] = data.users.map((user: User) => ({
    ...user,
    searchTerms: `${user.full_name} ${user.username} ${user.email} ${user.phone}`,
  }));

  const searchStore = createSearchStore(searchUsers);
  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

  let pageSize: number = 10;
  let currentPage: number = 1;
  $: totalItems = searchUsers.length;
  $: totalPages = Math.ceil(totalItems / pageSize);
  $: currentPage = currentPage <= totalPages ? currentPage : 1;

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="w-full mt-8">
  <div
    class="flex flex-col gap-6 md:gap-0 md:flex-row md:justify-between md:items-end"
  >
    <h2 class="text-xl">
      <i class="fas fa-list mr-3 text-primary-800 font-semibold"></i> Latest Users
    </h2>

    <div class="md:basis-1/2 lg:basis-1/3">
      <SearchFilter
        placeholderText="names, emails, phones"
        bind:keyword={$searchStore.searchTerm}
      />
    </div>
  </div>

  {#if $searchStore.filtered.length !== 0}
    <div class="bg-white overflow-auto my-8">
      <UserTable users={$searchStore.filtered} bind:pageSize bind:currentPage />
    </div>

    <Paginator bind:pageSize bind:currentPage bind:totalItems bind:totalPages />
  {:else}
    <p class="font-semibold text-lg mt-12">Ooops! No users</p>
  {/if}
</div>
