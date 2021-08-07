import { Ionicons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { Colors, ExpandableSection, Text, View } from 'react-native-ui-lib'
import { ITodo } from '../../data'
import { TodoItem } from './todo-item'

interface TodoGroupProps {
  todos: ITodo[]
  label: string
  subLabel?: string
}
export function TodoGroup(props: TodoGroupProps) {
  const { todos, label, subLabel } = props
  const [expanded, setExpanded] = useState(true)

  return (
    <View br20 marginH-8 marginT-8 backgroundColor="white" style={{ overflow: 'hidden' }}>
      <ExpandableSection
        expanded={expanded}
        onPress={() => setExpanded(!expanded)}
        sectionHeader={
          <View row centerV marginH-12 marginV-10>
            <Text text80M dark30 marginR-4>
              {label}
            </Text>
            <Ionicons name={expanded ? 'caret-up' : 'caret-down'} size={12} color={Colors.dark30} />
            {subLabel && (
              <View flexG right>
                <Text text90L dark60 marginR-4>
                  {subLabel}
                </Text>
              </View>
            )}
          </View>
        }
      >
        <View style={{ marginTop: -10 }}>
          {todos.map((todo) => (
            <TodoItem todo={todo} key={todo.id} />
          ))}
        </View>
      </ExpandableSection>
    </View>
  )
}
