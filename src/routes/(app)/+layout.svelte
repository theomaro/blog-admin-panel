<script lang="ts">
  import SideBar from "./components/SideBar.svelte";
  import Header from "./components/Header.svelte";
  import type { PageData } from "./$types";
  export let data: PageData;
</script>

<div class="pe-2 lg:px-6 w-full max-w-[98rem] mx-auto">
  <Header user={data.currentUser} />

  <div class="flex mt-3 min-h-[89vh] 2xl:min-h-[93vh]">
    <aside
      class="bg-gray-50 flex flex-col justify-between w-16 lg:basis-1/5 relative"
    >
      <SideBar user={data.currentUser} />
    </aside>

    <div
      class="shadow-md basis-full border-t border-r rounded-tr-lg border-gray-200 overflow-y-auto"
    >
      <div class="max-h-[89vh] 2xl:max-h-[93vh] pt-3 px-3">
        <slot />
      </div>
    </div>
  </div>
</div>
