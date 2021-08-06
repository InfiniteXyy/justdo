import dayjs from 'dayjs'
import { getRoot, Instance, ISimpleType, types } from 'mobx-state-tree'
import { FilterType } from '../constant'
import { randomId } from './utils'

export const RepeatOptionNode = types
  .model('TodoRepeat', {
    todoId: types.string,
    repeat: types.optional(types.enumeration(['daily', 'weekly', 'monthly']), 'daily'),
    repeatInterval: types.optional(types.array(types.number), () => [1]),
    repeatEnd: types.maybeNull(types.string),
    repeatStart: types.optional(types.string, () => dayjs().toISOString()),
    modifiedDays: types.array(types.string),
  })
  .actions((self) => ({
    addModifiedDays(date: string) {
      self.modifiedDays.push(date)
    },
  }))

export const SubTodoNode = types
  .model('SubTodo', {
    title: types.string,
    isCompleted: types.optional(types.boolean, false),
  })
  .actions((self) => ({
    toggleStatus(isCompleted?: boolean) {
      if (typeof isCompleted === 'boolean') self.isCompleted = isCompleted
      else self.isCompleted = !self.isCompleted
    },
  }))

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
    createdAt: types.optional(types.string, () => dayjs().toISOString()),
    repeatOption: types.maybeNull(RepeatOptionNode),
    subTodos: types.array(SubTodoNode),
  })
  .actions((todo) => ({
    toggleStar: () => (todo.isStarred = !todo.isStarred),
    toggleArchive: () => (todo.isArchived = !todo.isArchived),
    toggleStatus: () => {
      todo.isCompleted = !todo.isCompleted
      if (todo.isCompleted) {
        todo.subTodos.forEach((i) => {
          i.toggleStatus(true)
        })
      }
    },
    addSubTodo: (title: string) => todo.subTodos.push(SubTodoNode.create({ title, isCompleted: false })),
    movePlan: (plan: FilterType) => (todo.plan = plan),
    remove: () => (getRoot(todo) as any).removeTodo(todo),
  }))

export type ITodo = Instance<typeof TodoNode>
