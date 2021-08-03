import { Instance, types } from 'mobx-state-tree'
import { FilterType } from '../constant'
import { ITodo, TodoNode } from './todo'

export const TodoListNode = types
  .model('TodoList', {
    todos: types.array(TodoNode),
  })
  .actions((state) => ({
    addTodo(props: { title: string; plan: FilterType; description: string | null; startAt: string | null }) {
      state.todos.push(TodoNode.create(props))
    },
    removeTodo(todo: ITodo) {
      state.todos.remove(todo)
    },
  }))
  .views((self) => ({
    get finishedTodos() {
      return self.todos.filter((todo) => todo.isCompleted)
    },
    get archivedTodos() {
      return self.todos.filter((todo) => todo.isArchived)
    },
  }))

export type ITodoList = Instance<typeof TodoListNode>
