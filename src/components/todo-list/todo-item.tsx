import { useNavigation } from '@react-navigation/native'
import * as Haptics from 'expo-haptics'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { LayoutAnimation, TouchableHighlight } from 'react-native'
import Toast from 'react-native-toast-message'
import { Chip, Colors, Text, View } from 'react-native-ui-lib'
import useEventCallback from 'use-event-callback'
import { ITodo } from '../../data'
import { Checkbox } from '../ui'
import { TodoItemOperations } from './todo-item.operations'

export const TodoItem = observer((props: { todo: ITodo }) => {
  const { todo } = props
  const navigation = useNavigation()

  const toggleStatus = useEventCallback(() => {
    LayoutAnimation.easeInEaseOut()
    todo.toggleStatus()
    if (todo.isCompleted) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      Toast.show({
        type: 'success',
        text1: '完成：' + todo.title,
        text2: '点击撤销',
        onPress: () => {
          LayoutAnimation.easeInEaseOut()
          todo.toggleStatus()
          Toast.hide()
        },
      })
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
  })

  return (
    <TodoItemOperations todo={todo}>
      <TouchableHighlight onPress={() => navigation.navigate('TodoDetail', { todoId: todo.id })}>
        <View paddingH-12 paddingV-10 row centerV bg-white width={'100%'}>
          <Checkbox checked={todo.isCompleted} onChange={toggleStatus} />
          <View marginH-10 flexG>
            <Text numberOfLines={1} text70 dark10={!todo.isCompleted} dark70={todo.isCompleted}>
              {todo.title}
            </Text>
            {todo.description && (
              <Text dark60 dark70={todo.isCompleted} text80 numberOfLines={1}>
                {todo.description}
              </Text>
            )}
          </View>
          {todo.subTodos.length > 0 && (
            <Chip
              label={`${todo.subTodos.filter((i) => i.isCompleted).length}/${todo.subTodos.length}`}
              labelStyle={{ color: Colors.white }}
              containerStyle={{ borderColor: Colors.dark60, backgroundColor: Colors.dark60 }}
            />
          )}
          {todo.repeatOption && (
            <Chip
              label={'重复任务'}
              labelStyle={{ color: Colors.white }}
              containerStyle={{ borderColor: Colors.green20, backgroundColor: Colors.green20 }}
            />
          )}
        </View>
      </TouchableHighlight>
    </TodoItemOperations>
  )
})
