/**
 * If you are not familiar with React Navigation, check out the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import HomeScreen from '../screens/home-screen'
import PlanScreen from '../screens/plan-screen'
import ReviewScreen from '../screens/review-screen'
import SearchScreen from '../screens/search-screen'

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  )
}

const Stack = createStackNavigator()

function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Plan" options={{ headerShown: true, headerTitle: '计划' }} component={PlanScreen} />
      <Stack.Screen name="Search" options={{ headerShown: true, headerTitle: '搜索' }} component={SearchScreen} />
      <Stack.Screen name="Review" options={{ headerShown: true, headerTitle: '回顾' }} component={ReviewScreen} />
    </Stack.Navigator>
  )
}
