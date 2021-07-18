import React from 'react'
import { Platform, SafeAreaView as RNSafeArea } from 'react-native'
import { SafeAreaView as SafeArea } from 'react-native-safe-area-context'
import { View } from 'react-native-ui-lib'
import { AddTodo, SearchTodo, TodoList } from '../components'

const SafeAreaView = Platform.select({ ios: RNSafeArea }) || SafeArea

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <View height="100%">
        <SearchTodo />
        <TodoList />
        <AddTodo />
      </View>
    </SafeAreaView>
  )
}
