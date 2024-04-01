<script lang="ts">
  import ErrorFloated from "../../../(auth)/components/ErrorFloated.svelte";
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
  <ErrorFloated message={errors.message} />
{/if}

<Header title="Public profile" icon="ri-user-line" />

<div class="w-full md:max-w-md lg:max-w-lg py-8">
  <FormUpdate {user} />
</div>
