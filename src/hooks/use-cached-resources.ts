import * as SplashScreen from 'expo-splash-screen'
import React from 'react'
import { LocaleConfig } from 'react-native-calendars'

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false)

  // Load any resources or data that we need prior to rendering the app
  React.useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync()
        // prettier-ignore
        LocaleConfig.locales['zh'] = {
          monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          monthNamesShort: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
          dayNames: ['周日', '周一', '周二', '周三', '周四', '周五', '周六', ],
          dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六', ],
          today: '今天',
        }
        LocaleConfig.defaultLocale = 'zh'
      } catch (e) {
        console.warn(e)
      } finally {
        setLoadingComplete(true)
        SplashScreen.hideAsync()
      }
    }

    loadResourcesAndDataAsync()
  }, [])

  return isLoadingComplete
}
