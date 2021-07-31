import { Ionicons } from '@expo/vector-icons'
import { DrawerItem } from '@react-navigation/drawer'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, View } from 'react-native-ui-lib'
import { todoFilters } from '../constant'
import { useTodoListRoute } from '../hooks/use-todolist-route'

export function DrawerNavigator() {
  const { currentKey, setCurrentKey } = useTodoListRoute()
  const navigation = useNavigation()

  return (
    <SafeAreaView>
      <ScrollView>
        <View padding-20>
          <Text text60 dark30 style={{ fontWeight: 'bold' }}>
            {dayjs().format('MM 月 DD 日')}
          </Text>
          <Text marginT-10 text80 dark20>
            今日：0 / 10
          </Text>
        </View>
        {Object.entries(todoFilters).map(([key, value]) => (
          <DrawerItem
            key={key}
            label={value.title}
            focused={currentKey === key}
            onPress={() => {
              setCurrentKey(key)
              navigation.dispatch(DrawerActions.closeDrawer())
            }}
            icon={({ color, size }) => <Ionicons name={value.icon as any} size={size} color={color} />}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  )
}
