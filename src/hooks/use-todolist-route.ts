import produce, { Draft } from 'immer'
import create from 'zustand'
import { AllFilterType } from '../constant'

type TodoListRouteState = {
  currentKey: AllFilterType
  setCurrentKey: (key: AllFilterType) => void
}

export const useTodoListRoute = create<TodoListRouteState>((set) => ({
  currentKey: 'filter/inbox',
  setCurrentKey(key) {
    set(
      produce((draft: Draft<TodoListRouteState>) => {
        draft.currentKey = key
      })
    )
  },
}))
