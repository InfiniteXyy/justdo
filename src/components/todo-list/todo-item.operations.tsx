import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Drawer } from 'react-native-ui-lib'
import { isIOS } from '../../constant'
import { ITodo } from '../../data'
import { ArrangeTodo } from '../arrange-todo'

export function TodoItemOperations(props: { todo: ITodo; children: JSX.Element }) {
  const { todo, children } = props

  if (isIOS) {
    return (
      <Drawer
        itemsMinWidth={70}
        rightItems={[
          {
            customElement: <Ionicons name="trash" color="white" size={18} />,
            background: 'red',
            onPress: todo.toggleArchive,
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
  } else {
    return children
  }
}
