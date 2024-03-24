<script lang="ts">
  export let placeholder: string;
  export let type: string;
  export let name: string = "";
  export let inputValue: FormDataEntryValue;
</script>

<input
  {type}
  name={name || type}
  id={name || type}
  value={inputValue}
  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-300 focus:border-gray-300 block w-full p-2 lg:p-2.5"
  {placeholder}
/>
