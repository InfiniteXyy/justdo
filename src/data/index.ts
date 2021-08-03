export * from './todo'
export * from './todo-list'

import { TodoNode } from './todo'
import { TodoListNode } from './todo-list'

const mockTodos = [
  TodoNode.create({
    title: '机器学习上手',
    description: '根据时间和地点推荐下一个完成的任务，数据源怎么办？',
  }),
  TodoNode.create({ title: '学习 Vue3' }),
  TodoNode.create({ title: '尝试一下 reanimated' }),
  TodoNode.create({ title: '刷一个 LeetCode' }),
  TodoNode.create({ title: '学习一下图表', description: '用图表来展示个人OKR？' }),
  TodoNode.create({ title: '增加优先级功能' }),
  TodoNode.create({ title: '增加重复事件功能' }),
  TodoNode.create({ title: '拖曳交互，管理所有Todo' }),
  TodoNode.create({ title: '筛选Tag功能' }),
]

export const todoList = TodoListNode.create({
  todos: mockTodos,
})

// persist('todo-store-mst', todoList, {
//   storage: AsyncStorage,
// })
