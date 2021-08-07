import { getSnapshot, Instance, types } from 'mobx-state-tree'
import { PlanType } from '../constant'
import { ITodo, TodoNode } from './todo'

export const TodoListNode = types
  .model('TodoList', {
    _todos: types.array(TodoNode),
  })
  .actions((state) => ({
    addTodo(props: { title: string; plan: PlanType; description: string | null; startAt: string | null }) {
      state._todos.push(TodoNode.create(props))
    },
    removeTodo(todo: ITodo) {
      state._todos.remove(todo)
    },
    export() {
      return JSON.stringify(getSnapshot(state), null, 2)
    },
  }))
  .views((self) => ({
    get todos() {
      return self._todos
    },
  }))
  .views((self) => ({
    get finishedTodos() {
      return self._todos.filter((todo) => todo.isCompleted)
    },
    get archivedTodos() {
      return self._todos.filter((todo) => todo.isArchived)
    },
  }))

export type ITodoList = Instance<typeof TodoListNode>
