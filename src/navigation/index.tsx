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
import FiltersScreen from '../screens/filters-screen'
import HomeScreen from '../screens/home-screen'
import PlanScreen from '../screens/plan-screen'
import RawContentScreen from '../screens/raw-content-screen'
import ReviewScreen from '../screens/review-screen'
import SearchScreen from '../screens/search-screen'
import SettingScreen from '../screens/setting-screen'
import TodoDetailScreen from '../screens/todo-detail-screen'

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createStackNavigator()

Stack

function RootNavigator() {
  return (
    <Stack.Navigator
      animation="slide_from_right"
      screenOptions={{
        headerShown: false,
        headerBackImage: () => <Ionicons name="arrow-back" size={24} style={{ paddingHorizontal: 10 }} color={Colors.dark20} />,
        gestureEnabled: true,
        ...TransitionPresets.SlideFromRightIOS,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Plan" options={{ headerShown: true, headerTitle: '计划', headerBackTitleVisible: false }} component={PlanScreen} />
      <Stack.Screen name="Search" options={{ headerShown: true, headerTitle: '搜索', headerBackTitleVisible: false }} component={SearchScreen} />
      <Stack.Screen name="Review" options={{ headerShown: true, headerTitle: '回顾', headerBackTitleVisible: false }} component={ReviewScreen} />
      <Stack.Screen name="Setting" options={{ headerShown: true, headerTitle: '设置', headerBackTitleVisible: false }} component={SettingScreen} />
      <Stack.Screen name="TodoDetail" options={{ headerShown: true, headerTitle: '详情', headerBackTitleVisible: false }} component={TodoDetailScreen} />
      <Stack.Screen name="RawContent" options={{ headerShown: true, headerTitle: '文件', headerBackTitleVisible: false }} component={RawContentScreen} />
      <Stack.Screen name="Filters" options={{ headerShown: true, headerTitle: '筛选', headerBackTitleVisible: false }} component={FiltersScreen} />
    </Stack.Navigator>
  )
}
