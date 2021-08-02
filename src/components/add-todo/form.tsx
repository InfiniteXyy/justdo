import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import React from 'react'
import { TouchableHighlight } from 'react-native'
import { Colors, DateTimePicker, Switch, Text, TextArea, TextField, View } from 'react-native-ui-lib'
import { AddTodoFormType } from './form.model'

function FormItem(props: { label: string; children: React.ReactNode }) {
  const { label, children } = props
  return (
    <TouchableHighlight onPress={() => {}} style={{ marginHorizontal: -20 }}>
      <View row spread height={40} centerV bg-white paddingH-20>
        <Text dark10>{label}</Text>
        {children}
      </View>
    </TouchableHighlight>
  )
}

function FormItemGroup(props: { label: string; children: React.ReactNode }) {
  const { label, children } = props
  return (
    <View marginT-20>
      <Text tex80 dark20 marginB-10 style={{ fontWeight: '700' }}>
        {label}
      </Text>
      {children}
    </View>
  )
}

export function AddTodoForm(props: { onSubmit: (form: AddTodoFormType) => void }) {
  return (
    <Formik<AddTodoFormType> initialValues={{ description: '', startAt: '', title: '' }} onSubmit={props.onSubmit}>
      {({ submitForm }) => {
        return (
          <>
            <TextField
              autoFocus
              onSubmitEditing={submitForm}
              placeholder="添加待办，输入 Enter 确定"
              underlineColor="transparent"
              containerStyle={{ height: 40 }}
            />
            <View
              style={{
                height: 100,
                borderWidth: 1,
                padding: 10,
                borderRadius: 8,
                borderColor: Colors.dark80,
              }}
            >
              <TextArea placeholder="请输入描述" />
            </View>

            <FormItemGroup label="更多设置">
              <FormItem label="优先级">
                <Ionicons name="ios-flag" size={22} color={'orange'} />
              </FormItem>
              <FormItem label="全天任务">
                <Switch />
              </FormItem>
              <FormItem label="开始时间">
                <DateTimePicker />
              </FormItem>
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
          </>
        )
      }}
    </Formik>
  )
}
