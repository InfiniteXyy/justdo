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
import AboutScreen from '../screens/about-screen'
import HomeScreen from '../screens/home-screen'
import NotionSettingScreen from '../screens/notion-setting-screen'
import SettingScreen from '../screens/setting-screen'

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
      <Stack.Screen name="About" options={{ headerShown: true, headerTitle: '关于', headerBackTitleVisible: false }} component={AboutScreen} />
      <Stack.Screen
        name="Notion"
        options={{ headerShown: true, headerTitle: 'Notion 接入设置', headerBackTitleVisible: false }}
        component={NotionSettingScreen}
      />
    </Stack.Navigator>
  )
}
