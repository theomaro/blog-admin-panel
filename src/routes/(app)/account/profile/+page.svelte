<script lang="ts">
  import FormUpdate from "../components/FormUpdate.svelte";
  import Header from "../components/Header.svelte";

  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<svelte:head>
  <title>Your profile</title>
</svelte:head>

<Header title="Public profile" icon="ri-user-line" />

<div class="w-full md:max-w-md lg:max-w-lg">
  <FormUpdate user={data.currentUser} />
</div>
