import { Ionicons } from '@expo/vector-icons'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import { Colors } from 'react-native-ui-lib'

interface CheckboxProps {
  checked: boolean;
  onChange: (value: boolean) => void
}

export function Checkbox(props: CheckboxProps) {
  const { checked, onChange } = props
  return (
    <TouchableOpacity onPress={() => onChange(!checked)}>
      <Ionicons
        name={!checked ? 'radio-button-off' : 'checkmark-circle-sharp'}
        size={24}
        color={Colors.grey30}
      />
    </TouchableOpacity>
  )
}
