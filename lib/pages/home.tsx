import { Flex, View } from 'native-base'
import { SafeAreaView } from 'react-native'
import { AddTodo, HomeTitle, TodoList } from '../components'

export function Home() {
  return (
    <SafeAreaView>
      <Flex height="100%">
        <HomeTitle />
        <View px={4}>
          <AddTodo />
        </View>
        <TodoList />
      </Flex>
    </SafeAreaView>
  )
}
