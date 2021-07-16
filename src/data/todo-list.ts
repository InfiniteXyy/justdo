import dayjs from 'dayjs'
import { Instance, types } from 'mobx-state-tree'
import { ProjectNode } from './project'
import { ITodo, TodoNode } from './todo'

export const TodoListNode = types
  .model('TodoList', {
    todos: types.array(TodoNode),
    projects: types.array(ProjectNode),
  })
  .actions((state) => ({
    addTodo(title: string, projectId?: string) {
      state.todos.push(TodoNode.create({ title, projectId }))
    },
    removeTodo(todo: ITodo) {
      state.todos.remove(todo)
    },
    addProject(title: string) {
      const newProject = ProjectNode.create({ id: dayjs().toISOString() + title, title })
      state.projects.push(newProject)
    },
  }))

export type ITodoList = Instance<typeof TodoListNode>
