import { ref, computed, reactive } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', () => {
  const state = reactive({
    name: 'nicole'
  })

  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { state, count, doubleCount, increment }
})
