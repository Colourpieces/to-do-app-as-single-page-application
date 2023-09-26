<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <p>Header</p>
    <nav>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>
  <p>hallo</p>
  <RouterView />
</template>

<style scoped></style>
