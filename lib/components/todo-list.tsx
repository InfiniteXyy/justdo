import { HStack, Pressable, ScrollView, Text, View, VStack } from 'native-base'
import { TodoStore } from '../data'
import { IconCheckCircle, IconCircleThin, IconStar, IconStarFill } from '../icons'
import { useTodoContextMenu } from './todo-context-menu'

function FinishStatus() {
  const { currentTodos: todos } = TodoStore.useComputed()
  return (
    <VStack position="absolute" bottom="2" width="100%" alignItems="center" safeAreaBottom={4}>
      <Text fontSize="sm" color="gray.700">
        未完成：{todos.filter((i) => !i.isCompleted).length}
      </Text>
      <Text fontSize="xs" color="gray.400" mt="1">
        已完成：{todos.filter((i) => i.isCompleted).length}
      </Text>
    </VStack>
  )
}
export function TodoList() {
  const { toggleTodoStatus, toggleStar } = TodoStore.useActions()
  const { currentTodos: todos } = TodoStore.useComputed()
  const { open: openTodoContext, element: todoContext } = useTodoContextMenu()
  return (
    <View flexGrow={1}>
      <ScrollView flexGrow={1}>
        {todos.map((item) => (
          <Pressable
            key={item.id}
            onPress={() => toggleTodoStatus(item.id, !item.isCompleted)}
            onLongPress={() => openTodoContext(item.id)}
          >
            <HStack h="10" w="100%" mt="2" px="4" justifyContent="space-between" alignItems="center">
              <HStack alignItems="center">
                {item.isCompleted ? <IconCheckCircle size="5" color="blue.600" /> : <IconCircleThin size="5" />}
                <Text
                  mx={2}
                  strikeThrough={item.isCompleted}
                  fontWeight={item.isCompleted ? '400' : '500'}
                  color={item.isCompleted ? 'gray.400' : undefined}
                >
                  {item.title}
                </Text>
              </HStack>

              <Pressable onPress={() => toggleStar(item.id, !item.isStarred)}>
                {item.isStarred ? <IconStarFill size="5" color="yellow.400" /> : <IconStar size="5" />}
              </Pressable>
            </HStack>
          </Pressable>
        ))}
      </ScrollView>
      <FinishStatus />
      {todoContext}
    </View>
  )
}
