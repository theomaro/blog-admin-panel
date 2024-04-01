<script lang="ts">
  import { onMount } from "svelte";

  export let text = "";
  let span: HTMLSpanElement;

  onMount(() => {
    setTimeout(() => {
      span.classList.add("hidden");
    }, 3000);
  });
</script>

<span bind:this={span} class="py-2 px-1 text-xs text-red-400">{text}</span>
