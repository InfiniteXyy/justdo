import { Ionicons } from '@expo/vector-icons'
import { DrawerItem } from '@react-navigation/drawer'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import { todoFilters } from '../constant'
import { useTodoListRoute } from '../hooks/use-todolist-route'

export function DrawerNavigator() {
  const { currentKey, setCurrentKey } = useTodoListRoute()
  const navigation = useNavigation()

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <View padding-20>
        <Text text60 dark30 style={{ fontWeight: 'bold' }}>
          {dayjs().format('MM 月 DD 日')}
        </Text>
      </View>
      <ScrollView>
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
        <View height={1} backgroundColor="#f1f1f1" marginV-8 />
        <DrawerItem
          label="已完成"
          onPress={() => {}}
          icon={({ color, size }) => <Ionicons name="checkmark" size={size} color={color} />}
        />
        <DrawerItem
          label="回收站"
          onPress={() => {}}
          icon={({ color, size }) => <Ionicons name="trash" size={size} color={color} />}
        />
      </ScrollView>
      <View row spread centerV>
        <TouchableOpacity row centerV padding-20>
          <Ionicons name="add" size={24} color={Colors.dark20} />
          <Text>添加清单</Text>
        </TouchableOpacity>
        <TouchableOpacity padding-20>
          <Ionicons name="settings-outline" size={18} color={Colors.dark20} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}
