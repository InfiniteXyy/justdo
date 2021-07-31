import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { ScrollView, TouchableNativeFeedback, TouchableOpacity } from 'react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { ActionSheet, Colors, Drawer, Text, View } from 'react-native-ui-lib'
import { ITodo, todoList } from '../../data'
import { useHeaderRight } from '../../hooks/use-header-right'
import { AddTodo } from '../add-todo'
import { EmptyView } from './empty-view'

const TodoItem = observer((props: { todo: ITodo }) => {
  const { todo } = props
  return (
    <Drawer
      leftItem={{ text: '完成', background: 'green' }}
      rightItems={[{ text: '删除', background: 'red' }]}
      useNativeAnimations
    >
      <TouchableNativeFeedback>
        <View paddingH-20 paddingV-10 row centerV bg-white>
          <TouchableOpacity onPress={todo.toggleStatus}>
            <MaterialIcons
              name={!todo.isCompleted ? 'check-box-outline-blank' : 'check-box'}
              size={24}
              color={Colors.grey40}
            />
          </TouchableOpacity>
          <View marginH-10>
            <Text
              numberOfLines={1}
              text70
              dark70={todo.isCompleted}
              dark10={!todo.isCompleted}
              style={{ textDecorationLine: todo.isCompleted ? 'line-through' : undefined }}
            >
              {todo.title}
            </Text>
            {todo.description && (
              <Text dark60 dark70={todo.isCompleted} text80 numberOfLines={1}>
                {todo.description}
              </Text>
            )}
          </View>
        </View>
      </TouchableNativeFeedback>
    </Drawer>
  )
})

export const TodoList = gestureHandlerRootHOC(
  observer(() => {
    const [addTodoVisible, setAddTodoVisible] = useState(false)
    const [optionsMenuVisible, setOptionsMenuVisible] = useState(false)
    useHeaderRight(
      <View flex centerV row paddingH-16>
        <TouchableOpacity onPress={() => setAddTodoVisible(true)}>
          <Ionicons name="add" size={32} style={{ marginRight: 10 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setOptionsMenuVisible(true)}>
          <Ionicons name="ellipsis-horizontal" size={24} />
        </TouchableOpacity>
      </View>
    )
    return (
      <>
        {todoList.projects.length === 0 ? (
          <EmptyView />
        ) : (
          <ScrollView>
            {todoList.todos.map((todo) => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
          </ScrollView>
        )}
        <AddTodo visible={addTodoVisible} onClose={() => setAddTodoVisible(false)} />
        <ActionSheet
          title={'操作'}
          visible={optionsMenuVisible}
          onDismiss={() => setOptionsMenuVisible(false)}
          useNativeIOS
          options={[
            { label: '计划' },
            { label: '回顾' },
            { label: '同步' },
            { label: '分组查看' },
            { label: '标签过滤' },
            { label: '搜索' },
          ]}
        />
      </>
    )
  })
)
