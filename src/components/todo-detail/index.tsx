import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Card, Text, View } from 'react-native-ui-lib'
import { ITodo } from '../../data'
import { Checkbox } from '../ui'

interface TodoDetailProps {
  todo: ITodo
}
export const TodoDetail = observer((props: TodoDetailProps) => {
  const { todo } = props
  return (
    <View padding-20>
      <Card padding-20>
        <View row centerV marginB-10>
          <Checkbox checked={todo.isCompleted} onChange={todo.toggleStatus} />
          <Text text65 marginL-10>
            {todo.title}
          </Text>
        </View>
        <InfoText>ID：{todo.id}</InfoText>
        <InfoText>创建于：{dayjs(todo.createdAt).format('YYYY/MM/DD')}</InfoText>
        <InfoText>计划时间：{todo.startAt ? dayjs(todo.startAt).format('YYYY/MM/DD') : '无'}</InfoText>
        <InfoText>收集箱：{todo.plan || '无'}</InfoText>
      </Card>
    </View>
  )
})

function InfoText(props: { children: React.ReactNode }) {
  return <Text grey20 marginT-4>{props.children}</Text>
}
