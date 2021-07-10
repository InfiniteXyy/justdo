import { CheckIcon, Input, View } from 'native-base'
import React, { useState } from 'react'
import { TodoStore } from '../data'

export function AddTodo() {
  const { addTodo } = TodoStore.useActions()
  const [content, setContent] = useState('')

  const handleAdd = () => {
    if (content === '') return
    setContent('')
    addTodo(content)
  }

  return (
    <View>
      <Input
        variant="filled"
        InputRightElement={<CheckIcon size={6} ml={1} onPress={handleAdd} mr={2} />}
        onChangeText={setContent}
        value={content}
        placeholder="Add Item"
      />
    </View>
  )
}
