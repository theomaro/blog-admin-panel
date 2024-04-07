<script lang="ts">
  export let pageSize: number;
  export let currentPage: number;
  export let totalItems: number;
  export let totalPages: number;

  const updatePageSize = (
    event: Event & { currentTarget: EventTarget & HTMLSelectElement }
  ) => {
    pageSize = Number(event.currentTarget.value);
    currentPage = 1;
  };
</script>

<section
  class="flex flex-col gap-y-6 lg:flex-row lg:justify-between lg:items-center"
>
  <div class="text-sm flex items-center gapx-x-2">
    <p>Page {currentPage} of {totalPages},</p>

    <div class="flex items-center gap-x-2">
      <span>showing</span>
      <select
        on:select={updatePageSize}
        bind:value={pageSize}
        name="pageSize"
        id="pageSize"
        class="border border-gray-300 text-sm p-0 ps-2 pt-1 pb-0.5 w-10 cursor-pointer custom-select focus:ring-0 focus:border-primary-600"
      >
        <option disabled={totalItems < 10} value={10}>10</option>
        <option disabled={totalItems < 15} value={25}>25</option>
        <option disabled={totalItems < 50} value={50}>50</option>
        <option disabled={totalItems < 100} value={100}>100</option>
      </select>
      <span>record(s) out of {totalItems} total</span>
    </div>
  </div>

  <ul class="flex items-center">
    <button
      disabled={currentPage === 1}
      on:click={() => (currentPage = currentPage > 1 ? currentPage - 1 : 1)}
      class="page-item page-next-prev">Prev</button
    >

    {#each Array(totalPages) as _, idx}
      <li>
        <button
          on:click={() => (currentPage = idx + 1)}
          class="page-item page-number {currentPage == idx + 1
            ? 'active-page'
            : ''}">{idx + 1}</button
        >
      </li>
    {/each}

    <button
      on:click={() =>
        (currentPage =
          currentPage <= totalPages ? currentPage + 1 : totalPages)}
      class="page-item page-next-prev"
      disabled={currentPage === totalPages}>Next</button
    >
  </ul>
</section>

<style lang="postcss">
  .page-item {
    @apply h-7 flex items-center justify-center font-semibold text-sm text-gray-600 border border-gray-200;
  }

  .page-number {
    @apply w-7 hover:text-primary-600;
  }

  .page-next-prev {
    @apply px-1.5 disabled:border-transparent;
  }

  .active-page {
    @apply text-primary-700 border-primary-600;
  }
</style>
