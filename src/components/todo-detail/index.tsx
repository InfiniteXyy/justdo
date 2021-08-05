import { Ionicons } from '@expo/vector-icons'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { Card, Colors, Text, View } from 'react-native-ui-lib'
import { ITodo } from '../../data'
import { Checkbox } from '../ui'

interface TodoDetailProps {
  todo: ITodo
}
export const TodoDetail = observer((props: TodoDetailProps) => {
  const { todo } = props
  const [subTodoText, setSubTodoText] = useState('')
  return (
    <View padding-20>
      <Card padding-20>
        <View row centerV marginB-10>
          <Checkbox checked={todo.isCompleted} onChange={todo.toggleStatus} />
          <Text text65 marginL-10>
            {todo.title}
          </Text>
        </View>
        {todo.description && (
          <Text text70 dark40>
            {todo.description}
          </Text>
        )}
        <View height={1} marginV-10 backgroundColor={Colors.dark80} />

        <View>
          {todo.subTodos.map((i, index) => (
            <View row centerV key={index} marginT-10>
              <Checkbox checked={i.isCompleted} onChange={i.toggleStatus} />
              <Text marginL-10>{i.title}</Text>
            </View>
          ))}
          <View row marginT-10>
            <Ionicons name="add" color={Colors.dark50} size={24} />
            <TextInput
              placeholder="添加子任务"
              style={{ marginLeft: 10 }}
              value={subTodoText}
              onChangeText={setSubTodoText}
              onSubmitEditing={() => {
                todo.addSubTodo(subTodoText)
                setSubTodoText('')
              }}
            />
          </View>
        </View>
      </Card>
    </View>
  )
})
