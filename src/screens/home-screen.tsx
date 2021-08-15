import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { DrawerNavigator, HeaderLeft, HeaderRight, HeaderTitle, TodoList } from '../components'
import { useTodoListRoute } from '../hooks/use-todolist-route'

const Drawer = createDrawerNavigator()

export default function HomeScreen() {
  const isDrawerFixed = useTodoListRoute((state) => state.isDrawerFixed)
  return (
    <Drawer.Navigator
      initialRouteName="Root"
      {...(isDrawerFixed ? { drawerType: 'permanent', drawerStyle: { width: 60 } } : {})}
      screenOptions={{
        headerShown: true,
        headerTitle: HeaderTitle,
        headerRight: HeaderRight,
        headerLeft: HeaderLeft,
        headerTitleAlign: 'left',
      }}
      drawerContent={() => <DrawerNavigator />}
    >
      <Drawer.Screen name={'Root'} component={TodoList} />
    </Drawer.Navigator>
  )
}
