import dayjs from 'dayjs'
import { AllFilterType, todoFilters } from '../../constant'
import { TodoType } from '../../data'

export function filterTodos(todoList: TodoType[], currentKey: AllFilterType): { label: string; todos: TodoType[]; subLabel?: string }[] {
  const today = dayjs().startOf('d')
  if (currentKey === 'archived/finished') {
    return [{ label: '已完成', todos: todoList.filter((todo) => !!todo.status) }]
  }
  if (currentKey === 'archived/removed') {
    return [{ label: '已删除', todos: [] }]
  }
  if (currentKey === 'today') {
    return [{ label: '今日', todos: todoList.filter((todo) => todo.date && dayjs(todo.date.start).isSame(today)) }]
  }
  if (currentKey === 'calendar') {
    return [
      { label: '今日', todos: todoList.filter((todo) => todo.date && dayjs(todo.date.start).isSame(today)) },
      {
        label: '明日',
        todos: todoList.filter((i) => {
          const startAt = dayjs(i.date?.start)
          return startAt.isAfter(today) && startAt.isBefore(today.add(2, 'd'))
        }),
      },
      {
        label: '未来',
        todos: todoList.filter((i) => dayjs(i.date?.start).isAfter(today.add(2, 'd'))),
      },
    ]
  }
  const activeTodos = todoList.filter((i) => !i.status)
  if (currentKey.startsWith('plan')) {
    return [{ label: todoFilters[currentKey].title, todos: activeTodos.filter((i) => i.plan === currentKey && i.date === null) }]
  }
  return [{ label: '全部', todos: activeTodos }]
}
