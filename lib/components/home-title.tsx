import dayjs from 'dayjs'
import { Button, Divider, Heading, HStack, Menu, Modal, Pressable, Text, TextField } from 'native-base'
import React, { useState } from 'react'
import { TodoStore } from '../data'
import { IconChevronDown } from '../icons'
import { AppTitle } from './app-title'

export function HomeTitle() {
  const [{ projects, currentProjectId }, { setCurrentProjectId, addProject }] = TodoStore.use((state) => ({
    projects: state.projects,
    currentProjectId: state.currentProjectId,
  }))
  const { currentProject } = TodoStore.useComputed()
  const [createProjectModalOpen, setCreateProjectModalOpen] = useState(false)
  const [inputValue, setInputValue] = useState('')

  const handleCreateProject = () => {
    addProject(inputValue)
    setCreateProjectModalOpen(false)
    setInputValue('')
  }
  return (
    <AppTitle
      header={
        <>
          <Menu
            placement="bottom left"
            trigger={(triggerProps) => {
              return (
                <Pressable {...triggerProps} accessibilityLabel="切换计划组">
                  <HStack alignItems="center" space={3}>
                    <Heading size="sm" color="gray.800">
                      {currentProject?.title || 'Loading'}
                    </Heading>
                    <Text color="gray.400">{dayjs().format('MM 月 DD 日')}</Text>
                    <IconChevronDown size="2" color="gray.500" />
                  </HStack>
                </Pressable>
              )
            }}
          >
            <Menu.OptionGroup title="项目" value={currentProjectId} type="radio">
              {projects.map((project) => {
                return (
                  <Menu.ItemOption key={project.id} value={project.id} onPress={() => setCurrentProjectId(project.id)}>
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
              <TextField
                variant="unstyled"
                placeholder="输入新的项目名"
                value={inputValue}
                onChangeText={setInputValue}
              />
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
}
