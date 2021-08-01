import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import * as Haptics from 'expo-haptics'
import { over } from 'lodash'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { ToastAndroid, TouchableHighlight, TouchableOpacity } from 'react-native'
import { Colors, Text, View } from 'react-native-ui-lib'
import { ITodo } from '../../data'
import { useActiveTodo } from '../../hooks/use-active-todo'

export const TodoItem = observer((props: { todo: ITodo }) => {
  const { todo } = props
  const { setActiveTodoId, activeTodoId } = useActiveTodo()
  const isActive = activeTodoId.indexOf(todo.id) !== -1
  const hasActive = activeTodoId.length > 0

  const toggleActivate = () => {
    if (!activeTodoId.includes(todo.id)) setActiveTodoId([...activeTodoId, todo.id])
    else setActiveTodoId(activeTodoId.filter((i) => i !== todo.id))
  }

  const onMarkInstant = () => {
    ToastAndroid.show('标记为紧急任务', 300)
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
    <TouchableHighlight
      onLongPress={hasActive ? undefined : over([Haptics.selectionAsync, toggleActivate])}
      delayLongPress={200}
      onPress={hasActive ? toggleActivate : undefined}
    >
      <View paddingH-20 paddingV-10 row centerV bg-white width={'100%'}>
        {!hasActive ? (
          <TouchableOpacity onPressIn={toggleStatus}>
            <Ionicons
              name={!todo.isCompleted ? 'radio-button-off' : 'checkmark-circle-sharp'}
              size={24}
              color={Colors.grey30}
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onMarkInstant}>
            <MaterialIcons name={'flash-on'} size={24} color={Colors.yellow40} />
          </TouchableOpacity>
        )}
        <View marginH-10>
          <Text
            numberOfLines={1}
            text70
            dark10={hasActive ? isActive : !todo.isCompleted}
            dark70={hasActive ? hasActive && !isActive : todo.isCompleted}
            style={{
              textDecorationLine: todo.isCompleted ? 'line-through' : undefined,
              fontWeight: isActive ? 'bold' : undefined,
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
  )
})
