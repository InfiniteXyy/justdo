import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform, UIManager } from 'react-native'
import 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { Colors, View } from 'react-native-ui-lib'
import { ArrangeTodo, ArrangeTodoModal } from './src/components/arrange-todo'
import useCachedResources from './src/hooks/use-cached-resources'
import Navigation from './src/navigation'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.tz.setDefault('China/Shanghai')

Colors.loadColors({
  primary: '#007AFF',
  blue10: Colors.rgba('#007AFF', 1),
  blue20: Colors.rgba('#007AFF', 0.3),
  blue30: Colors.rgba('#007AFF', 0.15),
  blue40: Colors.rgba('#007AFF', 0.08),
})

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
        <Toast ref={(ref) => Toast.setRef(ref)} topOffset={40} autoHide />
        <ArrangeTodoModal ref={ArrangeTodo} />
      </View>
    )
  }
}
