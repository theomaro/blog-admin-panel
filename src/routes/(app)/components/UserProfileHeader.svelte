<script lang="ts">
  export let title: string;
  export let icon: string = "";
</script>

<h1 class="border-b pt-1 pb-3 text-xl max-w-5xl">
  <i class="ri {icon}"></i>
  <span>{title}</span>
</h1>
