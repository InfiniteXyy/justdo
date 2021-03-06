import { Ionicons } from '@expo/vector-icons'
import { DrawerItem } from '@react-navigation/drawer'
import { DrawerActions, useNavigation } from '@react-navigation/native'
import dayjs from 'dayjs'
import { get } from 'lodash'
import React from 'react'
import { ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import { AllFilterType, todoFilters } from '../constant'
import { useTodoListRoute } from '../hooks/use-todolist-route'

export function DrawerNavigator() {
  const { currentKey, setCurrentKey, isDrawerFixed } = useTodoListRoute()
  const navigation = useNavigation<any>()

  return (
    <SafeAreaView style={{ height: '100%' }}>
      {!isDrawerFixed && (
        <Text margin-20 text60 grey30 style={{ fontWeight: 'bold' }}>
          {dayjs().format('MM 月 DD 日')}
        </Text>
      )}
      <ScrollView>
        {Object.entries(todoFilters).map((entry) => {
          const key = entry[0] as AllFilterType
          const value = entry[1]
          if (get(value, 'hidden')) return null
          return (
            <React.Fragment key={key}>
              {get(value, 'divider') && <View height={1} backgroundColor="#f1f1f1" marginV-8 />}
              <DrawerItem
                label={value.title}
                focused={currentKey === key}
                onPress={() => {
                  setCurrentKey(key)
                  navigation.dispatch(DrawerActions.closeDrawer())
                }}
                activeTintColor={Colors.primary}
                icon={({ color, size }) => <Ionicons name={value.icon as any} size={size} color={color} />}
              />
            </React.Fragment>
          )
        })}
      </ScrollView>
      {!isDrawerFixed ? (
        <View row right centerV>
          <TouchableOpacity padding-20 onPress={() => navigation.navigate('Setting')}>
            <Ionicons name="settings-outline" size={18} color={Colors.grey20} />
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity padding-20 onPress={() => navigation.navigate('Setting')}>
          <Ionicons name="settings-outline" size={18} color={Colors.grey20} />
        </TouchableOpacity>
      )}
    </SafeAreaView>
  )
}
