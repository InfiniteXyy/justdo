import { RouteProp, useRoute } from '@react-navigation/native'
import React from 'react'
import { ScrollView } from 'react-native'
import { Text } from 'react-native-ui-lib'

export default function RawContentScreen() {
  const { params } = useRoute<RouteProp<{ RawContent: { content: string } }, 'RawContent'>>()

  return (
    <ScrollView>
      <Text selectable>{params.content}</Text>
    </ScrollView>
  )
}
