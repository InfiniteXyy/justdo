import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import React from 'react'
import { KeyboardAvoidingView, ScrollView, TextInput } from 'react-native'
import { Colors, Switch, Text, View } from 'react-native-ui-lib'
import { FormItem, FormItemGroup } from './form-items/common'
import { StartTimeField } from './form-items/start-time'
import { AddTodoFormType } from './form.model'

export function AddTodoForm(props: { onSubmit: (form: AddTodoFormType) => void; onClose: () => void }) {
  return (
    <Formik<AddTodoFormType>
      initialValues={{ description: null, startAt: null, title: '', plan: 'filter/inbox' }}
      onSubmit={props.onSubmit}
    >
      {({ submitForm, values, handleChange, handleBlur }) => {
        return (
          <KeyboardAvoidingView behavior="height" style={{ height: '100%' }}>
            <View marginH-16 row centerV spread marginT-20 marginB-10>
              <View row centerV>
                <Ionicons name="close" size={30} color={Colors.dark40} onPress={props.onClose} />
                <Text text60 dark10 marginL-10>
                  添加一个新的待办
                </Text>
              </View>
              <Ionicons name="ios-send-sharp" size={24} color={Colors.dark30} onPress={submitForm} />
            </View>

            <ScrollView>
              <View margin-20>
                <TextInput
                  autoFocus
                  placeholder="输入一个简短的标题"
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  style={{ fontSize: 18, height: 40 }}
                />
                <FormItemGroup label="详细描述">
                  <View style={{ height: 40 }}>
                    <TextInput placeholder="请输入描述" multiline style={{ fontSize: 16 }} />
                  </View>
                </FormItemGroup>
                <FormItemGroup label="更多设置">
                  <FormItem label="优先级">
                    <Text>无</Text>
                  </FormItem>
                  <FormItem label="全天任务">
                    <Switch />
                  </FormItem>
                  <StartTimeField />
                </FormItemGroup>
                <FormItemGroup label="分组设置">
                  <FormItem label="项目">
                    <Text>无</Text>
                  </FormItem>
                  <FormItem label="标签">
                    <Text>无</Text>
                  </FormItem>
                </FormItemGroup>
                <FormItemGroup label="附加设置">
                  <FormItem label="重复">
                    <Text>无</Text>
                  </FormItem>
                  <FormItem label="提醒">
                    <Text>无</Text>
                  </FormItem>
                </FormItemGroup>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        )
      }}
    </Formik>
  )
}
