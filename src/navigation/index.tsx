/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
import React from 'react'
import { Colors } from 'react-native-ui-lib'
import { QueryClient, QueryClientProvider } from 'react-query'
import AboutScreen from '../screens/about-screen'
import HomeScreen from '../screens/home-screen'
import SettingScreen from '../screens/setting-screen'
import TodoDetailScreen from '../screens/todo-detail-screen'

const queryClient = new QueryClient({})
export default function Navigation() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  )
}

const Stack = createStackNavigator()

function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerBackImage: () => <Ionicons name="arrow-back" size={24} style={{ paddingHorizontal: 10 }} color={Colors.grey20} />,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Setting" options={{ headerShown: true, headerTitle: '设置', headerBackTitleVisible: false }} component={SettingScreen} />
      <Stack.Screen name="TodoDetail" options={{ headerShown: true, headerTitle: '详情', headerBackTitleVisible: false }} component={TodoDetailScreen} />
      <Stack.Screen name="About" options={{ headerShown: true, headerTitle: '关于', headerBackTitleVisible: false }} component={AboutScreen} />
    </Stack.Navigator>
  )
}
