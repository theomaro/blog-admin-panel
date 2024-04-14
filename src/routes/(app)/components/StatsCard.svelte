<script lang="ts">
  export let value: number = 0;
  export let title: string = "";
</script>

<article
  class="rounded-md shadow-md py-3 flex flex-col items-center gap-1 color-{title.toLowerCase()}"
>
  <h3 class="font-family-karla font-semibold capitalize">{title}</h3>
  <p class="text-3xl font-bold">{value}</p>
</article>

<style lang="postcss">
  .color-admins {
    @apply bg-red-100 text-red-800;
  }

  .color-editors {
    @apply bg-cyan-100 text-cyan-800;
  }

  .color-authors {
    @apply bg-sky-100 text-sky-800;
  }

  .color-readers {
    @apply bg-emerald-100 text-emerald-800;
  }

  .color-pending {
    @apply bg-amber-100 text-amber-800;
  }

  .color-draft {
    @apply bg-amber-100 text-amber-800;
  }

  .color-submitted {
    @apply bg-emerald-100 text-emerald-800;
  }

  .color-approved {
    @apply bg-sky-100 text-sky-800;
  }

  .color-disapproved {
    @apply bg-red-100 text-red-800;
  }

  .color-published {
    @apply bg-cyan-100 text-cyan-800;
  }

  .color-archived {
    @apply bg-gray-100 text-gray-800;
  }

  .color-total {
    @apply bg-gray-100 text-gray-800;
  }
</style>
