<script setup>
import { useTodoStore } from '@/stores/todo'
import { ref } from 'vue'
import toolbar from '@/components/ToolBar.vue'
import todolist from '@/components/TodoList.vue'

const todoStore = useTodoStore()

function addTodo(todo) {
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
}
</script>

<template>
  <main>
    <toolbar @addTodo="(newTodo) => addTodo(newTodo.value)" />
    <todolist />
  </main>
</template>
