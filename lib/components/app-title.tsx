import { useNavigation } from '@react-navigation/native'
import { HamburgerIcon, HStack, Pressable, View } from 'native-base'
import React from 'react'

interface AppTitleProps {
  header?: React.ReactNode
}

export function AppTitle(props: AppTitleProps) {
  const navigation = useNavigation()
  return (
    <HStack
      justifyContent="space-between"
      width="100%"
      px="4"
      h="12"
      alignItems="center"
      borderBottomWidth="1"
      borderBottomColor="gray.200"
    >
      {props.header || <View />}
      <Pressable onPress={(navigation as any).toggleDrawer}>
        <HamburgerIcon size="4" color="gray.400" />
      </Pressable>
    </HStack>
  )
}
