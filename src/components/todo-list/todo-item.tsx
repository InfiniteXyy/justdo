import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { TouchableHighlight } from 'react-native'
import { Chip, Colors, Text, View } from 'react-native-ui-lib'
import { ITodo } from '../../data'
import { Checkbox } from '../ui'
import { TodoItemOperations } from './todo-item.operations'

export const TodoItem = observer((props: { todo: ITodo }) => {
  const { todo } = props
  const navigation = useNavigation<any>()

  return (
    <TodoItemOperations todo={todo}>
      <TouchableHighlight onPress={() => navigation.navigate('TodoDetail', { todoId: todo.id })}>
        <View paddingH-12 paddingV-10 row centerV bg-white width={'100%'}>
          <Checkbox checked={todo.isCompleted} onChange={todo.toggleStatus} />
          <View marginH-10 flexS>
            <Text numberOfLines={1} text70 dark10={!todo.isCompleted} dark70={todo.isCompleted}>
              {todo.title}
            </Text>
            {todo.description && (
              <Text dark60 dark70={todo.isCompleted} text80 numberOfLines={1}>
                {todo.description}
              </Text>
            )}
          </View>
          <View flexG row right>
            {todo.subTodos.length > 0 && (
              <Chip
                label={`${todo.subTodos.filter((i) => i.isCompleted).length}/${todo.subTodos.length}`}
                labelStyle={{ color: Colors.white }}
                containerStyle={{ borderColor: Colors.dark60, backgroundColor: Colors.dark60 }}
              />
            )}
            {todo.repeatOption && <Ionicons name="timer-outline" color={Colors.green20} size={18} />}
          </View>
        </View>
      </TouchableHighlight>
    </TodoItemOperations>
  )
})
