import { getRoot, Instance, ISimpleType, types } from 'mobx-state-tree'
import { FilterType } from '../constant'
import { randomId } from './utils'

export const TodoNode = types
  .model('Todo', {
    id: types.optional(types.identifier, randomId),
    title: types.string,
    description: types.maybeNull(types.string),
    isCompleted: types.optional(types.boolean, false),
    isArchived: types.optional(types.boolean, false),
    isStarred: types.optional(types.boolean, false),
    plan: types.optional<ISimpleType<FilterType>>(types.string as any, 'filter/inbox'),
    startAt: types.maybeNull(types.string),
  })
  .actions((todo) => ({
    toggleStar: () => (todo.isStarred = !todo.isStarred),
    toggleArchive: () => (todo.isArchived = !todo.isArchived),
    toggleStatus: () => (todo.isCompleted = !todo.isCompleted),
    movePlan: (plan: FilterType) => (todo.plan = plan),
    remove: () => (getRoot(todo) as any).removeTodo(todo),
  }))

export type ITodo = Instance<typeof TodoNode>
