<script lang="ts">
  import { onMount } from "svelte";

  export let message: string;
  let container: HTMLDivElement;

  onMount(() => {
    setTimeout(() => {
      container.classList.add("hidden");
    }, 3000);
  });
</script>

<div
  bind:this={container}
  class="absolute top-1 right-1 bg-orange-200 text-cyan-900 bg-opacity-50 shadow-md rounded px-4 py-1.5 w-1/2 text-sm"
>
  <p>{message}</p>
</div>
