<script lang="ts">
  import type { PageData } from "./$types";
  import { getFormattedDate } from "$lib/utils";
  import profileImage from "$lib/images/pavatar.jpg";

  export let data: PageData;

  let dropdownMenu: HTMLUListElement;

  function dropDownMenuToggler(
    event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
  ) {
    dropdownMenu.classList.toggle("hidden");
  }
</script>

<div class="flex items-start justify-between gap-8 mt-8 px-6">
  <section
    class="max-w-xl basis-2/3 shadow-lg rounded-md px-8 py-8 space-y-4 relative"
  >
    <article class="flex justify-between">
      <div class="flex flex-col">
        <div class="flex items-center gap-2">
          <p class="text-sm text-gray-500">Written by</p>
          <span
            class="bg-{data.comment.status} text-{data.comment
              .status} text-xs leading-tight rounded-full py-0.5 px-2"
            >{data.comment.status}</span
          >
        </div>
        <a
          href="/users/{data.comment.author.username}"
          class="text-sm text-gray-800 hover:text-primary-800 hover:underline"
          >{data.comment.author.full_name ?? "Unknown"}</a
        >
      </div>

      <button
        class="inline-flex items-center text-sm font-medium text-center text-gray-500 rounded-lg rotate-90"
        type="button"
        on:click={dropDownMenuToggler}
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
        {data.comment.content}
      </p>

      <div class="flex items-center justify-between">
        <p class="text-sm">
          Updated on: <span class="text-gray-500">
            {data.comment.modified_at
              ? getFormattedDate(data.comment.modified_at)
              : getFormattedDate(data.comment.created_at)}
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
      <li
        class="border-b {data.comment.status === 'disapproved' ? '' : 'hidden'}"
      >
        <a
          on:click={() => dropdownMenu.classList.toggle("hidden")}
          href="/comments/{data.comment.id}"
          class="block py-2 ps-3 text-sm text-gray-700">Approve</a
        >
      </li>
      <li class="border-b {data.comment.status === 'approved' ? '' : 'hidden'}">
        <a
          on:click={() => dropdownMenu.classList.toggle("hidden")}
          href="/comments/{data.comment.id}"
          class="block py-2 ps-3 text-sm text-gray-700">Disapprove</a
        >
      </li>
      <li class="">
        <a
          on:click={() => dropdownMenu.classList.toggle("hidden")}
          href="/comments/{data.comment.id}"
          class="block py-2 ps-3 text-sm text-gray-700">Delete</a
        >
      </li>
    </ul>
  </section>

  <section class="max-w-sm flex flex-col gap-12">
    <article class="shadow-xl rounded-md overflow-hidden pb-5">
      <h3
        class="font-semibold border-b-2 border-b-slate-600 text-white bg-slate-800 px-6 pb-2 pt-3"
      >
        Posted On
      </h3>

      <div class="px-6 flex flex-col gap-2.5">
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

    <article class="shadow-lg rounded-md pt-2 pb-5 bg-slate-800 text-white">
      <h3 class="font-semibold border-b-2 border-b-slate-600 px-6 pb-2">
        Posted By
      </h3>

      <div class="px-6 flex items-center flex-row gap-3 mt-4">
        <a href="/users/{data.comment.author.username}" class="w-12 h-12">
          <img
            class="w-full h-full rounded-full"
            src={data.comment.author?.avatar_url || profileImage}
            alt={data.comment.author?.full_name ?? "Unknown"}
          />
        </a>

        <div class="flex flex-col -space-y-1 font-display">
          <h4 class="">
            <a
              href="/users/{data.comment.author.username}"
              class="text-amber-600 text-lg hover:underline"
              >{data.comment.author?.full_name || "Unknown"}</a
            >
          </h4>
          <p class="text-sm tracking-tight">
            {data.comment.author?.bio || ""}
          </p>
        </div>
      </div>
    </article>
  </section>
</div>
