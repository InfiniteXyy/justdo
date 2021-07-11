import dayjs from 'dayjs'
import { observer } from 'mobx-react-lite'
import { Button, Divider, Heading, HStack, Menu, Modal, Pressable, Text } from 'native-base'
import { useCallback, useState } from 'react'
import { TextInput } from 'react-native'
import { todoStore } from '../data'
import { IconChevronDown } from '../icons'
import { AppTitle } from './app-title'

export const HomeTitle = observer(() => {
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleCreateProject = useCallback(() => {
    todoStore.addProject(inputValue)
    setCreateProjectModalOpen(false)
    setInputValue('')
  }, [inputValue])

  return (
    <AppTitle
      header={
        <>
          <Menu
            placement="bottom left"
            trigger={(triggerProps) => {
              return (
                <Pressable {...triggerProps} accessibilityLabel="切换计划组" py="3">
                  <HStack alignItems="center" space={3}>
                    <Heading size="sm" color="gray.800">
                      {todoStore.activeProject.title || 'Loading'}
                    </Heading>
                    <Text color="gray.400">{dayjs().format('MM 月 DD 日')}</Text>
                    <IconChevronDown size="2" color="gray.500" />
                  </HStack>
                </Pressable>
              )
            }}
          >
            <Menu.OptionGroup title="项目" value={todoStore.activeProject.id} type="radio">
              {todoStore.projects.map((project) => {
                return (
                  <Menu.ItemOption
                    key={project.id}
                    value={project.id}
                    onPress={() => todoStore.setActiveProject(project)}
                  >
                    {project.title}
                  </Menu.ItemOption>
                )
              })}
            </Menu.OptionGroup>
            <Divider />
            <Menu.Item onPress={() => setCreateProjectModalOpen(true)}>创建新的项目</Menu.Item>
          </Menu>
          <Modal isOpen={createProjectModalOpen} onClose={() => setCreateProjectModalOpen(false)}>
            <Modal.Content>
              <TextInput placeholder="输入新的项目名" autoFocus onChangeText={setInputValue} />
              <Modal.Footer>
                <Button onPress={handleCreateProject} size="sm" colorScheme="blue">
                  创建
                </Button>
              </Modal.Footer>
            </Modal.Content>
          </Modal>
        </>
      }
    />
  )
})
