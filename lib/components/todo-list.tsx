import { HStack, Pressable, ScrollView, Text, View } from 'native-base'
import { TodoStore } from '../data'
import { IconCheckCircle, IconCircleThin, IconStar, IconStarFill } from '../icons'
import { useTodoContextMenu } from './todo-context-menu'

export function TodoList() {
  const { toggleTodoStatus, toggleStar } = TodoStore.useActions()
  const { currentTodos: todos } = TodoStore.useComputed()
  const { open: openTodoContext, element: todoContext } = useTodoContextMenu()
  return (
    <View flexGrow={1}>
      <ScrollView flexGrow={1}>
        {todos.map((item) => (
          <Pressable
            h="10"
            flexDirection="row"
            rounded="lg"
            _pressed={{ backgroundColor: 'gray.200' }}
            mt="2"
            mx="2"
            px="2"
            justifyContent="space-between"
            alignItems="center"
            key={item.id}
            onPress={() => toggleTodoStatus(item.id, !item.isCompleted)}
            onLongPress={() => openTodoContext(item.id)}
          >
            <HStack alignItems="center">
              {item.isCompleted ? (
                <IconCheckCircle size="5" color="blue.600" />
              ) : (
                <IconCircleThin size="5" color="gray.500" />
              )}
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
              {item.isStarred ? <IconStarFill size="5" color="yellow.400" /> : <IconStar size="5" color="gray.500" />}
            </Pressable>
          </Pressable>
        ))}
      </ScrollView>
      {todoContext}
    </View>
  )
}
