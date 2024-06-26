<script lang="ts">
  import { getFormattedDate } from "$lib/utils";
  import Comment from "../../components/Comment.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="relative h-96">
  <img
    src={data.post.banner_url ?? "https://placehold.co/600x400"}
    alt=""
    class="w-full h-full object-cover"
  />
</div>

{#if data.post.status === "approved"}
  <form class="absolute right-24 top-2 z-10">
    <button
      formmethod="post"
      formaction="?/publish"
      class="bg-emerald-700 font-semibold text-white px-6 py-1.5 border-2 border-transparent hover:border-emerald-700 hover:bg-transparent hover:text-emerald-700"
      >Publish It</button
    >
  </form>
{/if}

{#if data.post.status === "published"}
  <form class="absolute right-24 top-2 z-10">
    <button
      formmethod="post"
      formaction="?/archive"
      class="bg-cyan-700 font-semibold text-white px-6 py-1.5 border-2 border-transparent hover:border-cyan-700 hover:bg-transparent hover:text-cyan-700"
      >Archive It</button
    >
  </form>
{/if}

<section
  class="max-w-4xl mx-auto bg-white pt-12 pb-6 px-12 lg:px-24 -mt-32 relative z-10"
>
  <!-- Like-Share button -->
  <article class="flex gap-2 absolute right-8 md:right-16">
    <button>
      <i class="ri-share-fill"></i>
    </button>
    <button>
      <i class="ri-heart-3-line"></i>
    </button>
  </article>

  <!-- Tags-Categories -->
  <article class="mb-8 text-sm 2xl:hidden">
    <ul class="flex flex-wrap gap-x-6 gap-y-1 mb-5">
      <li class="text-indigo-800">#tag1</li>
      <li class="text-indigo-800">#tag2</li>
      <li class="text-indigo-800">#tag3</li>
    </ul>

    <ul class="flex text-xs font-medium uppercase gap-3">
      <li>Category1</li>
      <li>Category2</li>
    </ul>
  </article>

  <!-- Title-MetaTitle -->
  <article class="space-y-6">
    <h1 class="font-display font-bold text-4xl md:text-5xl text-gray-900">
      {data.post.title}
    </h1>
    <h2 class="font-display text-lg md:text-xl text-gray-700">
      {data.post.meta_title ?? ""}
    </h2>
  </article>

  <!-- Author-LastModified -->
  <article class="flex justify-between items-center my-8">
    <div class="flex flex-col">
      <div class="flex items-center gap-2">
        <p class="text-sm text-gray-500">Written by</p>
        <span
          class="bg-{data.post.status} text-{data.post
            .status} text-xs leading-tight rounded-full py-0.5 px-2"
          >{data.post.status}</span
        >
      </div>
      <a href="/users/{data.post.author.username}" class="hover:text-gray-800"
        >{data.post.author.full_name ?? "Unknown"}</a
      >
    </div>

    <div class="flex flex-col">
      <p class="text-sm text-gray-500">Last Modified on</p>
      <p class="hover:text-gray-800">
        {data.post.modified_at
          ? getFormattedDate(data.post.modified_at)
          : getFormattedDate(data.post.created_at)}
      </p>
    </div>
  </article>

  <!-- Body -->
  <div class="prose prose-sm sm:prose lg:prose-lg mt-6">
    <p>{data.post.body ?? ""}</p>
  </div>
</section>

<section class="px-8 max-w-3xl mx-auto">
  <div class="flex items-center justify-between">
    <h2 class="text-lg lg:text-xl font-bold text-gray-900">
      Comments <span> &lpar;{data.comments.length}&rpar;</span>
    </h2>

    <a href="/posts/{data.post.slug_url}" class="text-emerald-700"
      >View all <i class="ri ri-arrow-right-line"></i></a
    >
  </div>

  <div>
    <ul class="shadow-lg rounded-md">
      {#each data.comments as comment}
        <li class="border-b-2 p-6 py-4">
          <a href="/comments/{comment.id}" class="space-y-3 block">
            <Comment {comment} />
          </a>
        </li>
      {:else}
        <div class="ps-4 h-16 leading-[4rem] text-sm">
          <p>No comments for this post</p>
        </div>
      {/each}
    </ul>
  </div>
</section>
