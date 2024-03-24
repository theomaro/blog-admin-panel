<script lang="ts">
  import SideBar from "./components/SideBar.svelte";
  import Header from "./components/Header.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class="pe-2 lg:px-6 w-full max-w-[98rem] mx-auto">
  <Header user={data.currentUser} />

  <div class="flex mt-3">
    <aside
      class="min-h-[92vh] bg-gray-50 flex flex-col justify-between w-16 lg:basis-1/5"
    >
      <SideBar user={data.currentUser} />
    </aside>

    <div
      class="shadow-md basis-full py-2 px-8 border-t border-r rounded-tr-lg border-gray-200"
    >
      <slot />
    </div>
  </div>
</div>
