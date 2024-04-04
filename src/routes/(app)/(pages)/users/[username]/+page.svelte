<script lang="ts">
  import ErrorFloated from "../../../../(auth)/components/ErrorFloated.svelte";
  import UserProfileForm from "../../../components/UserProfileForm.svelte";
  import UserProfileHeader from "../../../components/UserProfileHeader.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;

  export let form;
  let errors = form?.errors;
</script>

<ErrorFloated message={errors?.message} />

<UserProfileHeader title="Personal profile" icon="ri-user-line" />

<div class="w-full md:max-w-md lg:max-w-lg py-8">
  <UserProfileForm pathToAction="?/updateUser" user={data.user} />
</div>
