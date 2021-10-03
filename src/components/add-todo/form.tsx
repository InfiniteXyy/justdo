import { Ionicons } from '@expo/vector-icons'
import { Formik } from 'formik'
import React from 'react'
import { Keyboard, ScrollView, TextInput } from 'react-native'
import { Colors, Text, View } from 'react-native-ui-lib'
import { isPlanType } from '../../constant'
import { TodoType } from '../../data'
import { useTodoListRoute } from '../../hooks/use-todolist-route'
import { Spinner } from '../ui'
import { FormError } from './form-items/common'
import { StartTimeField } from './form-items/start-time'
import { AddTodoFormSchema } from './form.model'

export function AddTodoForm(props: { onSubmit: (form: Omit<TodoType, 'id'>) => Promise<void>; onClose: () => void }) {
  const currentPlan = useTodoListRoute((state) => state.currentKey)
  return (
    <Formik<Omit<TodoType, 'id'>>
      initialValues={{
        plan: isPlanType(currentPlan) ? currentPlan : 'plan/inbox',
        description: null,
        title: '',
        date: null,
        status: false,
      }}
      onSubmit={props.onSubmit}
      validationSchema={AddTodoFormSchema}
      validateOnBlur={false}
    >
      {({ submitForm, values, handleChange, handleBlur, isSubmitting }) => {
        return (
          <>
            <View row centerV spread>
              <View row centerV>
                <Ionicons name="close" size={24} style={{ padding: 16 }} color={Colors.grey40} onPress={props.onClose} />
                <View row centerV>
                  <Text text65M grey10 marginR-10>
                    安排到
                  </Text>
                  <StartTimeField />
                </View>
              </View>
              {isSubmitting ? <Spinner /> : <Ionicons name="ios-send-sharp" size={18} style={{ padding: 16 }} color={Colors.grey30} onPress={submitForm} />}
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
