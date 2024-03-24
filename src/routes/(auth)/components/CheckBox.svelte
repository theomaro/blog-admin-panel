<script lang="ts">
  import LinkAction from "./LinkAction.svelte";
  export let text: string = "";
  export let linkText: string = "";
  export let url: string = "";
  export let forId: string;
</script>

<div class="flex items-start">
  <div class="flex items-center h-5">
    <input
      id={forId}
      name={forId}
      aria-describedby={forId}
      type="checkbox"
      class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
    />
  </div>
  <div class="ml-3 text-sm">
    <label for={forId} class="font-light text-gray-500">
      <LinkAction {text} {url} {linkText} />
    </label>
  </div>
</div>
