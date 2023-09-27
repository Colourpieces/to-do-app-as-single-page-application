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

const filteroptions = [
  {
    label: 'alle',
    value: 'all',
    description: 'alle anzeigen',
    category: '1'
  },
  {
    label: 'offen',
    value: 'open',
    description: 'offene anzeigen',
    category: '1'
  },
  {
    label: 'erledigt',
    value: 'done',
    description: 'erledigte anzeigen',
    category: '1'
  }
]

const selection = ref()
</script>

<template>
  <div class="toolbar">
    <form>
      <q-input
        filled
        v-model="newTodo"
        label="neue Aufgabe"
        placeholder="du schaffst das!"
        :dense="true"
        clearable
      />

      <q-btn push color="primary" icon="add" @click.prevent="onAddTodo()" type="submit" />
    </form>
    <q-btn
      push
      color="primary"
      label="Erledigte löschen"
      @click="todoStore.deleteDoneTodos()"
      id="btn-delete-done"
    />

    <q-btn
      push
      color="primary"
      label="Alle löschen"
      @click="todoStore.deleteAllTodos()"
      id="btn-delete-all"
    />

    <q-select
      v-model="todoStore.state.currentFilter"
      :options="filteroptions"
      label="Filter"
      filled
      dense
      style="min-width: 20ch"
    />
  </div>
</template>

<style scoped>
form {
  display: flex;
  justify-content: center;
}
.toolbar {
  display: flex;
  justify-content: space-around;

  /* background-color: var(--light-blue); */
  padding: 1rem;
}
</style>
