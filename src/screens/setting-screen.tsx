import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { ScrollView, Switch, TouchableHighlight } from 'react-native'
import { Colors, Text, View } from 'react-native-ui-lib'
import { useTodoListRoute } from '../hooks/use-todolist-route'

export default function SettingScreen() {
  const { isDrawerFixed, setDrawerFixed } = useTodoListRoute()
  const navigation = useNavigation<any>()
  return (
    <ScrollView>
      <View margin-10 br20 backgroundColor={Colors.white} style={{ overflow: 'hidden' }}>
        <View spread row centerV padding-10>
          <Text text70>固定侧边栏</Text>
          <Switch value={isDrawerFixed} onValueChange={setDrawerFixed} />
        </View>
        <View backgroundColor={Colors.grey80} height={1} marginH-10 />
        <TouchableHighlight onPress={() => navigation.navigate('Notion')}>
          <View centerV padding-10 backgroundColor={Colors.white}>
            <Text text70>设置 api</Text>
          </View>
        </TouchableHighlight>
        <View backgroundColor={Colors.grey80} height={1} marginH-10 />
        <TouchableHighlight onPress={() => navigation.navigate('About')}>
          <View centerV padding-10 backgroundColor={Colors.white}>
            <Text text70>关于</Text>
          </View>
        </TouchableHighlight>
      </View>
    </ScrollView>
  )
}
