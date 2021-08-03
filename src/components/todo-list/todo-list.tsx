import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { RefreshControl, ScrollView } from 'react-native'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { View } from 'react-native-ui-lib'
import { todoList } from '../../data'
import { useTodoListRoute } from '../../hooks/use-todolist-route'
import { AddTodo } from '../add-todo'
import { EmptyView } from './empty-view'
import { TodoListHeader } from './header'
import { TodoItem } from './todo-item'

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
        return todoList.todos.filter((i) => i.plan === currentKey)
      }
      return todoList.todos
    })()

    return (
      <>
        {currentTodos.length === 0 ? (
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
            {currentTodos.map((todo) => (
              <TodoItem todo={todo} key={todo.id} />
            ))}
            <View height={100} />
          </ScrollView>
        )}
        <TodoListHeader currentTodos={currentTodos} />
        <AddTodo
          visible={addTodoVisible}
          onClose={() => setAddTodoVisible(false)}
          onOpen={() => setAddTodoVisible(true)}
        />
      </>
    )
  })
)
