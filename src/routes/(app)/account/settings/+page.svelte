<script lang="ts">
  import Header from "../components/Header.svelte";

  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<svelte:head>
  <title>Account settings</title>
</svelte:head>

<Header title="Manage Account" icon="ri-settings-3-line" />

<div class="md:max-w-md lg:max-w-2xl">
  <div class="space-y-12">
    <article class="space-y-2">
      <h3 class="text-xl text-gray-700 font-semibold">Username</h3>

      <div class="border-l-4 ps-3 space-y-2">
        <p class="text-sm">
          You a currently connect to your account as @<strong
            >{data.currentUser.username}</strong
          >. Would you like to change this username?
        </p>

        <button
          class="border rounded-lg text-gray-700 text-sm font-semibold px-6 py-1"
          >Change username</button
        >
      </div>
    </article>

    <article class="space-y-2">
      <h3 class="text-xl text-gray-700 font-semibold">Password</h3>

      <div class="border-l-4 ps-3 space-y-2">
        <p class="text-sm">
          Once you delete your account, there is no going back. Please be
          certain.
        </p>

        <button
          class="border rounded-lg text-gray-700 text-sm font-semibold px-6 py-1"
          >Change password</button
        >
      </div>
    </article>

    <article class="space-y-4">
      <h3 class="border-b text-2xl text-red-700 font-semibold pb-2">
        Delete account
      </h3>
      <p class="text-sm">
        Once you delete your account, there is no going back. Please be certain.
      </p>

      <button
        class="border rounded-lg text-red-700 text-sm font-semibold px-6 py-1"
        >Delete your account</button
      >
    </article>
  </div>
</div>
