import { Ionicons, MaterialIcons } from '@expo/vector-icons'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { FlatList } from 'react-native'
import { Card, Colors, ExpandableSection, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import { IProject, ITodo, todoList } from '../../data'
import { EmptyView } from './empty-view'

const TodoItem = observer((props: { todo: ITodo }) => {
  const { todo } = props

  return (
    <TouchableOpacity paddingH-20 marginV-10 row centerV onPress={todo.toggleStatus}>
      <MaterialIcons
        name={!todo.isCompleted ? 'check-box-outline-blank' : 'check-box'}
        size={24}
        color={Colors.grey40}
      />
      <View marginH-10>
        <Text
          numberOfLines={1}
          text70M
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
    </TouchableOpacity>
  )
})

const TodoProject = observer((props: { project: IProject }) => {
  const { project } = props

  const [isExpanded, setIsExpanded] = useState(true)

  return (
    <Card marginB-1 borderRadius={0} enableShadow={false} centerV>
      <ExpandableSection
        expanded={isExpanded}
        onPress={() => setIsExpanded(!isExpanded)}
        sectionHeader={
          <View row centerV marginH-20 paddingV-10>
            <Text text65 blue10 style={{ fontWeight: 'bold' }}>
              {project.title}
            </Text>
            <View br40 bg-grey70 paddingH-10 marginL-10>
              <Text text80 dark50 style={{ fontWeight: 'bold' }}>
                {project.status.unfinished}
              </Text>
            </View>
            <View flexG right>
              <Ionicons name={isExpanded ? 'chevron-up' : 'chevron-down'} size={18} color={Colors.grey50} />
            </View>
          </View>
        }
      >
        <View>
          {project.todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </View>
      </ExpandableSection>
    </Card>
  )
})
export const TodoList = observer(() => {
  return (
    <>
      {todoList.projects.length === 0 ? (
        <EmptyView />
      ) : (
        <FlatList<IProject>
          data={todoList.projects}
          keyExtractor={(project) => project.id}
          renderItem={({ item }) => <TodoProject key={item.id} project={item} />}
        />
      )}
    </>
  )
})
