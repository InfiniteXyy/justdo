import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useMemo, useState } from 'react'
import { Colors, TouchableOpacity, View } from 'react-native-ui-lib'
import { ITodo } from '../../data'
import { useActiveTodo } from '../../hooks/use-active-todo'
import { useHeader } from '../../hooks/use-header'
import { ArrangeTodo } from '../arrange-todo'
import { DropdownMenu } from '../ui'

export function TodoListHeader(props: { currentTodos: ITodo[] }) {
  const { currentTodos } = props
  const setHeader = useHeader((state) => state.setHeader)
  const { activeTodoId, setActiveTodoId } = useActiveTodo()
  const [menuVisible, setMenuVisible] = useState(false)
  const navigation = useNavigation()

  const activeTodoList = useMemo(
    () => currentTodos.filter((i) => activeTodoId.includes(i.id)),
    [currentTodos, activeTodoId]
  )

  useEffect(() => {
    if (activeTodoList.length === 0) ArrangeTodo.close()
  }, [activeTodoList.length])

  useEffect(() => {
    if (activeTodoList.length === 0) {
      setHeader({
        right: (
          <View flex centerV row paddingH-6>
            <TouchableOpacity padding-10 onPress={() => setMenuVisible((i) => !i)}>
              <Ionicons key="more" name="ellipsis-horizontal" size={24} color={Colors.dark20} />
            </TouchableOpacity>
          </View>
        ),
      })
    } else {
      setHeader({
        leftIcon: (
          <TouchableOpacity onPress={() => setActiveTodoId([])}>
            <View paddingL-20 paddingR-10 marginR-10>
              <Ionicons name="close" size={24} style={{ marginRight: 10 }} color={Colors.dark20} />
            </View>
          </TouchableOpacity>
        ),
        left: <></>,
        right: (
          <View flex centerV row paddingH-6>
            <TouchableOpacity padding-10>
              <MaterialIcons key="instant" name={'flash-on'} size={24} color={Colors.yellow30} />
            </TouchableOpacity>
            <TouchableOpacity padding-10 onPress={() => ArrangeTodo.confirm(activeTodoList[0])}>
              <Ionicons key="move" name="file-tray-outline" size={24} color={Colors.dark20} />
            </TouchableOpacity>
          </View>
        ),
      })
    }
  }, [activeTodoList])

  return (
    <>
      <DropdownMenu
        menuItems={[
          { label: '计划', onPress: () => navigation.navigate('Plan') },
          { label: '回顾', onPress: () => navigation.navigate('Review') },
          { label: '分组查看', onPress: () => {} },
          { label: '标签过滤', onPress: () => navigation.navigate('Search') },
          { label: '搜索', onPress: () => navigation.navigate('Search') },
        ]}
        visible={menuVisible}
        setVisible={setMenuVisible}
        position={{ top: 10, right: 10 }}
      />
    </>
  )
}
