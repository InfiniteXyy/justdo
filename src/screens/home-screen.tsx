import { Ionicons } from '@expo/vector-icons'
import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import { TodoList } from '../components'
import { useSubscribeHeaderRight } from '../hooks/use-header-right'

const Drawer = createDrawerNavigator()

export default function HomeScreen() {
  const headerRight = useSubscribeHeaderRight()
  return (
    <Drawer.Navigator
      initialRouteName="inbox"
      drawerType="back"
      screenOptions={{
        headerShown: true,
        headerRight: () => headerRight,
      }}
      sceneContainerStyle={{ backgroundColor: 'white' }}
    >
      <Drawer.Screen
        name="inbox"
        options={{
          title: '收集箱',
          drawerIcon: ({ color, size }) => <Ionicons name="ribbon" size={size} color={color} />,
        }}
        component={TodoList}
      />
      <Drawer.Screen
        name="filter/today"
        options={{
          title: '今日待办',
          drawerIcon: ({ color, size }) => <Ionicons name="today" size={size} color={color} />,
        }}
        component={TodoList}
      />
      <Drawer.Screen
        name="filter/next"
        options={{
          title: '下一步行动',
          drawerIcon: ({ color, size }) => <Ionicons name="server" size={size} color={color} />,
        }}
        component={TodoList}
      />
      <Drawer.Screen
        name="filter/tomorrow"
        options={{
          title: '明日待办',
          drawerIcon: ({ color, size }) => <Ionicons name="sunny" size={size} color={color} />,
        }}
        component={TodoList}
      />
      <Drawer.Screen
        name="filter/plan"
        options={{
          title: '日程',
          drawerIcon: ({ color, size }) => <Ionicons name="calendar" size={size} color={color} />,
        }}
        component={TodoList}
      />
      <Drawer.Screen
        name="filter/maybe"
        options={{
          title: '将来/也许',
          drawerIcon: ({ color, size }) => <Ionicons name="git-branch" size={size} color={color} />,
        }}
        component={TodoList}
      />
      <Drawer.Screen
        name="filter/wait"
        options={{
          title: '等待',
          drawerIcon: ({ color, size }) => <Ionicons name="hand-right" size={size} color={color} />,
        }}
        component={TodoList}
      />
    </Drawer.Navigator>
  )
}
