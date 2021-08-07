import React from 'react'
import { Text, View } from 'react-native-ui-lib'
import { useTodoListRoute } from '../../hooks/use-todolist-route'

export function EmptyView() {
  const { currentKey } = useTodoListRoute()
  return (
    <View center flexG>
      <Text grey40 text50B>
        {(() => {
          switch (currentKey) {
            case 'archived/finished':
              return '还没有删除的任务哦'
            case 'archived/removed':
              return '还没有完成的任务哦'
            default:
              return '空空如也，快去创建待办吧'
          }
        })()}
      </Text>
    </View>
  )
}
