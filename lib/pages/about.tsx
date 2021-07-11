import { Center, Text, VStack } from 'native-base'
import { SafeAreaView } from 'react-native'
import { AppTitle } from '../components'

export function About() {
  return (
    <SafeAreaView>
      <VStack height="100%">
        <AppTitle />
        <Center flex={1}>
          <Text>About Screen</Text>
        </Center>
      </VStack>
    </SafeAreaView>
  )
}
