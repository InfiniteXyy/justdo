import { Ionicons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { over } from 'lodash'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { TouchableHighlight, TouchableOpacity } from 'react-native'
import { Colors, Drawer, Text, View } from 'react-native-ui-lib'
import { ITodo } from '../../data'
import { useActiveTodo } from '../../hooks/use-active-todo'

export const TodoItem = observer((props: { todo: ITodo }) => {
  const { todo } = props
  const { setActiveTodoId, activeTodoId } = useActiveTodo()
  const isActive = activeTodoId.indexOf(todo.id) !== -1
  const hasActive = activeTodoId.length > 0

  const toggleActivate = () => {
    setActiveTodoId([todo.id])
  }

  const toggleStatus = () => {
    if (todo.isCompleted) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    }
    todo.toggleStatus()
  }

  return (
    <Drawer
      leftItem={{ text: '完成', background: 'green' }}
      rightItems={[
        { text: '删除', background: 'red' },
        { text: '安排到', background: 'orange' },
      ]}
    >
      <TouchableHighlight onLongPress={over([Haptics.selectionAsync, toggleActivate])} delayLongPress={200}>
        <View paddingH-20 paddingV-10 row centerV bg-white width={'100%'}>
          <TouchableOpacity onPressIn={toggleStatus}>
            <Ionicons
              name={!todo.isCompleted ? 'radio-button-off' : 'checkmark-circle-sharp'}
              size={24}
              color={Colors.grey30}
            />
          </TouchableOpacity>
          <View marginH-10>
            <Text
              numberOfLines={1}
              text70
              dark10={hasActive ? isActive : !todo.isCompleted}
              dark70={hasActive ? hasActive && !isActive : todo.isCompleted}
              style={{
                textDecorationLine: todo.isCompleted ? 'line-through' : undefined,
              }}
            >
              {todo.title}
            </Text>
            {todo.description && (
              <Text dark60 dark70={todo.isCompleted} dark80={hasActive && !isActive} text80 numberOfLines={1}>
                {todo.description}
              </Text>
            )}
          </View>
        </View>
      </TouchableHighlight>
    </Drawer>
  )
})
