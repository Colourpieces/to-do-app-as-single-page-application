<script setup>
import { useTodoStore } from '@/stores/todo'
import { ref } from 'vue'
const todoStore = useTodoStore()

const newTodo = ref('')

const emit = defineEmits(['addTodo'])

function onAddTodo() {
  emit('addTodo', newTodo)
  newTodo.value = ''
}
</script>

<template>
  <div class="toolbar">
    <form>
      <label for="input-new-todo">neue Aufgabe:</label>
      <input
        class="input-new-todo"
        id="input-new-todo"
        type="text"
        placeholder="du schaffst das!"
        v-model="newTodo"
      />
      <button
        type="submit"
        class="button"
        id="btn-add-todo"
        @click.prevent="onAddTodo()"
        ref="addBtn"
      >
        +
      </button>
    </form>
    <button class="button" @click="todoStore.deleteDoneTodos()" id="btn-delete-done">
      Erledigte löschen
    </button>
    <button class="button" @click="todoStore.deleteAllTodos()" id="btn-delete-all">
      Alle löschen
    </button>
    <div class="filter-wrapper">
      <label>Filter:</label>
      <select name="filter" v-model="todoStore.state.currentFilter">
        <option value="all">Alle</option>
        <option value="done">erledigt</option>
        <option value="open">unerledigt</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-around;

  background-color: var(--light-blue);
  padding: 1rem;
}
</style>
