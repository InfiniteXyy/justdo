import React from 'react'
import { ScrollView, Switch, TouchableHighlight } from 'react-native'
import { Colors, Text, View } from 'react-native-ui-lib'
import { useTodoListRoute } from '../hooks/use-todolist-route'

export default function SettingScreen() {
  const { isDrawerFixed, setDrawerFixed } = useTodoListRoute()
  return (
    <ScrollView>
      <View margin-10 br20 backgroundColor={Colors.white} style={{ overflow: 'hidden' }}>
        <View spread row centerV padding-10>
          <Text text70>固定侧边栏</Text>
          <Switch value={isDrawerFixed} onValueChange={setDrawerFixed} />
        </View>
        <View backgroundColor={Colors.dark80} height={1} marginH-10 />
        <TouchableHighlight onPress={() => {}}>
          <View centerV padding-10 backgroundColor={Colors.white}>
            <Text text70>关于</Text>
          </View>
        </TouchableHighlight>
      </View>
    </ScrollView>
  )
}
