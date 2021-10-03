import { Formik } from 'formik'
import React from 'react'
import { ScrollView, TextInput } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button, Card, Text, View } from 'react-native-ui-lib'
import * as yup from 'yup'
import { getDatabaseProperties } from '../api/utils'
import { FormError } from '../components/add-todo/form-items/common'
import { useAPIConfig } from '../hooks/use-api-config'

export default function NotionSettingScreen() {
  const { authToken, setAuthToken, setDatabaseId, databaseId, pageId, setPageId } = useAPIConfig()

  return (
    <SafeAreaView>
      <ScrollView>
        <Formik<{ token: string; pageID: string }>
          initialValues={{ token: authToken, pageID: pageId }}
          validationSchema={yup.object({
            token: yup.string().required('Token is required'),
            pageID: yup.string().required('Page ID is required'),
          })}
          onSubmit={async (form) => {
            const notion = setAuthToken(form.token)
            const database = await notion.databases.create({
              parent: { page_id: form.pageID },
              title: [{ type: 'text', text: { content: 'Justdo Database' } }],
              properties: getDatabaseProperties(),
            })
            setDatabaseId(database.id)
            setPageId(form.pageID)
          }}
        >
          {({ handleChange, values, handleBlur, submitForm, isSubmitting }) => {
            return (
              <>
                <View marginH-20>
                  <Text marginV-10 text60 grey20>
                    绑定你的 Notion Page
                  </Text>
                  <Text text70B>Database ID</Text>
                  <View marginT-10>
                    <TextInput value={databaseId} editable={false} />
                  </View>
                </View>
                <Card margin-20 padding-20>
                  <Text text70B>Auth Token</Text>
                  <View marginT-20>
                    <TextInput value={values.token} onChangeText={handleChange('token')} onBlur={handleBlur('token')} autoFocus placeholder="auto token" />
                    <FormError name="token" />
                  </View>
                  <Text marginT-20 text70B>
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
