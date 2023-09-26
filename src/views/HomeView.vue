<script setup>
import { useTodoStore } from '../stores/todo'
import { ref } from 'vue'
const todoStore = useTodoStore()

const xyz = ref()
</script>

<template>
  <main>
    <div class="toolbar">
      <form>
        <label for="input-new-todo">neue Aufgabe:</label>
        <input
          class="input-new-todo"
          id="input-new-todo"
          type="text"
          placeholder="du schaffst das!"
        />
        <button type="submit" class="button" id="btn-add-todo" ref="xyz">+</button>
      </form>
      <button class="button" id="btn-delete-done">Erledigte löschen</button>
      <button class="button" id="btn-delete-all">Alle löschen</button>
    </div>
    {{ todoStore.count }}
    {{ todoStore.state.name }}
  </main>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-around;

  background-color: var(--light-blue);
  padding: 1rem;
}
</style>
