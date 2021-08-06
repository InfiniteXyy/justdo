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
      overlayBackgroundColor={'rgba(0,0,0,0.1)'}
      onBackgroundPress={() => setVisible(false)}
      onDismiss={() => setVisible(false)}
    >
      <View style={[styles.dropdown, position, { top: isAndroid ? position.top : position.top + 40 }]}>
        <View style={{ borderRadius: 4, backgroundColor: 'white', overflow: 'hidden' }}>
          {menuItems.map((i) => (
            <TouchableHighlight
              key={i.label}
              onPress={() => {
                i.onPress()
                setVisible(false)
              }}
            >
              <View height={40} row centerV paddingH-10 bg-white>
                {i.icon}
                <Text>{i.label}</Text>
              </View>
            </TouchableHighlight>
          ))}
        </View>
      </View>
    </DefaultModal>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,

    position: 'absolute',
    width: 150,
  },
})
