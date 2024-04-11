<script lang="ts">
  import type { Comment } from "$lib";
  import CommentTable from "../components/CommentTable.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  const comments: Comment[] = data.comments;
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
      <!-- <SearchFilter /> -->
    </div>
  </div>

  {#if comments.length !== 0}
    <div class="bg-white overflow-auto my-8">
      <CommentTable {comments} />
    </div>

    <!-- <Paginator /> -->
  {:else}
    <p class="font-semibold text-lg mt-12">Ooops! No comments added yet</p>
  {/if}
</div>
