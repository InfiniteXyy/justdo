import { Ionicons } from '@expo/vector-icons'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Colors, Text } from 'react-native-ui-lib'
import { todoFilters } from '../constant'
import { useHeader } from '../hooks/use-header'
import { useTodoListRoute } from '../hooks/use-todolist-route'

export function HeaderTitle() {
  const { currentKey } = useTodoListRoute()
  const headerTitle = useHeader((state) => state.headerLeft)
  if (headerTitle === undefined) {
    return (
      <Text text65 key={currentKey}>
        {todoFilters[currentKey]?.title}
      </Text>
    )
  }
  return headerTitle
}
export function HeaderRight() {
  return useHeader((state) => state.headerRight)
}
export function HeaderLeft() {
  const { isDrawerFixed, setDrawerFixed } = useTodoListRoute()
  const leftIcon = useHeader((state) => state.leftIcon)
  const navigation = useNavigation()
  if (leftIcon === undefined) {
    if (!isDrawerFixed)
      return (
        <TouchableOpacity
          style={{ paddingHorizontal: 20 }}
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Ionicons name="menu" size={24} color={Colors.dark20} />
        </TouchableOpacity>
      )
  }
  return leftIcon
}
