import React from 'react'
import { Text, View } from 'react-native-ui-lib'

export function EmptyView() {
  return (
    <View center flexG>
      <Text grey40 text50B>
        空空如也，快去创建待办吧
      </Text>
    </View>
  )
}
