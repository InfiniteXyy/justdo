import { RouteProp, useRoute } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Text, View } from 'react-native-ui-lib'
import { TodoDetail } from '../components'
import { todoList } from '../data'

export default observer(function TodoDetailScreen() {
  const { params } = useRoute<RouteProp<{ TodoDetail: { todoId: string } }, 'TodoDetail'>>()
  const { todoId } = params
  const todo = todoList.todos.find((i) => i.id === todoId)

  if (todo) return <TodoDetail todo={todo} />
  return (
    <View center absF>
      <Text text50>404</Text>
      <Text text80>todoId: {todoId}</Text>
    </View>
  )
})
