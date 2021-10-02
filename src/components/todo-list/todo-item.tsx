import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native-ui-lib'
import { ITodo } from '../../data'
import { Checkbox } from '../ui'
import { TodoItemOperations } from './todo-item.operations'

export const TodoItem = observer((props: { todo: ITodo }) => {
  const { todo } = props
  const navigation = useNavigation<any>()

  return (
    <TodoItemOperations todo={todo}>
      <TouchableOpacity activeOpacity={1} onPress={() => navigation.navigate('TodoDetail', { todoId: todo.id })}>
        <View paddingH-12 paddingV-10 row centerV bg-white width={'100%'}>
          <Checkbox checked={todo.isCompleted} onChange={todo.toggleStatus} />
          <View marginH-10 flexS>
            <Text numberOfLines={1} text70 grey10={!todo.isCompleted} grey70={todo.isCompleted}>
              {todo.title}
            </Text>
            {todo.description && (
              <Text grey40 grey50={todo.isCompleted} text80 numberOfLines={1}>
                {todo.description}
              </Text>
            )}
          </View>
        </View>
      </TouchableOpacity>
    </TodoItemOperations>
  )
})
