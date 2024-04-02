<script lang="ts">
  import Paginator from "./../components/Paginator.svelte";
  import SearchFilter from "../components/SearchFilter.svelte";
  import UserTable from "../components/UserTable.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1 class="capitalize py-1.5">Home / Users</h1>

<div class="w-full mt-8">
  <div
    class="flex flex-col gap-6 md:gap-0 md:flex-row md:justify-between md:items-end"
  >
    <h2 class="text-xl">
      <i class="fas fa-list mr-3 text-primary-800"></i> Latest Users
    </h2>

    <div class="md:basis-1/2 lg:basis-1/3"><SearchFilter /></div>
  </div>

  {#if data.totalCounts !== 0}
    <div class="bg-white overflow-auto mt-8">
      <UserTable users={data.users} />
    </div>

    <Paginator />
  {:else}
    <p class="font-semibold text-lg mt-12">Ooops! No users</p>
  {/if}
</div>
