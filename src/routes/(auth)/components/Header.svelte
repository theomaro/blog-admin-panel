<script lang="ts">
  export let text: string = "";
</script>

<div class="flex flex-col gap-1.5 justify-center items-center">
  <h1 class="font-display font-bold text-3xl hover:text-gray-700">
    <span class="text-red-700">Blog</span>ger
  </h1>

  <p class="text-lg leading-tight tracking-tight text-gray-600">
    {text}
  </p>
</div>
