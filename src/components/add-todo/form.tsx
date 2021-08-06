import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import React from 'react'
import { Keyboard, ScrollView, TextInput } from 'react-native'
import { Chip, Colors, Text, View } from 'react-native-ui-lib'
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
          <>
            <View row centerV spread>
              <View row centerV>
                <Ionicons
                  name="close"
                  size={24}
                  style={{ padding: 16 }}
                  color={Colors.dark40}
                  onPress={props.onClose}
                />
                <View row centerV>
                  <Text text65M dark10 marginR-10>
                    添加到
                  </Text>
                  <StartTimeField />
                </View>
              </View>
              <Ionicons
                name="ios-send-sharp"
                size={18}
                style={{ padding: 16 }}
                color={Colors.dark30}
                onPress={submitForm}
              />
            </View>
            <ScrollView onScrollBeginDrag={Keyboard.dismiss}>
              <View marginH-20>
                <TextInput
                  autoFocus
                  placeholder="输入一个简短的标题"
                  value={values.title}
                  onChangeText={handleChange('title')}
                  onBlur={handleBlur('title')}
                  style={{ fontSize: 18, height: 40 }}
                />

                <View style={{ minHeight: 40 }}>
                  <TextInput placeholder="请输入描述" multiline style={{ fontSize: 16 }} />
                </View>

                <FormItemGroup label="更多设置">
                  <FormItem label="优先级">
                    <Chip
                      labelStyle={{ color: Colors.dark40 }}
                      borderRadius={8}
                      containerStyle={{ borderColor: Colors.dark50 }}
                      marginL-10
                      label="P2"
                      leftElement={<Ionicons name="flag" style={{ marginLeft: 10 }} color={Colors.dark40} />}
                    />
                  </FormItem>
                  <FormItem label="重复">
                    <Text>无</Text>
                  </FormItem>
                  <FormItem label="提醒">
                    <Text>无</Text>
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
              </View>
            </ScrollView>
          </>
        )
      }}
    </Formik>
  )
}
