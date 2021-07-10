import { useNavigation } from '@react-navigation/native'
import { Button, Flex, Heading, View } from 'native-base'
import React from 'react'
import { SafeAreaView } from 'react-native'
import { AddTodo, TodoList } from '../components'

export function Home() {
  const navigation = useNavigation()
  return (
    <SafeAreaView>
      <Flex h="100%">
        <Heading p="4">Todo App</Heading>
        <View px={4}>
          <AddTodo />
        </View>
        <TodoList />
        <Button onPress={() => navigation.navigate('About')}>About</Button>
      </Flex>
    </SafeAreaView>
  )
}
