<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'
import { useTodoStore } from '@/stores/todo'
const todoStore = useTodoStore()

onMounted(() => {
  console.log('es wird gemounted')
  todoStore.loadFromBackend()
  console.log('mounten fertig')
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
  gap: 1rem;
}

.router-link:visited {
  /*todo: funktioniert nicht. warum?? */
  color: white;
}

.router-link:hover {
  color: greenyellow; /*todo: funktioniert nicht. warum?? */
}
</style>
