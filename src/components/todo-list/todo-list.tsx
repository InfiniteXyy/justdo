import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useMemo, useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import { todoFilters } from '../../constant'
import { todoList } from '../../data'
import { useActiveTodo } from '../../hooks/use-active-todo'
import { useHeader } from '../../hooks/use-header'
import { AddTodo } from '../add-todo'
import { DropdownMenu, Modal } from '../ui'
import { EmptyView } from './empty-view'
import { TodoItem } from './todo-item'

export const TodoList = gestureHandlerRootHOC(
  observer(() => {
    const navigation = useNavigation()
    const [addTodoVisible, setAddTodoVisible] = useState(false)
    const [menuVisible, setMenuVisible] = useState(false)
    const [modalVisible, setModalVisible] = useState(false)
    const setHeader = useHeader((state) => state.setHeader)
    const { activeTodoId, setActiveTodoId } = useActiveTodo()

    const activeTodoList = useMemo(
      () => todoList.todos.filter((i) => activeTodoId.includes(i.id)),
      [todoList.todos, activeTodoId]
    )

    useEffect(() => {
      if (activeTodoList.length === 0) setModalVisible(false)
    }, [activeTodoList.length])

    useEffect(() => {
      if (activeTodoList.length === 0) {
        setHeader({
          right: (
            <View flex centerV row paddingH-16>
              <TouchableOpacity onPress={() => setAddTodoVisible(true)}>
                <Ionicons key="add" name="add" size={32} style={{ marginRight: 10 }} color={Colors.dark20} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setMenuVisible((i) => !i)}>
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
            <View flex centerV row paddingH-16>
              <TouchableOpacity marginR-10>
                <MaterialIcons key="instant" name={'flash-on'} size={24} color={Colors.yellow30} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setModalVisible((i) => !i)}>
                <Ionicons key="move" name="file-tray-outline" size={24} color={Colors.dark20} />
              </TouchableOpacity>
            </View>
          ),
        })
      }
    }, [activeTodoList])

    return (
      <>
        {todoList.projects.length === 0 ? (
          <EmptyView />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                size={2}
                refreshing={false}
                title="释放来添加新的待办"
                onRefresh={() => setAddTodoVisible(true)}
              />
            }
          >
            {todoList.todos.map((todo) => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </ScrollView>
        )}
        <AddTodo visible={addTodoVisible} onClose={() => setAddTodoVisible(false)} />
        <DropdownMenu
          menuItems={[
            { label: '计划', onPress: () => navigation.navigate('Plan') },
            { label: '回顾', onPress: () => {} },
            { label: '同步', onPress: () => {} },
            { label: '分组查看', onPress: () => {} },
            { label: '标签过滤', onPress: () => {} },
            { label: '搜索', onPress: () => {} },
          ]}
          visible={menuVisible}
          setVisible={setMenuVisible}
          position={{ top: 10, right: 10 }}
        />
        <Modal visible={modalVisible} setVisible={setModalVisible} title="移动到">
          <View>
            {Object.entries(todoFilters).map(([key, value]) => (
              <TouchableOpacity key={key} onPress={() => {}}>
                <View height={40} centerV row>
                  <Ionicons name={value.icon as any} size={20} color={Colors.grey30} />
                  <Text marginL-18 text79>
                    {value.title}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </Modal>
      </>
    )
  })
)
