<script setup>
import { useTodoStore } from '@/stores/todo'
import { ref } from 'vue'
const todoStore = useTodoStore()

const newTodo = ref('')

const addBtn = ref() //nur zu testzwecken

function addTodo(todo) {
  addBtn.value.innerText = 'add' //nur zu testzwecken

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
  newTodo.value = ''
}
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
          v-model="newTodo"
        />
        <button
          type="submit"
          class="button"
          id="btn-add-todo"
          @click.prevent="addTodo(newTodo)"
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
.toolbar {
  display: flex;
  justify-content: space-around;

  background-color: var(--light-blue);
  padding: 1rem;
}
.todo-list {
  padding-top: 2rem;
}
.todo-item {
  list-style: none;
  line-height: 150%;
}
</style>
