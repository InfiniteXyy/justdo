import { Box, ScrollView, VStack } from 'native-base'
import { SafeAreaView } from 'react-native'
import { AppTitle, ProjectCover } from '../components'
import { todoStore } from '../data'

export function projects() {
  return (
    <SafeAreaView>
      <VStack height="100%">
        <AppTitle />
        <ScrollView>
          {todoStore.projects.map((item) => {
            return (
              <Box mt="2">
                <ProjectCover key={item.id} project={item} />
              </Box>
            )
          })}
        </ScrollView>
      </VStack>
    </SafeAreaView>
  )
}
