import { DrawerContentComponentProps, DrawerContentScrollView } from '@react-navigation/drawer'
import dayjs from 'dayjs'
import { Box, Divider, Pressable, Text, VStack } from 'native-base'

export function DrawerContent(props: DrawerContentComponentProps) {
  const routers = [
    { key: 'Home', title: '主页' },
    { key: 'About', title: '关于' },
    { key: 'Projects', title: '项目' },
  ] as const

  return (
    <DrawerContentScrollView {...props}>
      <VStack space={6} my={2} mx={1}>
        <Box px={4}>
          <Text bold color="gray.700">
            Just Todo
          </Text>
          <Text fontSize={14} mt={1} color="gray.500" fontWeight={500}>
            {dayjs().format('YYYY 年 MM 月 DD 日')}
          </Text>
        </Box>
        <VStack divider={<Divider />} space={4}>
          <VStack>
            {routers.map((router, index) => (
              <Pressable
                key={router.key}
                px={5}
                py={3}
                rounded="md"
                onPress={() => props.navigation.navigate(router.key)}
                bg={props.state.index === index ? 'gray.200' : undefined}
              >
                <Text fontWeight={500} color={'gray.700'}>
                  {router.title}
                </Text>
              </Pressable>
            ))}
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  )
}
