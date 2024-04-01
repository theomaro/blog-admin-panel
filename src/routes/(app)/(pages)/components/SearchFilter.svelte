<script lang="ts">
</script>

<form>
  <div class="flex relative">
    <label
      for="search-dropdown"
      class="mb-2 text-sm font-medium text-gray-900 sr-only">Search</label
    >

    <div class="relative w-full">
      <input
        type="search"
        id="search-dropdown"
        class="block px-2.5 py-1.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded border border-gray-300 focus:ring-primary-400 focus:border-primary-400"
        placeholder="Search Users..."
        required
      />
      <button
        type="submit"
        class="absolute top-0 end-0 px-2.5 py-2 text-sm font-medium h-full text-white bg-primary-600 rounded-e border border-primary-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300"
      >
        <svg
          class="w-4 h-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
        <span class="sr-only">Search</span>
      </button>
    </div>
  </div>
</form>
