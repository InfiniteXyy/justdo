import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { PlanType, todoFilters } from '../../constant'
import { ITodo } from '../../data'
import { ModalMenu } from '../ui'

type ArrangeTodoModalRef = { open(todo: ITodo): void; close(): void }
export const ArrangeTodoModal = forwardRef<ArrangeTodoModalRef>((_props, ref) => {
  const todoRef = useRef<ITodo>()
  const [modalVisible, setModalVisible] = useState(false)

  useImperativeHandle(ref, () => ({
    open: (todo) => {
      todoRef.current = todo
      setModalVisible(true)
    },
    close: () => {
      setModalVisible(false)
    },
  }))

  return (
    <ModalMenu
      visible={modalVisible}
      setVisible={setModalVisible}
      title="安排到"
      menu={Object.entries(todoFilters).map(([key, value]) => ({
        iconName: value.icon,
        title: value.title,
        onPress: () => todoRef.current?.movePlan(key as PlanType),
        hidden: key.startsWith('archived'),
      }))}
    />
  )
})

export const ArrangeTodo = {
  current: null as ArrangeTodoModalRef | null,
  confirm(todo: ITodo) {
    this.current?.open(todo)
  },
  close() {
    this.current?.close()
  },
}
