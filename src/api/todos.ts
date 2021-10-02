import dayjs from 'dayjs'
import { useMutation } from 'react-query'
import { AddTodoFormType } from '../components/add-todo/form.model'
import { useAPIConfig } from '../hooks/use-api-config'

export function useTodos() {}

export function useCreateTodo() {
  const { notion, databaseId } = useAPIConfig()

  return useMutation(async (todo: AddTodoFormType) => {
    await notion.pages.create({
      parent: { database_id: databaseId },
      properties: {
        标题: {
          type: 'title',
          title: [{ type: 'text', text: { content: todo.title } }],
        },
        创建时间: {
          type: 'date',
          date: {
            start: dayjs().toISOString(),
          },
        },
        完成情况: {
          type: 'checkbox',
          checkbox: false,
        },
        所属计划: {
          type: 'rich_text',
          rich_text: [{ type: 'text', text: { content: todo.plan } }],
        },
      },
    })
  })
}
