import dayjs from 'dayjs'
import { useFormikContext } from 'formik'
import React, { useMemo, useState } from 'react'
import { Text } from 'react-native-ui-lib'
import { todoFilters } from '../../../constant'
import { ModalMenu } from '../../ui'
import { AddTodoFormType } from '../form.model'
import { FormItem } from './common'

export function StartTimeField() {
  const [modalVisible, setModalVisible] = useState(false)
  const { values, setFieldValue } = useFormikContext<AddTodoFormType>()

  const valueDisplay = useMemo(() => {
    if (values.startAt) return <Text>{dayjs(values.startAt).format('MM 月 DD 日')}</Text>
    if (values.plan !== 'filter/inbox')
      return <Text style={{ fontWeight: 'bold' }}>{todoFilters[values.plan].title}</Text>
    return <Text>无</Text>
  }, [values])

  return (
    <>
      <FormItem label="开始时间" onPress={() => setModalVisible(true)}>
        {valueDisplay}
      </FormItem>
      <ModalMenu
        visible={modalVisible}
        setVisible={setModalVisible}
        title="开始时间"
        menu={Object.entries(todoFilters).map(([key, value]) => ({
          iconName: value.icon,
          title: value.title,
          onPress: () => {
            setFieldValue('plan', key)
          },
          hidden: !key.startsWith('filter'),
        }))}
      />
    </>
  )
}
