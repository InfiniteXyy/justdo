import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { HStack, Progress, Text, VStack } from 'native-base'
import { Pressable } from 'react-native'
import { IProject, todoStore } from '../data'

export const ProjectCover = observer((props: { project: IProject }) => {
  const { project } = props

  const navigation = useNavigation()

  const todos = todoStore.todos.filter((todo) => todo.projectId === project.id)
  const finished = todos.filter((i) => i.isCompleted).length
  const total = todos.length

  return (
    <Pressable
      onPress={() => {
        navigation.navigate('Home')
        todoStore.setActiveProject(project)
      }}
    >
      <VStack rounded="md" bg="blue.100" justifyContent="space-between">
        <HStack p="4" py="6" justifyContent="space-between">
          <Text fontSize="md" fontWeight="500">
            {project.title}
          </Text>
          <Text fontSize="xs" color="gray.500">
            已完成 {finished} / {total}
          </Text>
        </HStack>
        <Progress value={(finished / total) * 100} w="100%" size="xs" colorScheme="blue" />
      </VStack>
    </Pressable>
  )
})
