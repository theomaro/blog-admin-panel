<script lang="ts">
  import { page } from "$app/stores";
  import type { User } from "$lib";
  import profileImage from "$lib/images/pavatar.jpg";
  export let user: User | null;

  const handleClick = (
    event: MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement }
  ) => {
    let target = event.currentTarget;
    target.classList.add("active-link");
  };
</script>

<ul class="flex flex-col capitalize">
  <li class="flex justify-center lg:block">
    <a
      on:click={handleClick}
      href="/"
      class="space-x-3 item-link {$page.url.pathname === '/'
        ? 'active-link'
        : ''}"
    >
      <i class="ri ri-home-4-line text-2xl lg:text-xl"></i>
      <span class="hidden lg:block">home</span></a
    >
  </li>
  <li>
    <a
      on:click={handleClick}
      href="/dashboard"
      class="space-x-3 item-link {$page.url.pathname.startsWith('/dashboard')
        ? 'active-link'
        : ''}"
    >
      <i class="ri ri-dashboard-line text-2xl lg:text-xl"></i>
      <span class="hidden lg:block">dashboard</span></a
    >
  </li>
  <li>
    <a
      on:click={handleClick}
      href="/users"
      class="space-x-3 item-link {$page.url.pathname.startsWith('/users')
        ? 'active-link'
        : ''}"
    >
      <i class="ri ri-user-3-line text-2xl lg:text-xl"></i>
      <span class="hidden lg:block">Users</span></a
    >
  </li>
  <li>
    <a
      on:click={handleClick}
      href="/posts"
      class="space-x-3 item-link {$page.url.pathname.startsWith('/posts')
        ? 'active-link'
        : ''}"
    >
      <i class="ri ri-table-line text-2xl lg:text-xl"></i>
      <span class="hidden lg:block">Posts</span></a
    >
  </li>
  <li>
    <a
      on:click={handleClick}
      href="/comments"
      class="space-x-3 item-link {$page.url.pathname.startsWith('/comments')
        ? 'active-link'
        : ''}"
    >
      <i class="ri ri-mail-line text-2xl lg:text-xl"></i>
      <span class="hidden lg:block">Comments</span></a
    >
  </li>
</ul>

<article
  class="flex flex-col items-center justify-center py-2 gap-2 border-t-2 border-t-primary-500 shadow-lg lg:py-2 lg:flex-row lg:justify-start lg:px-4"
>
  <img
    src={user?.avatar_url || profileImage}
    alt=""
    class="w-8 lg:w-10 rounded-full"
  />

  <div class="text-xs text-center lg:text-start lg:px-2 lg:text-sm">
    <h3 class="font-semibold">{user?.username}</h3>
    <p class="capitalize text-gray-800">
      {user?.current_role}
    </p>
  </div>
</article>

<style lang="postcss">
  .active-link {
    @apply bg-primary-500 text-white;
  }

  .item-link {
    @apply text-sm whitespace-nowrap py-2 px-5 border-b flex items-center  hover:bg-primary-500 hover:text-white;
  }
</style>
