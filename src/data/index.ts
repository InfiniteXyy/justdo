export * from './project'
export * from './todo'
export * from './todo-list'

import { datatype, lorem } from 'faker'
import { ProjectNode } from './project'
import { TodoNode } from './todo'
import { TodoListNode } from './todo-list'

const mockProjects = new Array(4).fill(null).map(() => ProjectNode.create({ title: lorem.word() }))

const mockTodos = new Array(50).fill(null).map(() =>
  TodoNode.create({
    title: lorem.words(3),
    description: lorem.sentence(),
    projectId: mockProjects[datatype.number(mockProjects.length - 1)].id,
    isCompleted: datatype.boolean(),
  })
)

export const todoList = TodoListNode.create({
  projects: mockProjects,
  todos: mockTodos,
})

// persist('todo-store-mst', todoList, {
//   storage: AsyncStorage,
// })
