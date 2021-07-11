import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer'
import { Box, Divider, Pressable, Text, VStack } from 'native-base'
import React from 'react'

export function DrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <VStack space={6} my={2} mx={1}>
        <Box px={4}>
          <Text bold color="gray.700">
            账号
          </Text>
          <Text fontSize={14} mt={1} color="gray.500" fontWeight={500}>
            xyy@gmail.com
          </Text>
        </Box>
        <VStack divider={<Divider />} space={4}>
          <VStack>
            <Pressable
              px={5}
              py={3}
              rounded="md"
              onPress={() => props.navigation.navigate('Home')}
              bg={props.state.index === 0 ? 'gray.200' : undefined}
            >
              <Text fontWeight={500} color={'gray.700'}>
                首页
              </Text>
            </Pressable>
            <Pressable
              px={5}
              py={3}
              rounded="md"
              onPress={() => props.navigation.navigate('About')}
              bg={props.state.index === 1 ? 'gray.200' : undefined}
            >
              <Text fontWeight={500} color={'gray.700'}>
                关于
              </Text>
            </Pressable>
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  )
}
