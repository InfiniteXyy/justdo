import { Ionicons } from '@expo/vector-icons'
import React, { useMemo, useState } from 'react'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Card, Colors, PageControl, TabController, Text, TouchableOpacity, View } from 'react-native-ui-lib'

function TabView() {
  return (
    <View>
      <Card
        margin-20
        height={500}
        style={{ marginBottom: 15 }}
        onPress={() => {}}
        useNative
        backgroundColor={Colors.white}
        activeOpacity={1}
      >
        <Card.Section
          content={[
            { text: '# 1', text70: true, grey10: true },
            {
              text: '完成计划列表',
              text60: true,
              ['marginV-10']: true,
              grey10: true,
            },
            { text: '增加一下', text70: true, grey30: true },
          ]}
          style={{ padding: 20, flex: 1 }}
        />
      </Card>
      <View row margin-10>
        <TouchableOpacity marginH-10 br30 style={{ height: 50 }} center flexG>
          <Ionicons name="sunny" size={24} color={Colors.grey20} />
          <Text>今日</Text>
        </TouchableOpacity>
        <TouchableOpacity marginH-10 br30 style={{ height: 50 }} center flexG>
          <Ionicons name="swap-vertical-sharp" size={24} color={Colors.grey20} />
          <Text>移动</Text>
        </TouchableOpacity>
        <TouchableOpacity marginH-10 br30 style={{ height: 50 }} center flexG>
          <Ionicons name="trash" size={24} color={Colors.grey20} />
          <Text>删除</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
function PlanScreen() {
  const [selectedIndex, onChangeIndex] = useState(0)
  const items = useMemo(
    () => [
      { label: '', key: 'A' },
      { label: '', key: 'B' },
      { label: '', key: 'C' },
    ],
    []
  )
  return (
    <TabController asCarousel={true} selectedIndex={selectedIndex} onChangeIndex={onChangeIndex} items={items}>
      <TabController.TabBar items={[{}]} />
      <TabController.PageCarousel>
        <TabController.TabPage index={0} key="A">
          <TabView />
        </TabController.TabPage>
        <TabController.TabPage index={1} key="B">
          <TabView />
        </TabController.TabPage>
        <TabController.TabPage index={2} key="C">
          <TabView />
        </TabController.TabPage>
      </TabController.PageCarousel>
      <View marginB-40>
        <PageControl currentPage={selectedIndex} numOfPages={3} inactiveColor={Colors.grey50} color={Colors.grey10} />
      </View>
    </TabController>
  )
}

export default gestureHandlerRootHOC(PlanScreen)
