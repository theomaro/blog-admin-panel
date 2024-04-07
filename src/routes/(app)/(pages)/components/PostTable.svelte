<script lang="ts">
  import type { Post } from "$lib";
  import profileImage from "$lib/images/pavatar.jpg";
  import { getFormattedDate } from "$lib/utils";

  export let posts: Post[];
</script>

<div class="overflow-auto pb-2">
  <table class="min-w-full leading-normal">
    <thead
      class="bg-gray-800 text-white text-xs whitespace-nowrap md:text-sm text-left font-semibold uppercase tracking-wider"
    >
      <tr class="flex items-center justify-between lg:justify-evenly">
        <th class="text-center py-3 w-14">s/no</th>
        <th class="py-3 w-16 lg:w-40">Author</th>
        <th class="py-3 w-48 lg:w-1/5">Title</th>
        <th class="py-3 w-72 lg:w-1/3 ms-4 lg:ms-0">Summary</th>
        <th class="text-center py-3 w-28">Status</th>
        <th class="py-3 w-24">modified at</th>
      </tr>
    </thead>

    <tbody class="text-gray-700 text-xs md:text-sm">
      {#each posts as post, i}
        <tr
          class="even:bg-gray-200 flex items-center justify-between lg:justify-evenly"
        >
          <td class="text-center py-1.5 w-14">{i + 1}</td>
          <td class="py-1.5 w-16 lg:w-40">
            <div class="flex flex-col items-center lg:flex-row">
              <a
                href="users/{post.author.username}"
                class="flex-shrink-0 w-8 h-8 md:w-9 md:h-9"
              >
                <img
                  class="w-full h-full rounded-full"
                  src={post.author?.avatar_url || profileImage}
                  alt={post.author?.full_name ?? ""}
                />
              </a>
              <span class="lg:ml-3 font-semibold hidden lg:block"
                >{post.author?.full_name || ""}</span
              >
            </div>
          </td>
          <td class="py-1.5 w-48 lg:w-1/5">
            <a class="hover:text-blue-600" href="/posts/{post.slug_url}"
              >{post.title}</a
            ></td
          >
          <td class="py-1.5 w-72 lg:w-1/3 ms-4 lg:ms-0">
            <p class="">
              {post.summary.slice(0, post.summary.indexOf("."))}...
            </p>
          </td>
          <td class="text-center py-1.5 w-28">
            <span
              class="relative inline-block px-3 py-1 font-semibold text-xs text-{post.status} leading-tight"
            >
              <span
                aria-hidden
                class="absolute inset-0 bg-{post.status} opacity-50 rounded-full"
              ></span>
              <span class="relative">{post.status}</span>
            </span>
          </td>
          <td class="py-1.5 w-24"
            ><p class="text-xs">
              {post.modified_at
                ? getFormattedDate(post.modified_at)
                : "Jan 20, 2004"}
            </p></td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="postcss">
  .bg-published {
    @apply bg-green-200;
  }
  .text-published {
    @apply text-green-900;
  }

  .bg-approved {
    @apply bg-sky-200;
  }
  .text-approved {
    @apply text-sky-900;
  }

  .bg-disapproved {
    @apply bg-red-200;
  }
  .text-disapproved {
    @apply text-red-900;
  }

  .bg-archived {
    @apply bg-stone-200;
  }
  .text-archived {
    @apply text-stone-900;
  }

  .bg-draft {
    @apply bg-indigo-200;
  }
  .text-draft {
    @apply text-indigo-900;
  }

  .bg-submitted {
    @apply bg-fuchsia-200;
  }
  .text-submitted {
    @apply text-fuchsia-900;
  }
</style>
