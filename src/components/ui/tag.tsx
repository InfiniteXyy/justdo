import React from 'react'
import { Colors, Text, TouchableOpacity } from 'react-native-ui-lib'

interface TagProps {
  name: string
}

export function Tag(props: TagProps) {
  return (
    <TouchableOpacity br20 marginH-2 padding-4 style={{ borderColor: Colors.grey10, borderWidth: 1 }}>
      <Text grey30 text90>
        {props.name}
      </Text>
    </TouchableOpacity>
  )
}
