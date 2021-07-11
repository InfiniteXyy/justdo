import { observer } from 'mobx-react-lite'
import { Fab, Input, Modal, View } from 'native-base'
import { useState } from 'react'
import { Platform } from 'react-native'
import { todoStore } from '../data'
import { IconPlus } from '../icons'

export const AddTodo = observer(() => {
  const [content, setContent] = useState('')
  const [inputVisible, setInputVisible] = useState(false)

  const handleAdd = () => {
    if (content === '') return
    setContent('')
    todoStore.addTodo(content)
    setInputVisible(false)
  }

  return (
    <View>
      <Modal isOpen={inputVisible} onClose={() => setInputVisible(false)}>
        <Modal.Content w="100%" borderTopRadius="0" safeArea borderBottomRadius="20" mb="auto" mt="0">
          <Modal.Header>添加一个待办</Modal.Header>
          <Modal.Body p="0" pb={Platform.select({ android: '4' })}>
            <Input
              onSubmitEditing={handleAdd}
              autoFocus
              p="0"
              mt="3"
              variant="unstyled"
              onChangeText={setContent}
              value={content}
              placeholder="添加待办，输入 Enter 确定"
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Fab placement="bottom-right" colorScheme="blue" icon={<IconPlus />} onPress={() => setInputVisible(true)} />
    </View>
  )
})
