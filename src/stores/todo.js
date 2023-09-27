import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  const state = reactive({
    todos: [],
    currentFilter: 'all'
  })

  // async function loadFromBackend() {
  //   const resp = await fetch('http://localhost:4730/todos')
  //   const data = await resp.json()
  //   state.todos = data
  // }

  async function getAllTodos() {
    // loadFromBackend()
    const resp = await fetch('http://localhost:4730/todos')
    const data = await resp.json()
    state.todos = data
    // return state.todos
  }

  async function putTodo(id, todoLi) {
    const resp = await fetch('http://localhost:4730/todos/' + id, {
      method: 'PUT',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(todoLi)
    })
    const todos = await resp.json()
    getAllTodos()
  }

  async function postTodo(todoLi) {
    const resp = await fetch('http://localhost:4730/todos/', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(todoLi)
    })
    const newTodo = await resp.json()
    getAllTodos()
  }

  async function deleteTodo(id) {
    const resp = await fetch('http://localhost:4730/todos/' + id, {
      method: 'DELETE',
      headers: { 'Content-type': 'application/json' }
    })
    const data = await resp.json() //nur um zu prüfen ob HTTP Status ok ggf Fehlerhandling
    getAllTodos()
  }

  function deleteDoneTodos() {
    state.todos.forEach((currentTodo) => {
      if (currentTodo.done === true) {
        deleteTodo(currentTodo.id)
      }
    })
    getAllTodos()
  }

  function deleteAllTodos() {
    state.todos.forEach((currentTodo) => {
      deleteTodo(currentTodo.id)
    })
    getAllTodos()
  }

  function isDuplicate(todoDescription) {
    for (let i = 0; i < state.todos.length; i++) {
      const currentTodo = state.todos[i]
      if (currentTodo.description.toLowerCase() === todoDescription.toLowerCase()) {
        return true
      }
    }
    return false
  }

  const filteredTodos = computed(() => {
    if (state.currentFilter === 'done') {
      return state.todos.filter((todoItem) => todoItem.done === true)
    }

    if (state.currentFilter === 'open') {
      return state.todos.filter((todoItem) => todoItem.done === false)
    }
    return state.todos
  })

  return {
    state,
    filteredTodos,
    isDuplicate,
    postTodo,
    getAllTodos,
    // loadFromBackend,
    putTodo,
    deleteTodo,
    deleteDoneTodos,
    deleteAllTodos
  }
})
