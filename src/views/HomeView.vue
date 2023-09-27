<script setup>
import { useTodoStore } from '@/stores/todo'
import { ref } from 'vue'
import toolbar from '@/components/toolbar.vue'
const todoStore = useTodoStore()

// const newTodo = ref('')

// const addBtn = ref() //nur zu testzwecken

function addTodo(todo) {
  // addBtn.value.innerText = 'add' //nur zu testzwecken

  const description = todo.trim()
  if (!description) {
    alert(
      'Eine Aufgabe muss mindestens 1 Zeichen beinhalten. \nLeerzeichen vorne und hinten werden entfernt.'
    )
    return
  }
  if (todoStore.isDuplicate(description)) {
    alert('Diese Aufgabe gibt es schon! \nGibt es noch andere Aufgaben?')
    return
  }

  const newTodoObject = {
    description: description,
    done: false
  }

  todoStore.postTodo(newTodoObject)
  // newTodo.value = ''
}
</script>

<template>
  <main>
    <toolbar @addTodo="(newTodo) => addTodo(newTodo.value)" />
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
  </main>
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
