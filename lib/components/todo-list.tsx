import { observer } from 'mobx-react-lite'
import { Center, HStack, Pressable, ScrollView, Text, View } from 'native-base'
import { ITodo, todoStore } from '../data'
import { IconCheckCircle, IconCircleThin, IconStar, IconStarFill } from '../icons'
import { useTodoContextMenu } from './todo-context-menu'

// Todo 元素
const TodoItem = observer((props: { todo: ITodo; onOpenContext: (todo: ITodo) => void }) => {
  const { todo, onOpenContext } = props
  return (
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
      key={todo.id}
      onPress={todo.toggleStatus}
      onLongPress={() => onOpenContext(todo)}
    >
      <HStack alignItems="center">
        {todo.isCompleted ? (
          <IconCheckCircle size="5" color="blue.600" />
        ) : (
          <IconCircleThin size="5" color="gray.500" />
        )}
        <Text
          mx={2}
          strikeThrough={todo.isCompleted}
          fontWeight={todo.isCompleted ? '400' : '500'}
          color={todo.isCompleted ? 'gray.400' : undefined}
        >
          {todo.title}
        </Text>
      </HStack>

      <Pressable onPress={todo.toggleStar}>
        {todo.isStarred ? <IconStarFill size="5" color="yellow.400" /> : <IconStar size="5" color="gray.500" />}
      </Pressable>
    </Pressable>
  )
})

// Todo 列表
export const TodoList = observer(() => {
  const { open: openTodoContext, element: todoContext } = useTodoContextMenu()
  return (
    <View flexGrow={1}>
      {todoStore.currentTodos.length === 0 ? (
        <Center flexGrow={1}>
          <Text fontSize="sm" color="gray.500">
            空空如也，快去创建待办吧
          </Text>
        </Center>
      ) : (
        <ScrollView flexGrow={1}>
          {todoStore.currentTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} onOpenContext={openTodoContext} />
          ))}
        </ScrollView>
      )}
      {todoContext}
    </View>
  )
})
