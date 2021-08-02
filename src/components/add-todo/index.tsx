import { Ionicons } from '@expo/vector-icons'
import { observer } from 'mobx-react-lite'
import React, { useCallback } from 'react'
import { KeyboardAvoidingView, ScrollView } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Colors, Modal, Text, View } from 'react-native-ui-lib'
import { AddTodoForm } from './form'

export const AddTodo = observer(({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const handleAdd = useCallback(() => {
    onClose()
  }, [])

  return (
    <Modal animationType="slide" onBackgroundPress={onClose} visible={visible} onRequestClose={onClose}>
      <SafeAreaView>
        <KeyboardAvoidingView behavior="height" style={{ height: '100%' }}>
          <View marginH-16 row centerV spread marginT-20 marginB-10>
            <View row centerV>
              <Ionicons name="close" size={30} color={Colors.dark40} onPress={onClose} />
              <Text text60 dark10 marginL-10>
                添加一个新的待办
              </Text>
            </View>
            <Ionicons name="ios-send-sharp" size={24} color={Colors.dark30} onPress={onClose} />
          </View>
          <ScrollView>
            <View margin-20>
              <AddTodoForm onSubmit={handleAdd} />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Modal>
  )
})
