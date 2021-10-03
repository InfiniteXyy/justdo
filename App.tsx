import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Platform, UIManager } from 'react-native'
import 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import { Colors, View } from 'react-native-ui-lib'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ArrangeTodo, ArrangeTodoModal } from './src/components/arrange-todo'
import { useAPIConfig } from './src/hooks/use-api-config'
import useCachedResources from './src/hooks/use-cached-resources'
import Navigation from './src/navigation'
import NotionSettingScreen from './src/screens/notion-setting-screen'

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

const queryClient = new QueryClient({})

export default function App() {
  const isLoadingComplete = useCachedResources()

  const { databaseId } = useAPIConfig()

  function renderMain() {
    if (!databaseId) {
      return <NotionSettingScreen />
    }

    if (!isLoadingComplete) {
      return null
    }

    return (
      <View height="100%">
        <Navigation />
        <StatusBar />
        <Toast ref={(ref) => Toast.setRef(ref)} topOffset={40} autoHide />
        <ArrangeTodoModal ref={ArrangeTodo} />
      </View>
    )
  }

  return <QueryClientProvider client={queryClient}>{renderMain()}</QueryClientProvider>
}
