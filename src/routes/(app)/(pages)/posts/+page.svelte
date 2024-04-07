<script lang="ts">
  import PostTable from "./../components/PostTable.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1 class="capitalize py-1.5">Home / Posts</h1>

<div class="mt-12">
  <div class=" flex justify-between items-center mb-5">
    <h2 class="text-xl"><i class="fas fa-list mr-3"></i> Latest Posts</h2>

    <button
      class="text-white font-semibold bg-blue-600 hover:bg-blue-700 flex items-center justify-center shadow-lg rounded-lg px-5 py-2"
    >
      <i class="fas fa-plus mr-3"></i> New Post
    </button>
  </div>

  <div class="bg-white overflow-auto">
    <PostTable posts={data.posts} />
  </div>
</div>
