import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import React from 'react'
import { Keyboard, ScrollView, TextInput } from 'react-native'
import { Colors, Text, View } from 'react-native-ui-lib'
import { PlanType } from '../../constant'
import { useTodoListRoute } from '../../hooks/use-todolist-route'
import { FormError } from './form-items/common'
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
                <Ionicons name="close" size={24} style={{ padding: 16 }} color={Colors.dark40} onPress={props.onClose} />
                <View row centerV>
                  <Text text65M dark10 marginR-10>
                    安排到
                  </Text>
                  <StartTimeField />
                </View>
              </View>
              <Ionicons name="ios-send-sharp" size={18} style={{ padding: 16 }} color={Colors.dark30} onPress={submitForm} />
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
              </View>
            </ScrollView>
          </>
        )
      }}
    </Formik>
  )
}
