import { TodoType } from '../data'

export function parseNotionProperty(properties: any): Omit<TodoType, 'id'> {
  return {
    description: properties.Description.rich_text[0].text.content,
    plan: properties.Plan.select.name,
    date: properties.Date.date,
    title: properties.Title.title[0].text.content,
    status: properties.Status.checkbox,
  }
}

export function getNotionProperties(todo: Omit<TodoType, 'id'>): any {
  return {
    Title: {
      type: 'title',
      title: [{ type: 'text', text: { content: todo.title } }],
    },
    Description: {
      type: 'rich_text',
      rich_text: [{ type: 'text', text: { content: todo.description || '' } }],
    },
    Status: {
      type: 'checkbox',
      checkbox: !!todo.status,
    },
    Plan: {
      type: 'select',
      select: { name: todo.plan },
    },
    Date: {
      type: 'date',
      date: todo.date ?? null,
    },
  }
}
