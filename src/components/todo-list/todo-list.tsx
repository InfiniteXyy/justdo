import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Keyboard, RefreshControl, ScrollView } from 'react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { View } from 'react-native-ui-lib'
import { isIOS } from '../../constant'
import { todoList } from '../../data'
import { useTodoListRoute } from '../../hooks/use-todolist-route'
import { AddTodo } from '../add-todo'
import { EmptyView } from './empty-view'
import { TodoListHeader } from './header'
import { TodoGroup } from './todo-group'

export const TodoList = gestureHandlerRootHOC(
  observer(() => {
    const { currentKey } = useTodoListRoute()
    const [addTodoVisible, setAddTodoVisible] = useState(false)

    const currentTodos = (() => {
      if (currentKey === 'finished') {
        return todoList.finishedTodos
      }
      if (currentKey === 'removed') {
        return todoList.archivedTodos
      }
      if (currentKey.startsWith('filter')) {
        return todoList.todos.filter((i) => i.plan === currentKey && !i.isArchived && !i.isCompleted)
      }
      return todoList.todos
    })()

    return (
      <>
        <TodoListHeader />
        {currentTodos.length === 0 ? (
          <EmptyView />
        ) : (
          <ScrollView
            refreshControl={
              isIOS ? (
                <RefreshControl
                  tintColor="transparent"
                  refreshing={false}
                  title="继续下拉添加新的待办"
                  onRefresh={() => setAddTodoVisible(true)}
                />
              ) : undefined
            }
          >
            <TodoGroup todos={currentTodos} label="全部" />
            <View height={100} />
          </ScrollView>
        )}
        <AddTodo
          visible={addTodoVisible}
          onClose={() => {
            setAddTodoVisible(false)
            Keyboard.dismiss()
          }}
          onOpen={() => setAddTodoVisible(true)}
        />
      </>
    )
  })
)
