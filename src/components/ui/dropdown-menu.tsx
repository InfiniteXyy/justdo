import React from 'react'
import { StyleSheet, TouchableHighlight } from 'react-native'
import { Modal as DefaultModal, Text, View } from 'react-native-ui-lib'
import { isAndroid } from '../../constant'

interface DropdownMenuProps {
  menuItems: { label: string; onPress: () => void; icon?: React.ReactNode }[]
  visible: boolean
  setVisible: (value: boolean) => void
  position: { top: number; right: number }
}
export function DropdownMenu(props: DropdownMenuProps) {
  const { menuItems, position, visible, setVisible } = props

  return (
    <DefaultModal
      animationType="fade"
      transparent={true}
      visible={visible}
      overlayBackgroundColor={'rgba(0,0,0,0.5)'}
      onBackgroundPress={() => setVisible(false)}
      onDismiss={() => setVisible(false)}
    >
      <View style={[styles.dropdown, position, { top: isAndroid ? position.top : position.top + 40 }]}>
        {menuItems.map((i) => (
          <TouchableHighlight
            key={i.label}
            onPress={() => {
              i.onPress()
              setVisible(false)
            }}
          >
            <View height={40} row centerV paddingH-20 bg-white>
              {i.icon}
              <Text>{i.label}</Text>
            </View>
          </TouchableHighlight>
        ))}
      </View>
    </DefaultModal>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    shadowOpacity: 0.2,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
    backgroundColor: 'white',
    position: 'absolute',
    width: 200,
  },
})
