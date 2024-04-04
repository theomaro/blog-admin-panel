<script lang="ts">
  import Paginator from "./../components/Paginator.svelte";
  import SearchFilter from "../components/SearchFilter.svelte";
  import UserTable from "../components/UserTable.svelte";
  import type { PageData } from "./$types";
  import type { SearchUser, User } from "$lib/app";
  import { createSearchStore, searchHandler } from "$lib/stores/searchStore";
  import { onDestroy } from "svelte";

  export let data: PageData;

  const searchUsers: SearchUser[] = data.users.map((user: User) => ({
    ...user,
    searchTerms: `${user.full_name} ${user.username} ${user.email} ${user.phone}`,
  }));

  const searchStore = createSearchStore(searchUsers);
  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

  onDestroy(() => {
    unsubscribe();
  });
</script>

<h1 class="capitalize py-1.5">Home / Users</h1>

<div class="w-full mt-8">
  <div
    class="flex flex-col gap-6 md:gap-0 md:flex-row md:justify-between md:items-end"
  >
    <h2 class="text-xl">
      <i class="fas fa-list mr-3 text-primary-800"></i> Latest Users
    </h2>

    <div class="md:basis-1/2 lg:basis-1/3">
      <SearchFilter bind:keyword={$searchStore.search} />
    </div>
  </div>

  {#if $searchStore.filtered.length !== 0}
    <div class="bg-white overflow-auto mt-8">
      <UserTable users={$searchStore.filtered} />
    </div>

    <Paginator />
  {:else}
    <p class="font-semibold text-lg mt-12">Ooops! No users</p>
  {/if}
</div>
