import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import React, { useState } from 'react'
import { TextInput } from 'react-native'
import { Colors, DateTimePicker, Switch, Text, TouchableOpacity, View } from 'react-native-ui-lib'
import { AddTodoFormType } from './form.model'

function FormItem(props: { label: string; children: React.ReactNode }) {
  const { label, children } = props
  return (
    <View row spread height={40} centerV>
      <Text text80M dark10>
        {label}
      </Text>
      {children}
    </View>
  )
}

function FormItemGroup(props: { label: string; children: React.ReactNode }) {
  const { label, children } = props
  return (
    <View marginT-20>
      <Text text90 dark20>
        {label}
      </Text>
      {children}
    </View>
  )
}

export function AddTodoForm(props: { onSubmit: (form: AddTodoFormType) => void }) {
  const [showMore, setShowMore] = useState(false)
  return (
    <Formik<AddTodoFormType> initialValues={{ description: '', startAt: '', title: '' }} onSubmit={props.onSubmit}>
      {({ submitForm }) => {
        const moreSettings = (
          <>
            <FormItemGroup label="更多设置">
              <FormItem label="描述">
                <TextInput placeholder="请输入描述" multiline />
              </FormItem>
              <FormItem label="优先级">
                <Text>无</Text>
              </FormItem>
              <FormItem label="全天任务">
                <Switch />
              </FormItem>
              <FormItem label="开始时间">
                <DateTimePicker />
              </FormItem>
            </FormItemGroup>

            <FormItemGroup label="分组设置">
              <FormItem label="情景">
                <Text>无</Text>
              </FormItem>
              <FormItem label="项目">
                <Text>无</Text>
              </FormItem>
              <FormItem label="标签">
                <Text>无</Text>
              </FormItem>
            </FormItemGroup>

            <FormItemGroup label="高级设置">
              <FormItem label="重复">
                <Text>无</Text>
              </FormItem>
              <FormItem label="提醒">
                <Text>无</Text>
              </FormItem>
            </FormItemGroup>
          </>
        )
        return (
          <>
            <TextInput autoFocus onSubmitEditing={submitForm} placeholder="添加待办，输入 Enter 确定" />
            {!showMore && (
              <TouchableOpacity marginT-20 onPress={() => setShowMore(true)} row centerH centerV>
                <Text marginR-10 dark40>
                  显示更多
                </Text>
                <Ionicons name="chevron-down" size={16} color={Colors.dark40} />
              </TouchableOpacity>
            )}
            {showMore && moreSettings}
          </>
        )
      }}
    </Formik>
  )
}
