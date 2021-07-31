import React, { useMemo, useState } from 'react'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler'
import { Card, Colors, PageControl, TabController, View } from 'react-native-ui-lib'

function TabView() {
  return (
    <Card
      row
      margin-20
      height={160}
      style={{ marginBottom: 15 }}
      onPress={() => {}}
      useNative
      backgroundColor={Colors.white}
      activeOpacity={1}
    >
      <Card.Section
        content={[
          { text: 'You’re Invited!', text70: true, grey10: true },
          {
            text: '222 Join Old The Town Barbershop Official Store. Download the Wix app to...',
            text80: true,
            grey10: true,
          },
          { text: 'wix.to/A465c', text90: true, grey50: true },
        ]}
        style={{ padding: 20, flex: 1 }}
      />
    </Card>
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
      <TabController.TabBar items={items} />
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
      <View marginB-20>
        <PageControl currentPage={selectedIndex} numOfPages={3} inactiveColor={Colors.grey50} color={Colors.grey10} />
      </View>
    </TabController>
  )
}

export default gestureHandlerRootHOC(PlanScreen)
