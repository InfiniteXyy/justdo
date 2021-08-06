import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { DrawerNavigator, HeaderLeft, HeaderRight, HeaderTitle, TodoList } from '../components'

const Drawer = createDrawerNavigator()

export default function HomeScreen() {
  return (
    <Drawer.Navigator
      initialRouteName="Root"
      drawerType="back"
      screenOptions={{
        headerShown: true,
        headerTitle: HeaderTitle,
        headerRight: HeaderRight,
        headerLeft: HeaderLeft,
      }}
      drawerContent={() => <DrawerNavigator />}
    >
      <Drawer.Screen name={'Root'} component={TodoList} />
    </Drawer.Navigator>
  )
}
