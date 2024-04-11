<script lang="ts">
  import type { Comment, SearchComment } from "$lib";
  import { createSearchStore, searchHandler } from "$lib/stores/search";
  import { onDestroy } from "svelte";
  import CommentTable from "../components/CommentTable.svelte";
  import type { PageData } from "./$types";
  import SearchFilter from "../components/SearchFilter.svelte";
  import Paginator from "../components/Paginator.svelte";

  export let data: PageData;

  const searchComments: SearchComment[] = data.comments.map(
    (comment: Comment) => ({
      ...comment,
      searchTerms: `${comment.content} ${comment.post.title} ${comment.author.full_name}`,
    })
  );

  const searchStore = createSearchStore(searchComments);
  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

  let pageSize: number = 10;
  let currentPage: number = 1;
  $: totalItems = searchComments.length;
  $: totalPages = Math.ceil(totalItems / pageSize);
  $: currentPage = currentPage <= totalPages ? currentPage : 1;

  onDestroy(() => {
    unsubscribe();
  });
</script>

<h1 class="capitalize py-1.5">Home / Comments</h1>

<div class="w-full mt-8">
  <div
    class="flex flex-col gap-6 md:gap-0 md:flex-row md:justify-between md:items-end"
  >
    <h2 class="text-xl">
      <i class="fas fa-list mr-3 text-primary-800 font-semibold"></i> Latest Comments
    </h2>

    <div class="md:basis-1/2 lg:basis-1/3">
      <SearchFilter
        placeholderText="content, post, creator"
        bind:keyword={$searchStore.searchTerm}
      />
    </div>
  </div>

  {#if $searchStore.filtered.length !== 0}
    <div class="bg-white overflow-auto my-8">
      <CommentTable
        comments={$searchStore.filtered}
        bind:pageSize
        bind:currentPage
      />
    </div>

    <Paginator bind:pageSize bind:currentPage bind:totalItems bind:totalPages />
  {:else}
    <p class="font-semibold text-lg mt-12">Ooops! No comments added yet</p>
  {/if}
</div>
