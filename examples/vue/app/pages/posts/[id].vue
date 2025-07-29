<script setup lang="ts">
  import { get } from '#posts'

  const route = useRoute()
  const post = await get(route.params.id)
</script>

<template>
  <h1>{{ post.title }}</h1>

  <div v-html="post.body"></div>

  <pre>{{ JSON.stringify(post, null, 2) }}</pre>
</template>
