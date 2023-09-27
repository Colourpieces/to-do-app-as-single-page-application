<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo'
const todoStore = useTodoStore()

onMounted(() => {
  // todoStore.loadFromBackend()
  todoStore.getAllTodos()
})
</script>

<template>
  <header>
    <h1>To Do App</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/">Home</RouterLink>
    </nav>
  </header>
  <RouterView />
</template>

<style scoped>
header {
  background-color: var(--dark-blue);

  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

nav {
  color: white;
  grid-row: 2;
  display: flex;
  gap: 2rem;
}

a {
  color: white;
  text-decoration: none;
}
a:visited {
  color: white;
}

a:hover {
  color: var(--yellow);
}
</style>
