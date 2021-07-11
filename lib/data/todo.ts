import AsyncStorage from '@react-native-community/async-storage'
import { nanoid } from 'nanoid'
import { defineModule } from 'zoov'
import { persist } from 'zustand/middleware'

type Todo = {
  id: string
  title: string
  isCompleted: boolean
  isStarred: boolean
  projectIds: (string | 'inbox')[]
}

type Project = {
  id: string
  title: string
}

interface TodoState {
  todos: Todo[]
  currentProjectId: string | 'inbox'
  projects: Project[]
}

export const TodoStore = defineModule<TodoState>({ projects: [], currentProjectId: 'inbox', todos: [] })
  .actions({
    addTodo(state, title: string) {
      state.todos.push({
        title,
        isCompleted: false,
        id: nanoid(),
        isStarred: false,
        projectIds: [state.currentProjectId],
      })
    },
    deleteTodo(state, id: string) {
      state.todos = state.todos.filter((i) => i.id !== id)
    },
    moveTodo(state, todoId: string, toId: string) {
      const target = state.todos.find((i) => i.id === todoId)
      if (!target) return
      target.projectIds = target.projectIds.filter((i) => i !== state.currentProjectId)
      target.projectIds.push(toId)
    },
    addProject(state, title: string) {
      const id = nanoid()
      state.projects.push({ title, id })
      state.currentProjectId = id
    },
    setCurrentProjectId(state, projectId: string) {
      state.currentProjectId = projectId
    },
    toggleTodoStatus(state, id: string, status: boolean) {
      const target = state.todos.find((i) => i.id === id)
      if (target) target.isCompleted = status
    },
    toggleStar(state, id: string, starred: boolean) {
      const target = state.todos.find((i) => i.id === id)
      if (target) target.isStarred = starred
    },
  })
  .computed({
    currentTodos: (state) => state.todos.filter((i) => i.projectIds.includes(state.currentProjectId)),
    currentProject: (state) => state.projects.find((i) => i.id === state.currentProjectId) || null,
  })
  .middleware((store) =>
    persist(store, {
      name: 'todo-store',
      getStorage: () => AsyncStorage,
      version: 7,
      migrate: async () => ({ todos: [], projects: [{ title: '草稿箱', id: 'inbox' }], currentProjectId: 'inbox' }),
    })
  )
  .build()
