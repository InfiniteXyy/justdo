import React from 'react'
import { TextInput } from 'react-native'
import { View } from 'react-native-ui-lib'

export default function SearchScreen() {
  return (
    <View>
      <View bg-dark70 padding-10 margin-10 br20>
        <TextInput placeholder="搜索" autoFocus />
      </View>
    </View>
  )
}
