import dayjs from 'dayjs'
import * as Haptics from 'expo-haptics'
import { over } from 'lodash'
import { getRoot, Instance, ISimpleType, types } from 'mobx-state-tree'
import { LayoutAnimation } from 'react-native'
import Toast from 'react-native-toast-message'
import { PlanType } from '../constant'
import { randomId } from './utils'

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
    plan: types.maybeNull<ISimpleType<PlanType>>(types.optional(types.string, 'plan/inbox') as any),
    startAt: types.maybeNull(types.string),
    createdAt: types.optional(types.string, () => dayjs().toISOString()),
  })
  .actions((todo) => ({
    setStartAt: (startAt: string | null) => {
      todo.startAt = startAt
      if (todo.startAt) {
        // 当拥有 开始时间后，就不会在几个默认的分类中了
        todo.plan = null
      }
    },
    toggleStar: () => (todo.isStarred = !todo.isStarred),
    toggleArchive() {
      LayoutAnimation.easeInEaseOut()
      todo.isArchived = !todo.isArchived
      if (todo.isArchived) {
        Toast.show({
          type: 'info',
          text1: '删除：' + todo.title,
          text2: '点击撤销',
          onPress: over(this.toggleArchive, Toast.hide),
        })
      }
    },
    toggleStatus() {
      LayoutAnimation.easeInEaseOut()
      todo.isCompleted = !todo.isCompleted
      if (todo.isCompleted) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
        Toast.show({
          type: 'success',
          text1: '完成：' + todo.title,
          text2: '点击撤销',
          onPress: over(this.toggleStatus, Toast.hide),
        })
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      }
    },
    movePlan: (plan: PlanType | null) => (todo.plan = plan),
    remove: () => (getRoot(todo) as any).removeTodo(todo),
  }))

export type ITodo = Instance<typeof TodoNode>
