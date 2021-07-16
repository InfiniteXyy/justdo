import { getRoot, Instance, types } from 'mobx-state-tree'
import { IProject } from './project'
import { randomId } from './utils'

export const TodoNode = types
  .model('Todo', {
    id: types.optional(types.identifier, randomId),
    title: types.string,
    description: types.maybeNull(types.string),
    projectId: types.maybeNull(types.string),
    isCompleted: types.optional(types.boolean, false),
    isStarred: types.optional(types.boolean, false),
  })
  .actions((todo) => ({
    toggleStar: () => (todo.isStarred = !todo.isStarred),
    moveTodo: (targetProjectId: string) => (todo.projectId = targetProjectId),
    toggleStatus: () => (todo.isCompleted = !todo.isCompleted),
    remove: () => (getRoot(todo) as any).removeTodo(todo),
  }))
  .views((todo) => ({
    get project(): IProject {
      return (getRoot(todo) as any).projects.find((i: any) => i.id === todo.projectId)
    },
  }))

export type ITodo = Instance<typeof TodoNode>
