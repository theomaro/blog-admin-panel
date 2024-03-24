<script lang="ts">
  import profileImage from "$lib/images/pavatar.jpg";
  export let user: App.User | null;

  function handleProfile(
    event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
  ) {
    const parent = event.currentTarget.parentElement;
    parent?.classList.toggle("show");
  }
</script>

<header class="w-full py-2.5 flex items-center justify-between">
  <div class="flex items-center justify-between">
    <button
      class="font-display font-bold text-2xl lg:text-3xl hover:text-gray-700"
    >
      <i class="ri ri-menu-line"></i>
      <span class="text-red-700">Blog</span>ger</button
    >
  </div>

  <div class="flex justify-end group {user ? 'flex' : 'hidden'}">
    <button
      type="button"
      on:click={handleProfile}
      class="w-10 h-10 rounded-full overflow-hidden border-4 border-gray-400 hover:border-gray-300 focus:border-gray-300 focus:outline-none"
    >
      <img src={user?.avatar_url || profileImage} alt="" />
    </button>

    <ul
      class="hidden group-[.show]:block absolute top-14 w-32 bg-white rounded-lg shadow-lg py-2"
    >
      <li>
        <a
          href="/account/profile"
          class="block px-4 py-2 hover:bg-primary-600 hover:text-white"
          >Profile</a
        >
      </li>
      <li>
        <a
          href="/account/settings"
          class="block px-4 py-2 hover:bg-primary-600 hover:text-white"
          >My account</a
        >
      </li>
      <li>
        <form
          method="post"
          action="?/signout"
          class="block px-4 py-2 hover:bg-primary-600 hover:text-white"
        >
          <button type="submit">Sign Out</button>
        </form>
      </li>
    </ul>
  </div>

  <div class="{user ? 'hidden' : 'flex'} justify-end">
    <button class="py-2 px-5">Sign Up</button>
    <button class="py-2 px-5">Sign In</button>
  </div>
</header>
