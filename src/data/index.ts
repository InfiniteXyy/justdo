export * from './project'
export * from './todo'
export * from './todo-list'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { persist } from 'mst-persist'
import { ProjectNode } from './project'
import { TodoNode } from './todo'
import { TodoListNode } from './todo-list'

const mockProjects = [
  ProjectNode.create({ title: '学习计划' }),
  ProjectNode.create({ title: 'Justdo-plus' }),
  ProjectNode.create({ title: '工作' }),
  ProjectNode.create({ title: '生活' }),
]

const mockTodos = [
  TodoNode.create({
    title: '机器学习上手',
    description: '根据时间和地点推荐下一个完成的任务，数据源怎么办？',
    projectId: mockProjects[0].id,
  }),
  TodoNode.create({ title: '学习 Vue3', projectId: mockProjects[0].id }),
  TodoNode.create({ title: '尝试一下 reanimated', projectId: mockProjects[0].id }),
  TodoNode.create({ title: '刷一个 LeetCode', projectId: mockProjects[0].id }),
  TodoNode.create({ title: '学习一下图表', description: '用图表来展示个人OKR？', projectId: mockProjects[0].id }),
  TodoNode.create({ title: '增加优先级功能', projectId: mockProjects[1].id }),
  TodoNode.create({ title: '增加重复事件功能', projectId: mockProjects[1].id }),
  TodoNode.create({ title: '拖曳交互，管理所有Todo', projectId: mockProjects[1].id }),
  TodoNode.create({ title: '筛选Tag功能', projectId: mockProjects[1].id }),
]

export const todoList = TodoListNode.create({
  projects: mockProjects,
  todos: mockTodos,
})

persist('todo-store-mst', todoList, {
  storage: AsyncStorage,
})
