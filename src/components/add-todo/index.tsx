import { Ionicons } from '@expo/vector-icons'
import { observer } from 'mobx-react-lite'
import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { Button, Modal } from 'react-native-ui-lib'
import { todoList } from '../../data'
import { AddTodoForm } from './form'
import { AddTodoFormType } from './form.model'

export const AddTodo = observer(
  ({ visible, onClose, onOpen }: { visible: boolean; onClose: () => void; onOpen: () => void }) => {
    const handleAdd = useCallback((form: AddTodoFormType) => {
      todoList.addTodo(form)
      Toast.show({ type: 'success', text1: '添加了一个新的任务到收集箱', text2: form.title, topOffset: 100 })
      onClose()
    }, [])

    return (
      <>
        <Modal animationType="slide" onBackgroundPress={onClose} visible={visible} onRequestClose={onClose}>
          <SafeAreaView>
            <AddTodoForm onClose={onClose} onSubmit={handleAdd} />
          </SafeAreaView>
        </Modal>
        <Button
          enableShadow
          round
          absR
          style={{ position: 'absolute', right: 20, bottom: 40, height: 60, width: 60 }}
          onPress={onOpen}
        >
          <Ionicons name="add" size={32} color={'white'} />
        </Button>
      </>
    )
  }
)
