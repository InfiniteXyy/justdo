import { Ionicons } from '@expo/vector-icons'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useState } from 'react'
import { KeyboardAvoidingView, TextInput } from 'react-native'
import { Button, Colors, Modal, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import { todoList } from '../../data'
import { Tag } from '../ui'

export const AddTodo = observer(() => {
  const [content, setContent] = useState('')
  const [inputVisible, setInputVisible] = useState(false)
  const [editType, setEditType] = useState<'todo' | 'project'>('todo')

  const handleAdd = useCallback(() => {
    if (content === '') return
    setContent('')
    todoList.addTodo(content)
    setInputVisible(false)
  }, [content])

  function renderDialog() {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        onBackgroundPress={() => setInputVisible(false)}
        visible={inputVisible}
        overlayBackgroundColor={'rgba(0,0,0,0.2)'}
      >
        <KeyboardAvoidingView
          style={{
            marginTop: 'auto',
            backgroundColor: Colors.white,
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
          behavior="padding"
        >
          <View marginH-16 row centerV spread marginT-30>
            <Text text60>{editType === 'todo' ? '添加一个新的待办' : '添加一个新的项目'}</Text>
            <TouchableOpacity
              br20
              bg-dark80
              padding-2
              onPress={() => setEditType(editType === 'todo' ? 'project' : 'todo')}
            >
              <Ionicons name="swap-horizontal" size={18} color={Colors.dark30} />
            </TouchableOpacity>
          </View>
          <View margin-20>
            <TextInput
              autoFocus
              onSubmitEditing={handleAdd}
              onChangeText={setContent}
              placeholder="添加待办，输入 Enter 确定"
            />
            {editType === 'todo' && (
              <View row right>
                <Tag name="优先级" />
                <Tag name="关联到" />
              </View>
            )}
          </View>
        </KeyboardAvoidingView>
      </Modal>
    )
  }

  function renderFab() {
    if (inputVisible) return null
    return (
      <Button
        bg-dark10
        round
        onPress={() => setInputVisible(true)}
        style={{ right: 0, bottom: 0, position: 'absolute' }}
        margin-20
        enableShadow
      >
        <Ionicons name="add" size={40} color="white" />
      </Button>
    )
  }

  return (
    <>
      {renderDialog()}
      {renderFab()}
    </>
  )
})
