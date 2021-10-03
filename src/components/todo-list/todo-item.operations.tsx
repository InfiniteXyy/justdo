import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Drawer } from 'react-native-ui-lib'
import { useArchiveTodo } from '../../api'
import { isAndroid } from '../../constant'
import { TodoType } from '../../data'
import { ArrangeTodo } from '../arrange-todo'

export function TodoItemOperations(props: { todo: TodoType; children: JSX.Element }) {
  const { todo, children } = props

  const { mutateAsync: archiveTodo } = useArchiveTodo()
  if (isAndroid) return children
  return (
    <Drawer
      useNativeAnimations
      itemsMinWidth={70}
      rightItems={[
        {
          customElement: <Ionicons name="trash" color="white" size={18} />,
          background: 'red',
          onPress: () => archiveTodo({ ...todo, archived: true }),
        },
        {
          customElement: <Ionicons name="archive" color="white" size={18} />,
          background: 'orange',
          onPress: () => ArrangeTodo.confirm(todo),
        },
      ]}
    >
      {children}
    </Drawer>
  )
}
