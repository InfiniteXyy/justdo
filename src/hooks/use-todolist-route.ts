import AsyncStorage from '@react-native-async-storage/async-storage'
import produce, { Draft } from 'immer'
import create from 'zustand'
import { persist } from 'zustand/middleware'
import { AllFilterType } from '../constant'

type TodoListRouteState = {
  currentKey: AllFilterType
  setCurrentKey: (key: AllFilterType) => void
  isDrawerFixed: boolean
  setDrawerFixed: (fixed: boolean) => void
}

export const useTodoListRoute = create(
  persist<TodoListRouteState>(
    (set) => ({
      currentKey: 'today',
      isDrawerFixed: false,
      setDrawerFixed(fixed) {
        set(
          produce((draft: Draft<TodoListRouteState>) => {
            draft.isDrawerFixed = fixed
          })
        )
      },
      setCurrentKey(key) {
        set(
          produce((draft: Draft<TodoListRouteState>) => {
            draft.currentKey = key
          })
        )
      },
    }),
    { name: 'todo-list-route', whitelist: ['isDrawerFixed', 'currentKey'], getStorage: () => AsyncStorage }
  )
)
