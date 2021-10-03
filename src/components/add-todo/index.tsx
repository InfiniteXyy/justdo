import { Ionicons } from '@expo/vector-icons'
import React, { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast from 'react-native-toast-message'
import { Button, Colors, Modal } from 'react-native-ui-lib'
import { useCreateTodo } from '../../api'
import { TodoType } from '../../data'
import { useTodoListRoute } from '../../hooks/use-todolist-route'
import { AddTodoForm } from './form'

export const AddTodo = ({ visible, onClose, onOpen }: { visible: boolean; onClose: () => void; onOpen: () => void }) => {
  const { mutateAsync: createTodo } = useCreateTodo()
  const { setCurrentKey } = useTodoListRoute()
  const handleAdd = useCallback(async (form: Omit<TodoType, 'id'>) => {
    await createTodo(form)
    Toast.show({ type: 'success', text1: '添加了一个新的任务到收集箱', text2: form.title })
    setCurrentKey(form.plan)
    onClose()
  }, [])

  return (
    <>
      <Modal animationType="fade" visible={visible} onDismiss={onClose} overlayBackgroundColor="rgba(0, 0, 0, 0.2)" transparent onBackgroundPress={onClose}>
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
        backgroundColor={Colors.primary}
      >
        <Ionicons name="add" size={32} color={'white'} />
      </Button>
    </>
  )
}

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
