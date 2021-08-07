import { Ionicons } from '@expo/vector-icons'
import { observer } from 'mobx-react-lite'
import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { Button, Colors, Modal } from 'react-native-ui-lib'
import { todoList } from '../../data'
import { AddTodoForm } from './form'
import { AddTodoFormType } from './form.model'

export const AddTodo = observer(
  ({ visible, onClose, onOpen }: { visible: boolean; onClose: () => void; onOpen: () => void }) => {
    const handleAdd = useCallback((form: AddTodoFormType) => {
      todoList.addTodo(form)
      Toast.show({ type: 'success', text1: '添加了一个新的任务到收集箱', text2: form.title })
      onClose()
    }, [])

    return (
      <>
        <Modal
          animationType="fade"
          visible={visible}
          onDismiss={onClose}
          overlayBackgroundColor="rgba(0, 0, 0, 0.2)"
          transparent
          onBackgroundPress={onClose}
        >
          <SafeAreaView style={styles.modal}>
            <AddTodoForm onClose={onClose} onSubmit={handleAdd} />
          </SafeAreaView>
        </Modal>
        <Button
          enableShadow
          round
          absR
          style={{ position: 'absolute', right: 20, bottom: 40, height: 60, width: 60 }}
          onPress={onOpen}
          backgroundColor={Colors.yellow20}
        >
          <Ionicons name="add" size={32} color={'white'} />
        </Button>
      </>
    )
  }
)

const styles = StyleSheet.create({
  modal: {
    height: '60%',
    marginTop: 'auto',
    borderTopEndRadius: 8,
    borderTopStartRadius: 8,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4.65,
    elevation: 6,
    backgroundColor: 'white',
  },
})
