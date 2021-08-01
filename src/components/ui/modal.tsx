import React from 'react'
import { StyleSheet } from 'react-native'
import { Modal as DefaultModal, Text, View } from 'react-native-ui-lib'

interface ModalProps {
  title: string
  visible: boolean
  setVisible: (value: boolean) => void
  children: React.ReactNode
}
// FIXME: 在 reanimated 更新到 2.3 后替换为 Transition API
export function Modal(props: ModalProps) {
  const { visible, setVisible, children, title } = props

  return (
    <DefaultModal
      animationType="fade"
      transparent={true}
      visible={visible}
      overlayBackgroundColor={'rgba(0,0,0,0.5)'}
      onBackgroundPress={() => setVisible(false)}
      onDismiss={() => setVisible(false)}
    >
      <View padding-18 style={styles.modal}>
        <Text text65 marginB-10>
          {title}
        </Text>
        {children}
      </View>
    </DefaultModal>
  )
}

const styles = StyleSheet.create({
  modal: {
    shadowOpacity: 0.2,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderRadius: 10,
    left: '10%',
    right: '10%',
    top:'20%',
    backgroundColor: 'white',
    position: 'absolute',
  },
})
