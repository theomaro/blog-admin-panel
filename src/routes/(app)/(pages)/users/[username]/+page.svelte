<script lang="ts">
  import UserProfileForm from "../../../components/UserProfileForm.svelte";
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<div class="w-full md:max-w-md lg:max-w-lg py-8">
  <UserProfileForm user={data.user} />
</div>
