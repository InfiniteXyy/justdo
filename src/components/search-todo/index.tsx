import { Ionicons } from '@expo/vector-icons'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { Platform } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { Card, Colors, MaskedInput, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import { todoList } from '../../data'

export const SearchTodo = observer(() => {
  const [isSearching, setIsSearching] = useState(false)
  return (
    <View>
      <TouchableOpacity row centerV spread marginH-20 marginV-15 onPress={() => setIsSearching(!isSearching)}>
        {isSearching ? (
          <MaskedInput
            renderMaskedText={(value) => {
              const hasValue = Boolean(value && value.length > 0)

              return (
                <View row center>
                  <Text text50 dark50 marginR-8>
                    {'>'}
                  </Text>
                  <Text text50 dark10={hasValue} dark60={!hasValue}>
                    {hasValue ? value : '输入关键词或筛选条件'}
                  </Text>
                </View>
              )
            }}
            autoFocus
            onSubmitEditing={() => setIsSearching(false)}
          />
        ) : (
          <Text text50>{'>'} 全部</Text>
        )}
        <Ionicons name="search-circle-sharp" size={34} color={Colors.grey50} />
      </TouchableOpacity>
      {isSearching && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {todoList.projects.map((project) => (
            <Card
              key={project.id}
              marginH-10
              marginT-1
              marginB-10
              onPress={() => {}}
              style={{ width: 120, ...Platform.select({ ios: { borderWidth: 1, borderColor: Colors.grey50 } }) }}
              enableShadow={Platform.OS === 'android'}
            >
              <Card.Section
                bg-white
                content={[
                  { text: project.title, text70: true, grey10: true, numberOfLines: 1 },
                  {
                    text: `完成：${project.status.unfinished}/${project.status.total}`,
                    text90: true,
                    grey50: true,
                  },
                ]}
                style={{ padding: 20 }}
              />
            </Card>
          ))}
        </ScrollView>
      )}
    </View>
  )
})
