<script lang="ts">
  export let text: string = "";
  export let url: string;
  export let linkText: string = "";
</script>

<p class="text-sm font-light text-gray-500">
  {text}
  <a href={url} class="font-medium text-primary-600 hover:underline"
    >{linkText}</a
  >
</p>
