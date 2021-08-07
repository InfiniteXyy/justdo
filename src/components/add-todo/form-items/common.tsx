import { Ionicons } from '@expo/vector-icons'
import { ErrorMessage } from 'formik'
import { noop } from 'lodash'
import React from 'react'
import { TouchableHighlight } from 'react-native'
import { Colors, Text, View } from 'react-native-ui-lib'

export function FormItem(props: {
  label: string
  children: React.ReactNode
  onPress?: () => void
  icon?: React.ReactNode
}) {
  const { label, children, onPress = noop, icon } = props
  return (
    <TouchableHighlight onPress={onPress} style={{ marginHorizontal: -20 }}>
      <View row spread height={40} centerV bg-white paddingH-20>
        <View row centerV>
          {icon}
          <Text dark10>{label}</Text>
        </View>
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

export function FormError(props: { name: string }) {
  return (
    <ErrorMessage
      name={props.name}
      render={(msg) => (
        <View row centerV>
          <Ionicons name="information-circle" color={Colors.red10} size={16} />
          <Text marginL-4 red10>
            {msg}
          </Text>
        </View>
      )}
    />
  )
}
