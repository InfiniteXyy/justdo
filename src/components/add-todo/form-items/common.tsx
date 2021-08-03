import { noop } from 'lodash'
import React from 'react'
import { TouchableHighlight } from 'react-native'
import { Text, View } from 'react-native-ui-lib'

export function FormItem(props: { label: string; children: React.ReactNode; onPress?: () => void }) {
  const { label, children, onPress = noop } = props
  return (
    <TouchableHighlight onPress={onPress} style={{ marginHorizontal: -20 }}>
      <View row spread height={40} centerV bg-white paddingH-20>
        <Text dark10>{label}</Text>
        {children}
      </View>
    </TouchableHighlight>
  )
}

export function FormItemGroup(props: { label: string; children: React.ReactNode }) {
  const { label, children } = props
  return (
    <View marginT-20>
      <Text tex80 dark20 marginB-10 style={{ fontWeight: '700' }}>
        {label}
      </Text>
      {children}
    </View>
  )
}
