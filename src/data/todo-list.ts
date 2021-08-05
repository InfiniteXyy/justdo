import { Instance, types } from 'mobx-state-tree'
import { FilterType } from '../constant'
import { ITodo, TodoNode } from './todo'

export const TodoListNode = types
  .model('TodoList', {
    _todos: types.array(TodoNode),
  })
  .actions((state) => ({
    addTodo(props: { title: string; plan: FilterType; description: string | null; startAt: string | null }) {
      state._todos.push(TodoNode.create(props))
    },
    removeTodo(todo: ITodo) {
      state._todos.remove(todo)
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
