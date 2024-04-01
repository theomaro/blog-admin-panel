<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import profileImage from "$lib/images/pavatar.jpg";
  export let user: App.User | null;

  let showContainer: HTMLDivElement;

  const showProfileMenu = () => showContainer?.classList.toggle("show");
  const hideProfileMenu = () => showContainer?.classList.remove("show");
</script>

<svelte:window on:click={hideProfileMenu} />

<header class="w-full py-1 flex items-center justify-between">
  <div class="flex items-center justify-between">
    <button
      on:click={() => goto("/")}
      class="font-display font-bold text-2xl lg:text-3xl hover:text-gray-700"
    >
      <i class="ri ri-menu-line"></i>
      <span class="text-red-700">Blog</span>ger</button
    >
  </div>

  <div
    bind:this={showContainer}
    class="flex justify-end group {user ? 'flex' : 'hidden'}"
  >
    <button
      type="button"
      on:click|stopPropagation={showProfileMenu}
      class="w-10 h-10 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
    >
      <img src={user?.avatar_url || profileImage} alt="" />
    </button>

    <ul
      class="hidden group-[.show]:block absolute z-10 top-14 w-32 bg-white rounded-lg shadow-lg py-2"
    >
      <li>
        <button
          on:click={() => goto("/account/profile")}
          class="item-link {$page.url.pathname === '/account/profile'
            ? 'active-link'
            : ''}">Profile</button
        >
      </li>
      <li>
        <button
          on:click={() => goto("/account/settings")}
          class="item-link {$page.url.pathname === '/account/settings'
            ? 'active-link'
            : ''}         ">My account</button
        >
      </li>
      <form method="post" action="/?/signout">
        <button class="item-link" type="submit">Sign Out</button>
      </form>
    </ul>
  </div>

  <div class="{user ? 'hidden' : 'flex'} justify-end">
    <button class="py-2 px-5">Sign Up</button>
    <button class="py-2 px-5">Sign In</button>
  </div>
</header>

<style lang="postcss">
  .active-link {
    @apply bg-primary-500 text-white;
  }

  .item-link {
    @apply w-full text-start px-4 py-2 hover:bg-primary-600 hover:text-white;
  }
</style>
