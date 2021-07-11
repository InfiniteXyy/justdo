import AsyncStorage from '@react-native-community/async-storage'
import { getRoot, Instance, types } from 'mobx-state-tree'
import persist from 'mst-persist'
import { nanoid } from 'nanoid'

export type IProject = Instance<typeof Project>
const Project = types.model('Project', {
  id: types.identifier,
  title: types.string,
})

export type ITodo = Instance<typeof Todo>
const Todo = types
  .model('Todo', {
    id: types.identifier,
    title: types.string,
    isCompleted: types.boolean,
    isStarred: types.boolean,
    projectId: types.string,
  })
  .actions((todo) => ({
    toggleStar() {
      todo.isStarred = !todo.isStarred
    },
    moveTodo(targetProject: IProject) {
      todo.projectId = targetProject.id
    },
    toggleStatus() {
      todo.isCompleted = !todo.isCompleted
    },
    remove() {
      ;(getRoot(todo) as ITodoStore).deleteTodo(todo.id)
    },
  }))

export type ITodoStore = Instance<typeof TodoStore>
const TodoStore = types
  .model('TodoStore', {
    todos: types.array(Todo),
    projects: types.array(Project),
    activeProjectId: types.string,
  })
  .actions((state) => ({
    addTodo(title: string) {
      state.todos.push(
        Todo.create({
          title,
          isCompleted: false,
          id: nanoid(),
          isStarred: false,
          projectId: state.activeProjectId,
        })
      )
    },
    deleteTodo(id: string) {
      const target = state.todos.find((i) => i.id === id)
      target && state.todos.remove(target)
    },
    addProject(title: string) {
      const newProject = Project.create({ id: nanoid(), title })
      state.projects.push(newProject)
      state.activeProjectId = newProject.id
    },
    setActiveProject(project: IProject) {
      state.activeProjectId = project.id
    },
  }))
  .views((state) => ({
    get currentTodos() {
      return state.todos.filter((i) => i.projectId === state.activeProjectId)
    },
    get activeProject() {
      return state.projects.find((i) => i.id === state.activeProjectId)!
    },
  }))

const defaultProject = Project.create({ id: 'inbox', title: '草稿箱' })
export const todoStore = TodoStore.create({
  projects: [defaultProject],
  activeProjectId: defaultProject.id,
  todos: [],
})

persist('todo-store-mst', todoStore, {
  storage: AsyncStorage,
})
