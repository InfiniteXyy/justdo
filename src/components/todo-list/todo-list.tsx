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
import { filterTodos } from './filter-todos'
import { TodoGroup } from './todo-group'

export const TodoList = gestureHandlerRootHOC(
  observer(() => {
    const { currentKey } = useTodoListRoute()
    const [addTodoVisible, setAddTodoVisible] = useState(false)

    const todoGroups = filterTodos(todoList, currentKey)

    return (
      <>
        {todoGroups.every((i) => i.todos.length === 0) ? (
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
            {todoGroups.map((group) => {
              if (group.todos.length === 0) return null
              return <TodoGroup key={group.label} todos={group.todos} label={group.label} subLabel={group.subLabel} />
            })}
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
