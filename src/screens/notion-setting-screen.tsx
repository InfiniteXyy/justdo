import { Formik } from 'formik'
import React from 'react'
import { ScrollView, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Card, Text, View } from 'react-native-ui-lib'
import * as yup from 'yup'
import { FormError } from '../components/add-todo/form-items/common'
import { useAPIConfig } from '../hooks/use-api-config'

export default function NotionSettingScreen() {
  const { authToken, setAuthToken, setDatabaseId } = useAPIConfig()

  return (
    <SafeAreaView>
      <ScrollView>
        <Formik<{ token: string; pageID: string }>
          initialValues={{ token: authToken, pageID: '' }}
          validationSchema={yup.object({
            token: yup.string().required('Token is required'),
            pageID: yup.string().required('Page ID is required'),
          })}
          onSubmit={async (form) => {
            const notion = setAuthToken(form.token)
            const database = await notion.databases.create({
              parent: { page_id: form.pageID },
              title: [
                {
                  type: 'text',
                  text: {
                    content: 'Justdo Database',
                    link: null,
                  },
                },
              ],
              properties: {
                Status: {
                  checkbox: {},
                },
                Title: {
                  title: {},
                },
                Description: {
                  rich_text: {},
                },
                Plan: {
                  select: {
                    options: [
                      {
                        name: 'plan/inbox',
                        color: 'green',
                      },
                      {
                        name: 'plan/next',
                        color: 'blue',
                      },
                      {
                        name: 'plan/maybe',
                        color: 'yellow',
                      },
                      {
                        name: 'plan/wait',
                        color: 'brown',
                      },
                    ],
                  },
                },
                Date: {
                  date: {},
                },
              },
            })
            setDatabaseId(database.id)
          }}
        >
          {({ handleChange, values, handleBlur, submitForm, isSubmitting }) => {
            return (
              <>
                <Text marginL-20 text60 grey20 marginT-20>
                  绑定你的 Notion Page
                </Text>
                <Card margin-20 padding-20>
                  <Text text70>Auth Token</Text>
                  <View marginT-20>
                    <TextInput value={values.token} onChangeText={handleChange('token')} onBlur={handleBlur('token')} autoFocus placeholder="auto token" />
                    <FormError name="token" />
                  </View>
                  <Text marginT-20 text70>
                    Page ID
                  </Text>
                  <View marginT-20>
                    <TextInput value={values.pageID} onChangeText={handleChange('pageID')} onBlur={handleBlur('pageID')} placeholder="page id" />
                    <FormError name="pageID" />
                  </View>
                </Card>
                <Button marginH-20 disabled={isSubmitting} onPress={submitForm}>
                  <Text white>提交</Text>
                </Button>
              </>
            )
          }}
        </Formik>
      </ScrollView>
    </SafeAreaView>
  )
}
