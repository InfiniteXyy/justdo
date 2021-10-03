import { useMutation, useQuery, useQueryClient } from 'react-query'
import { PlanType } from '../constant'
import { TodoType } from '../data'
import { useAPIConfig, useNotion } from '../hooks/use-api-config'
import { QueryKey } from './key'
import { getNotionProperties, parseNotionProperty } from './utils'

export function useTodos(params: { archived: boolean; plan?: PlanType }) {
  const notion = useNotion()
  const { databaseId } = useAPIConfig()
  return useQuery([QueryKey.todos, 'list', params], async () => {
    const { archived } = params
    console.log('fetching todos')
    const db = await notion.databases.query({ database_id: databaseId, page_size: 1000, archived })
    return db.results.map((i) => ({ id: i.id, ...parseNotionProperty(i.properties) })) as TodoType[]
  })
}

export function useUpdateTodo() {
  const client = useQueryClient()
  const notion = useNotion()
  return useMutation(
    async (params: TodoType) => {
      return await notion.pages.update({
        page_id: params.id,
        properties: getNotionProperties(params),
      })
    },
    {
      onSettled: () => {
        client.invalidateQueries()
      },
    }
  )
}

export function useArchiveTodo() {
  const client = useQueryClient()
  const notion = useNotion()
  return useMutation(
    async (params: TodoType & { archived: boolean }) => {
      return await notion.pages.update({
        page_id: params.id,
        properties: getNotionProperties(params),
        archived: params.archived,
      })
    },
    {
      onSettled: () => {
        client.invalidateQueries()
      },
    }
  )
}

export function useCreateTodo() {
  const client = useQueryClient()
  const { databaseId } = useAPIConfig()
  const notion = useNotion()

  return useMutation(
    async (todo: Omit<TodoType, 'id'>) => {
      return await notion.pages.create({
        parent: { database_id: databaseId },
        properties: getNotionProperties(todo),
      })
    },
    {
      onSettled: () => {
        client.invalidateQueries()
      },
    }
  )
}
