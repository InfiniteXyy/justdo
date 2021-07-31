import { Ionicons } from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Text } from 'react-native-ui-lib'
import { todoFilters } from '../constant'
import { useHeader } from '../hooks/use-header'
import { useTodoListRoute } from '../hooks/use-todolist-route'

export function HeaderTitle() {
  const { currentKey } = useTodoListRoute()
  const headerTitle = useHeader((state) => state.headerLeft)
  if (headerTitle === undefined) {
    return <Text text65>{todoFilters[currentKey]?.title}</Text>
  }
  return headerTitle
}
export function HeaderRight() {
  return useHeader((state) => state.headerRight)
}
export function HeaderLeft() {
  const leftIcon = useHeader((state) => state.leftIcon)
  const navigation = useNavigation()
  if (leftIcon === undefined) {
    return (
      <TouchableOpacity
        style={{ paddingHorizontal: 20 }}
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Ionicons name="menu" size={24} />
      </TouchableOpacity>
    )
  }
  return leftIcon
}
