import React from 'react'
import { Text, View } from 'react-native-ui-lib'
import { useUpdateTodo } from '../../api'
import { TodoType } from '../../data'
import { Checkbox, Spinner } from '../ui'
import { TodoItemOperations } from './todo-item.operations'

export const TodoItem = (props: { todo: TodoType }) => {
  const { mutateAsync: updateTodo, isLoading } = useUpdateTodo()
  const { todo } = props

  return (
    <TodoItemOperations todo={todo}>
      <View paddingH-12 paddingV-10 row centerV bg-white width={'100%'}>
        {isLoading ? <Spinner margin={4} /> : <Checkbox checked={!!todo.status} onChange={() => updateTodo({ ...todo, status: !todo.status })} />}
        <View marginH-10 flexS>
          <Text numberOfLines={1} text70 grey10={!todo.status} grey50={todo.status}>
            {String(todo.title)}
          </Text>
          {!!todo.description && (
            <Text grey40 grey50={todo.status} text80 numberOfLines={1}>
              {String(todo.description)}
            </Text>
          )}
        </View>
      </View>
    </TodoItemOperations>
  )
}
