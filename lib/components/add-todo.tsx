import { Button, Fab, Input, Modal, View } from 'native-base'
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
        <Modal.Content w="100%" pb="0" borderTopRadius="20" borderBottomRadius="0" mb="0" mt="auto">
          <Modal.Body>
            <Input
              onSubmitEditing={handleAdd}
              autoFocus
              variant="unstyled"
              onChangeText={setContent}
              value={content}
              placeholder="添加待办"
            />
          </Modal.Body>
          <Modal.Footer>
            <Button size="sm" onPress={handleAdd} disabled={!content} bgColor="blue.700">
              添加
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <Fab placement="bottom-right" colorScheme="blue" icon={<IconPlus />} onPress={() => setInputVisible(true)} />
    </View>
  )
}
