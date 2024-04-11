<script lang="ts">
  import profileImage from "$lib/images/pavatar.jpg";
  import type { Comment } from "$lib";
  import { getFormattedDate } from "$lib/utils";

  export let comments: Comment[];
</script>

<div class="overflow-auto pb-2">
  <table class="min-w-full leading-normal">
    <thead
      class="bg-gray-800 text-white text-xs whitespace-nowrap 2xl:text-sm text-left font-semibold uppercase tracking-wider"
    >
      <tr class="flex items-center justify-between lg:justify-evenly">
        <th class="text-center py-3 w-14">s/no</th>
        <th class="py-3 w-16 lg:w-40">Created By</th>
        <th class="py-3 w-48 lg:w-1/5">Posted On</th>
        <th class="py-3 w-72 lg:w-1/3 ms-4 lg:ms-0">Content</th>
        <th class="text-center py-3 w-28">Status</th>
        <th class="py-3 w-24">modified at</th>
      </tr>
    </thead>

    <tbody class="text-gray-700 text-xs 2xl:text-sm">
      {#each comments as comment, i}
        <tr
          class="even:bg-gray-100 flex items-center justify-between lg:justify-evenly"
        >
          <td class="px-5 py-2 border-b border-gray-200">{i + 1}</td>
          <td class="py-1.5 w-16 lg:w-40">
            <div class="flex flex-col items-center lg:flex-row">
              <a
                href="users/{comment.author.username}"
                class="flex-shrink-0 w-8 h-8 2xl:w-9 2xl:h-9"
              >
                <img
                  class="w-full h-full rounded-full"
                  src={comment.author?.avatar_url || profileImage}
                  alt={comment.author?.full_name ?? "Unknown"}
                />
              </a>
              <span class="lg:ml-3 font-semibold hidden lg:block"
                >{comment.author?.full_name || "Unknown"}</span
              >
            </div>
          </td>
          <td class="py-1.5 w-48 lg:w-1/5">
            <a class="hover:text-blue-600" href="/posts/{comment.post.slug_url}"
              >{comment.post.title.slice(0, 40)}...</a
            ></td
          >
          <td class="py-1.5 w-72 lg:w-1/3 ms-4 lg:ms-0">
            <p class="">
              {comment.content.slice(0, 80)}...
            </p>
          </td>
          <td class="text-center py-1.5 w-28">
            <span
              class="relative inline-block px-3 py-1 font-semibold text-xs text-{comment.status} leading-tight"
            >
              <span
                aria-hidden
                class="absolute inset-0 bg-{comment.status} opacity-50 rounded-full"
              ></span>
              <span class="relative">{comment.status}</span>
            </span>
          </td>
          <td class="py-1.5 w-24"
            ><p class="text-xs">
              {comment.modified_at
                ? getFormattedDate(comment.modified_at)
                : getFormattedDate(comment.created_at)}
            </p></td
          >
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style lang="postcss">
  .bg-approved {
    @apply bg-green-200;
  }
  .text-approved {
    @apply text-green-900;
  }

  .bg-disapproved {
    @apply bg-red-200;
  }
  .text-disapproved {
    @apply text-red-900;
  }

  .bg-pending {
    @apply bg-amber-200;
  }
  .text-pending {
    @apply text-amber-900;
  }
</style>
