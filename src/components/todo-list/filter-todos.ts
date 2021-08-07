import dayjs from 'dayjs'
import { AllFilterType, todoFilters } from '../../constant'
import { ITodo, ITodoList } from '../../data'

export function filterTodos(
  todoList: ITodoList,
  currentKey: AllFilterType
): { label: string; todos: ITodo[]; subLabel?: string }[] {
  const today = dayjs().startOf('d')
  if (currentKey === 'archived/finished') {
    return [{ label: '已完成', todos: todoList.finishedTodos }]
  }
  if (currentKey === 'archived/removed') {
    return [{ label: '已删除', todos: todoList.archivedTodos }]
  }
  if (currentKey === 'today') {
    return [{ label: '今日', todos: todoList.todos.filter((i) => dayjs(i.startAt).isSame(today)) }]
  }
  if (currentKey === 'calendar') {
    return [
      { label: '今日', todos: todoList.todos.filter((i) => dayjs(i.startAt).isSame(today)) },
      {
        label: '明日',
        todos: todoList.todos.filter((i) => {
          const startAt = dayjs(i.startAt)
          return startAt.isAfter(today) && startAt.isBefore(today.add(2, 'd'))
        }),
      },
      {
        label: '未来',
        todos: todoList.todos.filter((i) => dayjs(i.startAt).isAfter(today.add(2, 'd'))),
        subLabel: '不包括重复任务',
      },
    ]
  }
  const activeTodos = todoList.todos.filter((i) => !i.isArchived && !i.isCompleted)
  if (currentKey.startsWith('plan')) {
    return [{ label: todoFilters[currentKey].title, todos: activeTodos.filter((i) => i.plan === currentKey) }]
  }
  return [{ label: '全部', todos: activeTodos }]
}
