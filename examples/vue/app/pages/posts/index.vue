<script setup lang="ts">
  import { list } from '#posts'

  const posts = await list()
</script>

<template>
  <article v-for="post in posts" :key="id">
    <h2>{{ post.title }}</h2> {{ post.id }}
    <NuxtLink :to="{ name: 'posts-id', params: { id: post.id } }">View Post</NuxtLink>
  </article>

  <pre>{{ JSON.stringify(posts, null, 2) }}</pre>
</template>
