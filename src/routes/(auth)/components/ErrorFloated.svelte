<script lang="ts">
  import { onMount } from "svelte";

  export let message: string;

  onMount(() => {
    setTimeout(() => {
      message = "";
    }, 3000);
  });
</script>

{#if message}
  <div
    class="absolute top-1 right-1 bg-orange-200 text-cyan-900 bg-opacity-50 shadow-md rounded px-3 py-1 text-sm"
  >
    <p>
      {message}
    </p>
  </div>
{/if}
