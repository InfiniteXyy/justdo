import { Ionicons } from '@expo/vector-icons'
import { observer } from 'mobx-react-lite'
import React from 'react'
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib'

const closeIcon = <Ionicons name="close" color={Colors.grey40} size={24} />
export default observer(function FiltersScreen() {
  return (
    <View padding-10 backgroundColor={Colors.white} height={'100%'}>
      <View row spread paddingV-10 paddingH-5 backgroundColor={Colors.grey70} br30 centerV>
        <SelectorItem>标题</SelectorItem>
        <SelectorItem>包含</SelectorItem>
        <SelectorItem>IOS</SelectorItem>
        {closeIcon}
      </View>
      <View br20 marginH-10 marginV-10 padding-4 row style={{ borderWidth: 0.5, borderColor: Colors.dark70, width: 100 }}>
        <View flexG br20 backgroundColor={Colors.primary} paddingH-5 paddingV-5 center>
          <Text white>并且</Text>
        </View>
        <View flexG br20 paddingH-5 paddingV-5 center>
          <Text>或者</Text>
        </View>
      </View>
      <View row spread paddingV-10 paddingH-5 backgroundColor={Colors.grey70} br30 centerV>
        <SelectorItem>截止时间</SelectorItem>
        <SelectorItem>早于</SelectorItem>
        <SelectorItem>2020/8/20</SelectorItem>
        {closeIcon}
      </View>
      <TouchableOpacity row centerV marginT-20>
        <Ionicons name="add" size={18} color={Colors.primary} />
        <Text primary>添加属性</Text>
      </TouchableOpacity>
    </View>
  )
})

const SelectorItem = (props: { children: string }) => {
  return (
    <View marginH-5 br30 flexG padding-8 style={{ backgroundColor: Colors.white, borderWidth: 0.5, borderColor: Colors.dark70 }}>
      <Text dark50>{props.children}</Text>
    </View>
  )
}
