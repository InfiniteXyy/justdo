import { Actionsheet, HStack, Modal, Pressable, Text } from 'native-base'
import React, { useCallback, useState } from 'react'
import { ITodo, todoStore } from '../data'
import { IconSwitch, IconTrash } from '../icons'

// 长按列表项打开的菜单
export function useTodoContextMenu() {
  const [isContextOpen, setContextOpen] = useState(false)
  const [switchModalOpen, setSwitchModalOpen] = useState(false)

  const [currentTodo, setCurrentTodo] = useState<ITodo>()

  const contextMenu = (
    <Actionsheet isOpen={isContextOpen} onClose={() => setContextOpen(false)} key="action-sheet">
      <Actionsheet.Content>
        <Actionsheet.Item
          startIcon={<IconTrash color="red.500" size="6" />}
          onPress={() => {
            currentTodo?.remove()
            setContextOpen(false)
          }}
        >
          删除
        </Actionsheet.Item>
        <Actionsheet.Item startIcon={<IconSwitch color="gray.400" size="6" />} onPress={() => setSwitchModalOpen(true)}>
          移动到
        </Actionsheet.Item>
      </Actionsheet.Content>
    </Actionsheet>
  )

  const switchModal = (
    <Modal isOpen={switchModalOpen} onClose={() => setSwitchModalOpen(false)} key="switch-modal">
      <Modal.Content>
        <Modal.CloseButton />
        <Modal.Header>移动到</Modal.Header>
        <Modal.Body>
          {todoStore.projects.map((project) => (
            <Pressable
              key={project.id}
              py="4"
              px="2"
              _pressed={{ backgroundColor: 'gray.100' }}
              rounded="md"
              disabled={currentTodo?.projectId === project.id}
              onPress={() => {
                currentTodo?.moveTodo(project)
                setSwitchModalOpen(false)
                setContextOpen(false)
              }}
            >
              <HStack>
                <Text>{project.title}</Text>
              </HStack>
            </Pressable>
          ))}
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )

  return {
    element: (
      <>
        {contextMenu}
        {switchModal}
      </>
    ),
    open: useCallback((todo: ITodo) => {
      setContextOpen(true)
      setCurrentTodo(todo)
    }, []),
  }
}
