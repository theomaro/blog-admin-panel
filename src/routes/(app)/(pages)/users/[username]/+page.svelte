<script lang="ts">
  import UserProfileForm from "../../../components/UserProfileForm.svelte";
  import UserProfileHeader from "../../../components/UserProfileHeader.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<UserProfileHeader title="Personal profile" icon="ri-user-line" />

<div class="w-full md:max-w-md lg:max-w-lg py-8">
  <UserProfileForm pathToAction="?/updateUser" user={data.user} />
</div>
