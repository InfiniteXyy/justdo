import { Fab, Input, Modal, View } from 'native-base'
import { useState } from 'react'
import { TodoStore } from '../data'
import { IconPlus } from '../icons'

export function AddTodo() {
  const { addTodo } = TodoStore.useActions()
  const [content, setContent] = useState('')
  const [inputVisible, setInputVisible] = useState(false)

  const handleAdd = () => {
    if (content === '') return
    setContent('')
    addTodo(content)
    setInputVisible(false)
  }

  return (
    <View>
      <Modal isOpen={inputVisible} onClose={() => setInputVisible(false)}>
        <Modal.Content w="100%" borderTopRadius="0" safeArea borderBottomRadius="20" mb="auto" mt="0">
          <Modal.Header>添加一个事件</Modal.Header>
          <Modal.Body p="0">
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
}
