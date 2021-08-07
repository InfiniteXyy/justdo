import { Ionicons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { now } from 'lodash'
import React, { forwardRef, useImperativeHandle, useRef, useState } from 'react'
import { Calendar } from 'react-native-calendars'
import { Colors } from 'react-native-ui-lib'
import { AllFilterType, todoFilters } from '../../constant'
import { ITodo } from '../../data'
import { Modal, ModalMenu } from '../ui'

type ArrangeTodoModalRef = { open(todo: ITodo): void; close(): void }
export const ArrangeTodoModal = forwardRef<ArrangeTodoModalRef>((_props, ref) => {
  const todoRef = useRef<ITodo>()
  const [modalVisible, setModalVisible] = useState(false)
  const [calendarVisible, setCalendarVisible] = useState(false)

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
    <>
      <ModalMenu
        visible={modalVisible}
        setVisible={setModalVisible}
        title="安排到"
        menu={Object.entries(todoFilters).map(([key, value]) => ({
          iconName: value.icon,
          title: value.title,
          onPress: () => {
            const todo = todoRef.current
            if (!todo) return
            const type = key as Exclude<AllFilterType, 'archived/finished' | 'archived/removed'>
            if (type === 'calendar') {
              setCalendarVisible(true)
            } else if (type === 'today') {
              todo.setStartAt(dayjs().startOf('d').toISOString())
            } else {
              todo.movePlan(type)
            }
          },
          hidden: key.startsWith('archived'),
        }))}
      />
      <Modal visible={calendarVisible} setVisible={setCalendarVisible} title="日程">
        <Calendar
          markedDates={{
            [dayjs().format('YYYY-MM-DD')]: { selected: true, selectedColor: Colors.dark40 },
          }}
          renderArrow={(direction) => (
            <Ionicons
              name={direction === 'right' ? 'chevron-forward' : 'chevron-back'}
              size={22}
              color={Colors.dark20}
            />
          )}
          minDate={now()}
          onDayPress={(day) => {
            const todo = todoRef.current
            todo?.setStartAt(dayjs(day.dateString).toISOString())
            setCalendarVisible(false)
          }}
          monthFormat={'yyyy 年 MM 月'}
          enableSwipeMonths={true}
        />
      </Modal>
    </>
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
