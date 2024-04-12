<script lang="ts">
  import type { CommentDetail } from "$lib";
  import { getFormattedDate } from "$lib/utils";

  export let comment: CommentDetail;

  let dropdownMenu: HTMLUListElement;

  const toggleDropDownMenu = () => dropdownMenu.classList.toggle("hidden");
  const hideDropDownMenu = () => dropdownMenu.classList.add("hidden");
</script>

<svelte:window on:click={hideDropDownMenu} />

<article class="flex justify-between">
  <div class="flex flex-col">
    <div class="flex items-center gap-2">
      <p class="text-sm text-gray-500">Written by</p>
      <span
        class="bg-{comment.status} text-{comment.status} text-xs leading-tight rounded-full py-0.5 px-2"
        >{comment.status}</span
      >
    </div>
    <a
      href="/users/{comment.author.username}"
      class="text-sm text-gray-800 hover:text-primary-800 hover:underline"
      >{comment.author.full_name ?? "Unknown"}</a
    >
  </div>

  <button
    class="inline-flex items-center text-sm font-medium text-center text-gray-500 rounded-lg rotate-90"
    type="button"
    on:click|stopPropagation={toggleDropDownMenu}
  >
    <svg
      class="w-4 h-4"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 16 3"
    >
      <path
        d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z"
      />
    </svg>
    <span class="sr-only">Comment settings</span>
  </button>
</article>

<article class="flex flex-col gap-y-3">
  <p class="tracking-wide text-sm">
    {comment.content}
  </p>

  <div class="flex items-center justify-between">
    <p class="text-sm">
      Updated on: <span class="text-gray-500">
        {comment.modified_at
          ? getFormattedDate(comment.modified_at)
          : getFormattedDate(comment.created_at)}
      </span>
    </p>

    <div class="flex items-center space-x-4">
      <button
        type="button"
        class="flex items-center text-xs text-gray-500 hover:underline dark:text-gray-400 font-medium"
      >
        <svg
          class="mr-1.5 w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 18"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
          />
        </svg>
      </button>
      <button
        type="button"
        class="flex items-center text-xs text-gray-500 hover:underline dark:text-gray-400 font-medium"
      >
        <svg
          class="mr-1.5 w-3.5 h-3.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="#000"
          viewBox="0 0 458.624 458.624"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="0"
            d="M339.588,314.529c-14.215,0-27.456,4.133-38.621,11.239l-112.682-78.67c1.809-6.315,2.798-12.976,2.798-19.871 c0-6.896-0.989-13.557-2.798-19.871l109.64-76.547c11.764,8.356,26.133,13.286,41.662,13.286c39.79,0,72.047-32.257,72.047-72.047 C411.634,32.258,379.378,0,339.588,0c-39.79,0-72.047,32.257-72.047,72.047c0,5.255,0.578,10.373,1.646,15.308l-112.424,78.491 c-10.974-6.759-23.892-10.666-37.727-10.666c-39.79,0-72.047,32.257-72.047,72.047s32.256,72.047,72.047,72.047 c13.834,0,26.753-3.907,37.727-10.666l113.292,79.097c-1.629,6.017-2.514,12.34-2.514,18.872c0,39.79,32.257,72.047,72.047,72.047 c39.79,0,72.047-32.257,72.047-72.047C411.635,346.787,379.378,314.529,339.588,314.529z"
          />
        </svg>
      </button>
    </div>
  </div>
</article>

<!-- Dropdown menu -->
<ul
  bind:this={dropdownMenu}
  class="absolute hidden -top-6 right-12 z-10 w-28 bg-gray-50 rounded shadow"
>
  <li class="border-b {comment.status === 'disapproved' ? '' : 'hidden'}">
    <form>
      <button
        formmethod="post"
        formaction="?/approve"
        on:click={() => dropdownMenu.classList.toggle("hidden")}
        class="block py-2 ps-3 text-sm text-gray-700">Approve</button
      >
    </form>
  </li>
  <li class="border-b {comment.status === 'approved' ? '' : 'hidden'}">
    <form>
      <button
        formmethod="post"
        formaction="?/disapprove"
        on:click={() => dropdownMenu.classList.toggle("hidden")}
        class="block py-2 ps-3 text-sm text-gray-700">Disapprove</button
      >
    </form>
  </li>
  <li class="">
    <form>
      <button
        on:click={() => dropdownMenu.classList.toggle("hidden")}
        class="block py-2 ps-3 text-sm text-gray-700">Delete</button
      >
    </form>
  </li>
</ul>
