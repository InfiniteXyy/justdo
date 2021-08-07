import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import React from 'react'
import { Keyboard, ScrollView, TextInput } from 'react-native'
import { Chip, Colors, Text, View } from 'react-native-ui-lib'
import { PlanType } from '../../constant'
import { useTodoListRoute } from '../../hooks/use-todolist-route'
import { FormError, FormItem, FormItemGroup } from './form-items/common'
import { StartTimeField } from './form-items/start-time'
import { AddTodoFormSchema, AddTodoFormType } from './form.model'

export function AddTodoForm(props: { onSubmit: (form: AddTodoFormType) => void; onClose: () => void }) {
  const currentPlan = useTodoListRoute((state) => state.currentKey)
  return (
    <Formik<AddTodoFormType>
      initialValues={{
        description: null,
        startAt: null,
        title: '',
        plan: currentPlan.startsWith('plan') ? (currentPlan as PlanType) : 'plan/inbox',
      }}
      onSubmit={props.onSubmit}
      validationSchema={AddTodoFormSchema}
      validateOnBlur={false}
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
                    安排到
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
                <FormError name="title" />
                <TextInput placeholder="描述" multiline style={{ fontSize: 16 }} />
                <FormItemGroup label="更多设置">
                  <FormItem
                    label="优先级"
                    icon={<Ionicons name="flag" style={{ marginRight: 10 }} color={Colors.dark20} size={18} />}
                  >
                    <Chip
                      labelStyle={{ color: Colors.dark40 }}
                      borderRadius={8}
                      containerStyle={{ borderColor: Colors.dark50 }}
                      label="P2"
                    />
                  </FormItem>
                  <FormItem
                    label="标签"
                    icon={<Ionicons name="pricetag" style={{ marginRight: 10 }} color={Colors.dark20} size={18} />}
                  >
                    <Text>无</Text>
                  </FormItem>
                  <FormItem
                    label="提醒"
                    icon={<Ionicons name="alarm" style={{ marginRight: 10 }} color={Colors.dark20} size={18} />}
                  >
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
