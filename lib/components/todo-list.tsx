import { Checkbox, CloseIcon, HStack, IconButton, ScrollView, Text } from 'native-base'
import React from 'react'
import { TodoStore } from '../data'

export function TodoList() {
  const [{ todos }, { toggleTodoStatus, deleteTodo }] = TodoStore.use()
  return (
    <ScrollView flex={1} pt="4">
      {todos.map((item) => (
        <HStack w="100%" px="4" justifyContent="space-between" alignItems="center" key={item.id}>
          <Checkbox
            colorScheme="emerald"
            isChecked={item.isCompleted}
            onChange={() => toggleTodoStatus(item.id, !item.isCompleted)}
            value={item.title}
            aria-label="check"
          >
            <Text mx={2} strikeThrough={item.isCompleted}>
              {item.title}
            </Text>
          </Checkbox>
          <IconButton icon={<CloseIcon size={5} />} onPress={() => deleteTodo(item.id)} />
        </HStack>
      ))}
    </ScrollView>
  )
}
