import { Ionicons } from '@expo/vector-icons'
import { over } from 'lodash'
import React from 'react'
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import { Modal } from './modal'

interface ModalMenuProps {
  visible: boolean
  setVisible: (value: boolean) => void
  title: string
  menu: { title: string; iconName: string; onPress: () => void; hidden?: boolean }[]
}

export function ModalMenu(props: ModalMenuProps) {
  const { visible, setVisible, title, menu } = props
  return (
    <Modal visible={visible} setVisible={setVisible} title={title}>
      <View>
        {menu
          .filter((i) => !i.hidden)
          .map((item) => (
            <TouchableOpacity key={item.title} onPress={over(item.onPress, () => setVisible(false))}>
              <View height={40} centerV row>
                <Ionicons name={item.iconName as any} size={20} color={Colors.grey30} />
                <Text marginL-18 text79>
                  {item.title}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
      </View>
    </Modal>
  )
}
