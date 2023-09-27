<script setup>
import { useTodoStore } from '@/stores/todo'
import { ref } from 'vue'
const todoStore = useTodoStore()
</script>

<template>
  <ul class="todo-list">
    <li v-for="todo in todoStore.filteredTodos" :key="todo.id" class="todo-item">
      <input
        :id="todo.id"
        type="checkbox"
        v-model="todo.done"
        class="checkbox"
        @change="todoStore.putTodo(todo.id, todo)"
      />
      <label :for="todo.id" class="todo-description">{{ todo.description }}</label>
      <button @click="todoStore.deleteTodo(todo.id)">x</button>
    </li>
  </ul>
</template>

<style scoped>
.todo-list {
  padding-top: 2rem;
}
.todo-item {
  list-style: none;
  line-height: 150%;
}
</style>
