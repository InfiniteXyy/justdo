import { observer } from 'mobx-react-lite'
import { Fab, Modal, View } from 'native-base'
import { useCallback, useState } from 'react'
import { Platform, TextInput } from 'react-native'
import { todoStore } from '../data'
import { IconPlus } from '../icons'

export const AddTodo = observer(() => {
  const [content, setContent] = useState('')
  const [inputVisible, setInputVisible] = useState(false)

  const handleAdd = useCallback(() => {
    if (content === '') return
    setContent('')
    todoStore.addTodo(content)
    setInputVisible(false)
  }, [content])

  return (
    <View>
      <Modal isOpen={inputVisible} onClose={() => setInputVisible(false)}>
        <Modal.Content
          w="100%"
          safeArea
          {...Platform.select({
            ios: {
              borderBottomRadius: '20px',
              borderTopRadius: '0',
              mb: 'auto',
              mt: '0',
            },
            android: {
              borderBottomRadius: '0px',
              borderTopRadius: '20px',
              mb: '0',
              mt: 'auto',
            },
          })}
        >
          <Modal.Header mb="3">添加一个待办</Modal.Header>
          <Modal.Body p={Platform.select({ ios: '0' })}>
            <TextInput
              onSubmitEditing={handleAdd}
              autoFocus
              onChangeText={setContent}
              placeholder="添加待办，输入 Enter 确定"
            />
          </Modal.Body>
        </Modal.Content>
      </Modal>
      <Fab placement="bottom-right" colorScheme="blue" icon={<IconPlus />} onPress={() => setInputVisible(true)} />
    </View>
  )
})
