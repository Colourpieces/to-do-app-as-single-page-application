import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  const state = reactive({
    todos: [
      {
        description: 'Wäsche Waschen',
        done: true,
        id: 1
      },
      {
        description: 'learn Rest',
        done: true,
        id: 2
      },
      {
        description: 'learn Vue',
        done: false,
        id: 3
      }
    ],
    // todos: [],
    currentFilter: 'all'
  })

  async function loadFromBackend() {
    const resp = await fetch('http://localhost:4730/todos')
    const data = await resp.json()
    state.todos = data
    console.log(data)
  }

  // async function putTodo(id, todoLi) {
  //   const resp = await fetch("http://localhost:4730/todos/" + id, {
  //     method: "PUT",
  //     headers: { "Content-type": "application/json" },
  //     body: JSON.stringify(todoLi),
  //   });
  //   const todos = await resp.json();
  //   this.getToDos();
  // },

  // async function getAllTodos() {
  function getAllTodos() {
    // loadFromBackend()
    return state.todos
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
    getAllTodos,
    loadFromBackend
  }
})
