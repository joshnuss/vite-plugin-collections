<script lang="ts">
  let { data } = $props()
  let { posts } = $derived(data)
</script>

{#each posts as post (post.id)}
  <article>
    <h2>{post.title}</h2>
    <a href="/posts/{post.id}">View post</a>
  </article>
{/each}

<pre>{JSON.stringify(posts, null, 2)}</pre>
