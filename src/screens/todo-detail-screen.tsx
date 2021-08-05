import { RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import { TodoDetail } from '../components'
import { ITodo } from '../data'

export default function TodoDetailScreen() {
  const { params } = useRoute<RouteProp<{ TodoDetail: { todo: ITodo } }, 'TodoDetail'>>()

  const { todo } = params
  return <TodoDetail todo={todo} />
}
