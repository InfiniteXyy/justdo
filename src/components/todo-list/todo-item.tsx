import { useNavigation } from '@react-navigation/native'
import * as Haptics from 'expo-haptics'
import { over } from 'lodash'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { LayoutAnimation, TouchableHighlight } from 'react-native'
import Toast from 'react-native-toast-message'
import { Chip, Colors, Drawer, Text, View } from 'react-native-ui-lib'
import useEventCallback from 'use-event-callback'
import { ITodo } from '../../data'
import { useActiveTodo } from '../../hooks/use-active-todo'
import { ArrangeTodo } from '../arrange-todo'
import { Checkbox } from '../ui'

export const TodoItem = observer((props: { todo: ITodo }) => {
  const { todo } = props
  const navigation = useNavigation()
  const { setActiveTodoId, activeTodoId } = useActiveTodo()
  const isActive = activeTodoId.indexOf(todo.id) !== -1
  const hasActive = activeTodoId.length > 0

  const toggleActivate = useEventCallback(() => {
    setActiveTodoId([todo.id])
  })

  const toggleStatus = useEventCallback(() => {
    LayoutAnimation.spring()
    todo.toggleStatus()
    if (todo.isCompleted) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
      Toast.show({
        type: 'success',
        text1: '完成：' + todo.title,
        text2: '点击撤销',
        onPress: () => {
          LayoutAnimation.spring()
          todo.toggleStatus()
          Toast.hide()
        },
      })
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
  })

  return (
    <Drawer
      rightItems={[
        { text: '删除', background: 'red', onPress: todo.toggleArchive },
        { text: '安排到', background: 'orange', onPress: () => ArrangeTodo.confirm(todo) },
      ]}
    >
      <TouchableHighlight
        onLongPress={over([Haptics.selectionAsync, toggleActivate])}
        onPress={() => navigation.navigate('TodoDetail', { todo })}
        delayLongPress={200}
      >
        <View paddingH-20 paddingV-10 row centerV bg-white width={'100%'}>
          <Checkbox checked={todo.isCompleted} onChange={toggleStatus} />
          <View marginH-10 flexG>
            <Text
              numberOfLines={1}
              text70
              dark10={hasActive ? isActive : !todo.isCompleted}
              dark70={hasActive ? hasActive && !isActive : todo.isCompleted}
            >
              {todo.title}
            </Text>
            {todo.description && (
              <Text dark60 dark70={todo.isCompleted} dark80={hasActive && !isActive} text80 numberOfLines={1}>
                {todo.description}
              </Text>
            )}
          </View>
          {todo.repeatOption && (
            <Chip
              label={'重复任务'}
              labelStyle={{ color: Colors.white }}
              containerStyle={{ borderColor: Colors.green20, backgroundColor: Colors.green20 }}
            />
          )}
        </View>
      </TouchableHighlight>
    </Drawer>
  )
})
