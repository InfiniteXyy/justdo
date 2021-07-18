import { getRoot, Instance, types } from 'mobx-state-tree'
import { ITodo } from './todo'
import { randomId } from './utils'

export const ProjectNode = types
  .model('Project', {
    id: types.optional(types.identifier, randomId),
    title: types.string,
  })
  .views((project) => ({
    get todos(): ITodo[] {
      return (getRoot(project) as any).todos
        .filter((i: any) => i.projectId === project.id)
        .sort((i: any) => (i.isCompleted ? 1 : -1))
    },
    get status(): { unfinished: number; total: number } {
      return {
        unfinished: (project as any).todos.filter((i: any) => !i.isCompleted).length,
        total: (getRoot(project) as any).todos.length,
      }
    },
  }))

export type IProject = Instance<typeof ProjectNode>
