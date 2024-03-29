<script lang="ts">
  import FormUpdate from "../components/FormUpdate.svelte";
  import Header from "../components/Header.svelte";

  import type { PageData } from "./$types";
  export let data: PageData;

  export let form;
  let errors = form?.errors;

  $: user = data.currentUser;
</script>

<svelte:head>
  <title>Your profile</title>
</svelte:head>

{#if errors?.message}
  <div
    class="absolute top-1 right-1 bg-orange-200 text-cyan-900 bg-opacity-50 shadow-md rounded px-4 py-1.5 w-1/2 text-sm"
  >
    <p>{errors?.message}</p>
  </div>
{/if}

<Header title="Public profile" icon="ri-user-line" />

<div class="w-full md:max-w-md lg:max-w-lg py-8">
  <FormUpdate {user} />
</div>
