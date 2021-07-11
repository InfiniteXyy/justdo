import { createDrawerNavigator } from '@react-navigation/drawer'
import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import 'react-native-gesture-handler'
import 'react-native-get-random-values'
import { DrawerContent } from './components'
import { About, Home } from './pages'

const Drawer = createDrawerNavigator()

const App = () => {
  return (
    <NavigationContainer>
      <NativeBaseProvider>
        <Drawer.Navigator drawerContent={DrawerContent}>
          <Drawer.Screen name="Home" component={Home} />
          <Drawer.Screen name="About" component={About} />
        </Drawer.Navigator>
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

export default App
