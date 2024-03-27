<script lang="ts">
  import Header from "../components/Header.svelte";

  import type { ActionData, PageData } from "./$types";
  export let data: PageData;
  export let form: ActionData;
  let errors = form?.errors;

  let deleteModal: HTMLDivElement;
  let changeUsernameModal: HTMLDivElement;

  let username = "",
    verify = "",
    password = "";

  const toggleDeleteModal = (
    event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
  ) => {
    deleteModal.classList.toggle("hidden");
  };

  const toggleUsernameModal = (
    event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }
  ) => {
    changeUsernameModal.classList.toggle("hidden");
  };

  let checkUsername: string;

  $: disableDelete =
    username && password && verify.includes("delete my account") ? false : true;
  $: disableUsername = username ? false : true;
</script>

<svelte:head>
  <title>Account settings</title>
</svelte:head>

<div
  class="{errors?.message
    ? ''
    : 'hidden'} absolute top-1 right-1 bg-orange-200 text-cyan-900 bg-opacity-50 shadow-md rounded px-4 py-1.5 w-1/2 text-sm"
>
  <p>{errors?.message}</p>
</div>

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
          type="button"
          on:click={toggleUsernameModal}
          class="border rounded-lg text-gray-700 text-sm font-semibold px-6 py-1"
          >Change username</button
        >

        <!--  -->
        <div
          bind:this={changeUsernameModal}
          class="hidden absolute z-50 left-0 right-0 top-0 bottom-0 bg-gray-50 bg-opacity-30"
        >
          <div
            class="bg-white shadow-lg rounded-md w-full max-w-sm mx-auto mt-7"
          >
            <div class="py-2 px-4 flex items-center justify-between border-b">
              <h3 class="font-semibold text-sm">Enter a new username</h3>

              <button
                on:click={toggleUsernameModal}
                type="button"
                class="border border-transparent hover:border-gray-300 px-1"
              >
                <div class="ri ri-close-line text-lg"></div>
              </button>
            </div>

            <form action="?/changeUsername" method="post" class="p-4 space-y-4">
              <div class="flex flex-col space-y-1">
                <input
                  id="change-uname"
                  name="username"
                  bind:value={username}
                  type="text"
                  class="border border-gray-300 py-1 px-2.5 rounded-lg text-sm focus:border-blue-500"
                />
                <label for="change-uname" class="text-xs"
                  >{checkUsername ?? "Choose a new username"}</label
                >
              </div>

              <div>
                <button
                  disabled={disableUsername}
                  type="submit"
                  class="bg-green-500 bg-opacity-95 text-white rounded-lg w-full text-sm py-1.5 text-center disabled:bg-emerald-300 disabled:font-semibold"
                  >Change my username</button
                >
              </div>
            </form>
          </div>
        </div>
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
        on:click={toggleDeleteModal}
        type="button"
        class="border rounded-lg text-red-700 border-red-700 text-sm font-semibold px-6 py-1"
        >Delete your account</button
      >
    </article>
  </div>

  <div
    bind:this={deleteModal}
    class="hidden absolute z-50 left-0 right-0 top-0 bottom-0 bg-gray-50 bg-opacity-30"
  >
    <!--  -->
    <div class="bg-white shadow-lg rounded-md w-full max-w-sm mx-auto mt-7">
      <div class="py-2 px-4 flex items-center justify-between">
        <h3 class="font-semibold text-sm">Are you sure you want to do this?</h3>

        <button
          on:click={toggleDeleteModal}
          type="button"
          class="border border-transparent hover:border-gray-300 px-1"
        >
          <div class="ri ri-close-line text-lg"></div>
        </button>
      </div>

      <div
        class="p-4 bg-red-200 bg-opacity-40 border-t border-b border-red-200 flex items-center gap-x-2"
      >
        <i class="ri ri-alert-line text-red-700 text-lg"></i>
        <p class="text-sm">This is extremely important.</p>
      </div>

      <div class="overflow-auto max-h-96">
        <div class="p-4 text-sm space-y-3 border-b">
          <p>
            We will immediately delete all of your articles (<span>12</span>) ,
            along with all of your comments, likes and shared posts.
          </p>

          <p>
            You will no longer be billed, and after 90 days your username will
            be available to anyone on Blogger.
          </p>

          <p>
            For more help, read our article "<a
              href="/articles/deleting-your-user-account"
              class="border-b border-sky-600 text-sky-500"
              >Deleting your user account</a
            >".
          </p>
        </div>

        <form action="?/deleteProfile" method="post" class="p-4 space-y-3">
          <div class="flex flex-col gap-y-1">
            <label for="username" class="text-sm">Your username:</label>
            <input
              id="username"
              name="username"
              bind:value={username}
              type="text"
              class="border border-gray-300 py-1 px-2.5 rounded-lg text-sm focus:border-blue-500"
            />
          </div>

          <div class="flex flex-col gap-y-1">
            <label for="verify" class="text-sm"
              >To verify, type <span class="italic text-xs select-none"
                >delete my account</span
              > below:</label
            >
            <input
              id="verify"
              name="verify"
              bind:value={verify}
              type="text"
              class="border border-gray-300 py-1 px-2.5 rounded-lg text-sm focus:border-blue-500"
            />
          </div>

          <div class="flex flex-col gap-y-1">
            <label for="" class="text-sm">Confirm your password:</label>
            <input
              id="password"
              name="password"
              bind:value={password}
              type="password"
              class="border border-gray-300 py-1 px-2.5 rounded-lg text-sm focus:border-blue-500"
            />
          </div>

          <div>
            <button
              disabled={disableDelete}
              type="submit"
              class="bg-red-800 bg-opacity-95 text-white rounded-lg w-full text-sm py-1.5 text-center disabled:bg-gray-200 disabled:text-red-700"
              >Delete this account</button
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</div>
