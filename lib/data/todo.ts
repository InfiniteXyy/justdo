import AsyncStorage from '@react-native-community/async-storage'
import { nanoid } from 'nanoid'
import { defineModule } from 'zoov'
import { persist } from 'zustand/middleware'

type Todo = {
  id: string
  title: string
  isCompleted: boolean
}
interface TodoState {
  todos: Todo[]
}

export const TodoStore = defineModule<TodoState>({ todos: [] })
  .actions({
    addTodo: (state, title: string) => state.todos.push({ title, isCompleted: false, id: nanoid() }),
    deleteTodo: (state, id: string) => (state.todos = state.todos.filter((i) => i.id !== id)),
    toggleTodoStatus: (state, id: string, status: boolean) => {
      const target = state.todos.find((i) => i.id === id)
      if (target) target.isCompleted = status
    },
  })
  .middleware((store) =>
    persist(store, {
      whitelist: ['todos'],
      name: 'todo-store',
      getStorage: () => AsyncStorage,
      version: 4,
      migrate: async () => ({ todos: [] }),
    })
  )
  .build()
