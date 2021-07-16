import { Ionicons } from '@expo/vector-icons'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { KeyboardAvoidingView, TextInput } from 'react-native'
import { Button, Colors, Modal, Text, View } from 'react-native-ui-lib'
import { todoList } from '../../data'
import { Tag } from '../ui'

export const AddTodo = observer(() => {
  const [content, setContent] = useState('')
  const [inputVisible, setInputVisible] = useState(false)
  const inputRef = useRef<TextInput | null>(null)

  const handleAdd = useCallback(() => {
    if (content === '') return
    setContent('')
    todoList.addTodo(content)
    setInputVisible(false)
  }, [content])

  useEffect(() => {
    if (inputVisible) {
      setTimeout(() => inputRef.current?.focus(), 50)
    } else {
      inputRef.current?.blur()
    }
  }, [inputVisible])

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
          <View marginH-16 spread marginT-30>
            <Text text60>添加一个新的事项</Text>
          </View>
          <View margin-20>
            <TextInput
              ref={inputRef}
              onSubmitEditing={handleAdd}
              onChangeText={setContent}
              placeholder="添加待办，输入 Enter 确定"
            />
            <View row right>
              <Tag name="优先级" />
              <Tag name="关联到" />
            </View>
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
