import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { Center, Collapse, HStack, Pressable, ScrollView, Text, View, VStack } from 'native-base'
import { useState } from 'react'
import { ITodo, todoStore } from '../data'
import { IconCheckCircle, IconCircleThin, IconStar, IconStarFill } from '../icons'
import { useTodoContextMenu } from './todo-context-menu'

// Todo 元素
const TodoItem = observer((props: { todo: ITodo; onOpenContext: (todo: ITodo) => void }) => {
  const { todo, onOpenContext } = props
  const [isShowDetail, setShowDetail] = useState(false)

  return (
    <VStack>
      <Pressable
        h="10"
        flexDirection="row"
        rounded="lg"
        _pressed={{ backgroundColor: 'gray.200' }}
        mt="2"
        mx="2"
        justifyContent="space-between"
        alignItems="center"
        key={todo.id}
        onLongPress={() => onOpenContext(todo)}
        onPress={() => setShowDetail((v) => !v)}
      >
        <HStack alignItems="center">
          <Pressable onPress={todo.toggleStatus} p="2">
            {todo.isCompleted ? (
              <IconCheckCircle size="5" color="blue.600" />
            ) : (
              <IconCircleThin size="5" color="gray.500" />
            )}
          </Pressable>
          <Text
            mx={2}
            strikeThrough={todo.isCompleted}
            fontWeight={todo.isCompleted ? '400' : '500'}
            color={todo.isCompleted ? 'gray.400' : undefined}
          >
            {todo.title}
          </Text>
        </HStack>
        <Pressable onPress={todo.toggleStar} p="2">
          {todo.isStarred ? <IconStarFill size="5" color="yellow.400" /> : <IconStar size="5" color="gray.500" />}
        </Pressable>
      </Pressable>
      <Collapse isOpen={isShowDetail} duration={200}>
        <VStack space="md" mt="1" p="4" rounded="md" m="4" bg="gray.200">
          <HStack justifyContent="space-between" alignItems="center">
            <Text color="gray.600">所在项目</Text>
            <Text fontWeight="500">{todo.project.title}</Text>
          </HStack>
          <HStack justifyContent="space-between" alignItems="center">
            <Text color="gray.600">截止时间</Text>
            <Text fontWeight="500">{dayjs().format('YYYY/MM/DD')}</Text>
          </HStack>
        </VStack>
      </Collapse>
    </VStack>
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
