<script lang="ts">
  import profileImage from "$lib/images/pavatar.jpg";
  export let user: App.User | null;

  function handleClick(
    event: MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement }
  ) {
    let target = event.currentTarget;
    target.classList.add("active-link");
  }

  function showProfile(
    event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
  ) {
    let target = event.currentTarget;
    const nextEl = target.nextElementSibling;
    nextEl?.classList.toggle("hidden");
  }
</script>

<ul class="flex flex-col capitalize">
  <li class="flex justify-center lg:block">
    <a
      on:click={handleClick}
      href="/"
      class="text-base whitespace-nowrap space-x-3 border-b flex py-2 px-5 items-center active-link"
    >
      <i class="ri ri-home-4-line text-3xl lg:text-xl"></i>
      <span class="hidden lg:block">home</span></a
    >
  </li>
  <li>
    <a
      on:click={handleClick}
      href="/dashboard"
      class="text-base whitespace-nowrap space-x-3 border-b flex py-2 px-5 items-center hover:bg-primary-500 hover:text-white"
    >
      <i class="ri ri-dashboard-line text-3xl lg:text-xl"></i>
      <span class="hidden lg:block">dashboard</span></a
    >
  </li>
  <li>
    <a
      on:click={handleClick}
      href="/users"
      class="text-base whitespace-nowrap space-x-3 border-b flex py-2 px-5 items-center hover:bg-primary-500 hover:text-white"
    >
      <i class="ri ri-user-3-line text-3xl lg:text-xl"></i>
      <span class="hidden lg:block">Users</span></a
    >
  </li>
  <li>
    <a
      on:click={handleClick}
      href="/posts"
      class="text-base whitespace-nowrap space-x-3 border-b flex py-2 px-5 items-center hover:bg-primary-500 hover:text-white"
    >
      <i class="ri ri-table-line text-3xl lg:text-xl"></i>
      <span class="hidden lg:block">Posts</span></a
    >
  </li>
  <li>
    <a
      on:click={handleClick}
      href="/comments"
      class="text-base whitespace-nowrap space-x-3 border-b flex py-2 px-5 items-center hover:bg-primary-500 hover:text-white"
    >
      <i class="ri ri-mail-line text-3xl lg:text-xl"></i>
      <span class="hidden lg:block">Comments</span></a
    >
  </li>
</ul>

<div
  class="text-sm lg:px-4 py-2 shadow-lg border-t-2 border-t-primary-500 w-full flex justify-center lg:justify-start gap-2 items-center relative"
>
  <div class="w-10 h-10 rounded-full overflow-hidden">
    <img src={user?.avatar_url || profileImage} alt="" />
  </div>
  <div
    class="absolute -right-[6.5rem] border-t-2 border-t-primary-500 lg:border-0 py-2 lg:py-0 px-4 lg:px-0 bg-gray-900 lg:bg-transparent text-white lg:text-black lg:static lg:flex flex-col"
  >
    <h3 class="font-semibold">{user?.username}</h3>
    <p class="capitalize text-gray-300 lg:text-gray-800">
      {user?.current_role}
    </p>
  </div>
</div>

<style lang="postcss">
  .active-link {
    @apply bg-primary-500 text-white;
  }
</style>
