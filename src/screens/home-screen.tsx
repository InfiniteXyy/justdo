import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { Colors, Text, View } from 'react-native-ui-lib'
import { AddTodo, TodoList } from '../components'

export default function HomeScreen() {
  return (
    <View height="100%">
      <View row centerV spread marginH-20 marginV-15>
        <Text text50># Today</Text>
        <Ionicons name="search-circle-sharp" size={34} color={Colors.grey50} />
      </View>
      <TodoList />
      <AddTodo />
    </View>
  )
}
