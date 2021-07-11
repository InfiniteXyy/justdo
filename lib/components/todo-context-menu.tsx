import { Actionsheet, HStack, Modal, Pressable, Text } from 'native-base'
import React, { useCallback, useMemo, useState } from 'react'
import { TodoStore } from '../data'
import { IconSwitch, IconTrash } from '../icons'

export function useTodoContextMenu() {
  const [isContextOpen, setContextOpen] = useState(false)
  const [switchModalOpen, setSwitchModalOpen] = useState(false)

  const [currentTodoId, setCurrentTodoId] = useState<string>()

  const { deleteTodo, moveTodo } = TodoStore.useActions()
  const { projects, todos } = TodoStore.useState()

  const contextMenu = useMemo(
    () => (
      <Actionsheet isOpen={isContextOpen} onClose={() => setContextOpen(false)}>
        <Actionsheet.Content>
          <Actionsheet.Item
            startIcon={<IconTrash color="red.500" size="6" />}
            onPress={() => {
              if (!currentTodoId) return
              deleteTodo(currentTodoId)
              setContextOpen(false)
            }}
          >
            删除
          </Actionsheet.Item>
          <Actionsheet.Item
            startIcon={<IconSwitch color="gray.400" size="6" />}
            onPress={() => setSwitchModalOpen(true)}
          >
            移动到
          </Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    ),
    [isContextOpen, currentTodoId]
  )

  const switchModal = useMemo(() => {
    const todo = todos.find((i) => i.id === currentTodoId)
    if (!todo) return null
    return (
      <Modal isOpen={switchModalOpen} onClose={() => setSwitchModalOpen(false)}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>移动到</Modal.Header>
          <Modal.Body>
            {projects.map((project) => (
              <Pressable
                key={project.id}
                py="4"
                px="2"
                _pressed={{ backgroundColor: 'gray.100' }}
                rounded="md"
                disabled={todo.projectIds.includes(project.id)}
                onPress={() => {
                  moveTodo(todo.id, project.id)
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
  }, [projects, switchModalOpen, todos])

  return {
    element: (
      <>
        {contextMenu}
        {switchModal}
      </>
    ),
    open: useCallback((todoId: string) => {
      setContextOpen(true)
      setCurrentTodoId(todoId)
    }, []),
  }
}
