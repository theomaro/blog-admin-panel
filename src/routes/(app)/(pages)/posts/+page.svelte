<script lang="ts">
  import PostTable from "./../components/PostTable.svelte";
  import type { PageData } from "./$types";
  import SearchFilter from "../components/SearchFilter.svelte";
  import type { Post, SearchPost } from "$lib";
  import { createSearchStore, searchHandler } from "$lib/stores/searchStore";
  import { onDestroy } from "svelte";

  export let data: PageData;

  const searchUsers: SearchPost[] = data.posts.map((post: Post) => ({
    ...post,
    searchTerms: `${post.title} ${post.summary} ${post.author.full_name}`,
  }));

  const searchStore = createSearchStore(searchUsers);
  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

  onDestroy(() => {
    unsubscribe();
  });
</script>

<h1 class="capitalize py-1.5">Home / Posts</h1>

<div class="w-full mt-8">
  <div
    class="flex flex-col gap-6 md:gap-0 md:flex-row md:justify-between md:items-end"
  >
    <h2 class="text-xl">
      <i class="fas fa-list mr-3 text-primary-800 font-semibold"></i> Latest Posts
    </h2>

    <div class="md:basis-1/2 lg:basis-1/3">
      <SearchFilter
        placeholderText="title, summary, author"
        bind:keyword={$searchStore.searchTerm}
      />
    </div>
  </div>

  {#if $searchStore.filtered.length !== 0}
    <div class="bg-white overflow-auto my-8">
      <PostTable posts={$searchStore.filtered} />
    </div>

    <!-- <Paginator /> -->
  {:else}
    <p class="font-semibold text-lg mt-12">Ooops! No posts added yet</p>
  {/if}
</div>
