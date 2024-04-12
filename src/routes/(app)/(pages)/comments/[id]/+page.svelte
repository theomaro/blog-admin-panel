<script lang="ts">
  import type { PageData } from "./$types";
  import profileImage from "$lib/images/pavatar.jpg";
  import Comment from "../../components/Comment.svelte";

  export let data: PageData;
</script>

<div class="grid grid-cols-12 grid-rows-6 gap-6 mt-8 items-start">
  <section
    class="space-y-3 p-6 relative shadow-lg rounded-md col-span-7 row-span-1"
  >
    <Comment comment={data.comment} />
  </section>

  <section
    class="relative shadow-lg rounded-md overflow-hidden col-span-5 row-span-6"
  >
    <h3
      class="font-semibold border-b-2 border-b-slate-600 text-white bg-slate-800 px-4 pb-1.5 pt-2 text-sm"
    >
      Replies
    </h3>

    {#each data.replies as reply}
      <div class="pe-4 ms-4 py-4 border-b-2">
        <Comment comment={reply} />
      </div>
    {:else}
      <div class="p-4"><p>No replies</p></div>
    {/each}
  </section>

  <section class="flex gap-6 col-span-7 row-span-2 items-start">
    <article class="shadow-xl rounded-md overflow-hidden pb-5 flex-1">
      <h3
        class="font-semibold border-b-2 border-b-slate-600 text-white bg-slate-800 px-4 pb-1.5 pt-2 text-sm"
      >
        Posted On
      </h3>

      <div class="px-4 flex flex-col gap-2.5">
        <h4 class="tex-sm tracking-tight leading-snug font-semibold mt-4">
          {data.comment.post.title}
        </h4>

        <p class="text-sm">{data.comment.post.summary.slice(0, 80)}...</p>

        <p class="flex items-center gap-1">
          <a
            href={`/posts/${data.comment.post.slug_url}`}
            class="text-sm text-emerald-500 hover:underline">Read more</a
          > <i class="ri ri-arrow-right-fill text-emerald-500"></i>
        </p>
      </div>
    </article>

    <article
      class="shadow-lg rounded-md pt-2 bg-slate-800 text-white basis-[40%]"
    >
      <h3
        class="font-semibold border-b-2 border-b-slate-600 px-4 pb-1.5 text-sm"
      >
        Posted By
      </h3>

      <div class="p-4 flex gap-3">
        <a href="/users/{data.comment.author.username}" class="w-9 h-9">
          <img
            class="w-full h-full rounded-full"
            src={data.comment.author?.avatar_url || profileImage}
            alt={data.comment.author?.full_name ?? "Unknown"}
          />
        </a>

        <div class="flex flex-col -space-y-1 flex-1">
          <h4>
            <a
              href="/users/{data.comment.author.username}"
              class="text-amber-600 text-sm hover:underline whitespace-nowrap"
              >{data.comment.author?.full_name || "Unknown"}</a
            >
          </h4>
          <p class="text-xs tracking-tight">
            {data.comment.author.bio || ""}
          </p>
        </div>
      </div>
    </article>
  </section>
</div>
