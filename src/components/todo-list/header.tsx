import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Colors, TouchableOpacity, View } from 'react-native-ui-lib'
import { useHeader } from '../../hooks/use-header'
import { DropdownMenu } from '../ui'

export function TodoListHeader() {
  const setHeader = useHeader((state) => state.setHeader)
  const [menuVisible, setMenuVisible] = useState(false)
  const navigation = useNavigation()

  useEffect(() => {
    setHeader({
      right: (
        <View flex centerV row paddingH-6>
          <TouchableOpacity padding-10 onPress={() => navigation.navigate('Search')}>
            <Ionicons name="search" size={24} color={Colors.dark20} />
          </TouchableOpacity>
          <TouchableOpacity padding-10 onPress={() => setMenuVisible((i) => !i)}>
            <Ionicons key="more" name="ellipsis-horizontal" size={24} color={Colors.dark20} />
          </TouchableOpacity>
        </View>
      ),
    })
  }, [])

  return (
    <>
      <DropdownMenu
        menuItems={[
          {
            label: '标签过滤',
            onPress: () => {},
            icon: <Ionicons name="filter" size={16} color={Colors.dark50} style={{ marginRight: 8 }} />,
          },
          {
            label: '计划',
            onPress: () => navigation.navigate('Plan'),
            icon: <Ionicons name="calendar" size={16} color={Colors.dark50} style={{ marginRight: 8 }} />,
          },
          {
            label: '回顾',
            onPress: () => navigation.navigate('Review'),
            icon: <Ionicons name="cloud" size={16} color={Colors.dark50} style={{ marginRight: 8 }} />,
          },
          {
            label: '分组查看',
            onPress: () => {},
            icon: <Ionicons name="grid" size={16} color={Colors.dark50} style={{ marginRight: 8 }} />,
          },
        ]}
        visible={menuVisible}
        setVisible={setMenuVisible}
        position={{ top: 10, right: 10 }}
      />
    </>
  )
}
