import produce, { Draft } from 'immer'
import create from 'zustand'

type TodoListRouteState = {
  currentKey: string
  setCurrentKey: (key: string) => void
}

export const useTodoListRoute = create<TodoListRouteState>((set) => ({
  currentKey: 'inbox',
  setCurrentKey(key) {
    set(
      produce((draft: Draft<TodoListRouteState>) => {
        draft.currentKey = key
      })
    )
  },
}))
