import produce, { Draft } from 'immer'
import create from 'zustand'

type ActiveTodoState = {
  activeTodoId: string[]
  setActiveTodoId: (todoIds: string[]) => void
}

export const useActiveTodo = create<ActiveTodoState>((set) => ({
  activeTodoId: [],
  setActiveTodoId(todo) {
    set(
      produce((draft: Draft<ActiveTodoState>) => {
        draft.activeTodoId = todo
      })
    )
  },
}))
