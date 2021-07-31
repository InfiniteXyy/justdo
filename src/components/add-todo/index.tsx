import { Ionicons } from '@expo/vector-icons'
import { observer } from 'mobx-react-lite'
import React, { useCallback } from 'react'
import { KeyboardAvoidingView } from 'react-native'
import { Colors, KeyboardAwareScrollView, Modal, Text, View } from 'react-native-ui-lib'
import { AddTodoForm } from './form'

export const AddTodo = observer(({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const handleAdd = useCallback(() => {
    onClose()
  }, [])

  return (
    <Modal
      animationType="fade"
      transparent={true}
      onBackgroundPress={onClose}
      visible={visible}
      overlayBackgroundColor={'rgba(0,0,0,0.2)'}
    >
      <KeyboardAvoidingView
        style={{
          marginTop: 'auto',
          backgroundColor: Colors.white,
        }}
        behavior="padding"
      >
        <KeyboardAwareScrollView>
          <View marginH-16 row centerV spread marginT-30>
            <Text text60>添加一个新的待办</Text>
            <Ionicons name="close-circle" size={30} color={Colors.dark40} onPress={onClose} />
          </View>
          <View margin-20>
            <AddTodoForm onSubmit={handleAdd} />
          </View>
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </Modal>
  )
})
