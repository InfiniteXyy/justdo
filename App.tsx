import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform, UIManager } from 'react-native'
import 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { View } from 'react-native-ui-lib'
import { ArrangeTodo, ArrangeTodoModal } from './src/components/arrange-todo'
import useCachedResources from './src/hooks/use-cached-resources'
import Navigation from './src/navigation'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true)
  }
}

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <View height="100%">
        <Navigation />
        <StatusBar />
        <Toast ref={(ref) => Toast.setRef(ref)} topOffset={40} />
        <ArrangeTodoModal ref={ArrangeTodo} />
      </View>
    )
  }
}
