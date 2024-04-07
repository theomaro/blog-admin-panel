<script lang="ts">
  import type { PageData } from "./$types";

  export let data: PageData;
</script>

<h1>Title: {data.post.title}</h1>
<h2>Author: {data.post.author.full_name}</h2>
