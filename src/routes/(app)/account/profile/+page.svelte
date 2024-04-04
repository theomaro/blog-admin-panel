<script lang="ts">
  import ErrorFloated from "../../../(auth)/components/ErrorFloated.svelte";
  import UserProfileForm from "../../components/UserProfileForm.svelte";
  import UserProfileHeader from "../../components/UserProfileHeader.svelte";

  import type { PageData } from "./$types";
  export let data: PageData;

  export let form;
  let errors = form?.errors;

  $: user = data.currentUser;
</script>

<svelte:head>
  <title>Your profile</title>
</svelte:head>

<ErrorFloated message={errors?.message} />

<UserProfileHeader title="Public profile" icon="ri-user-line" />

<div class="w-full md:max-w-md lg:max-w-lg py-8">
  <UserProfileForm pathToAction="?/updateProfile" {user} />
</div>
