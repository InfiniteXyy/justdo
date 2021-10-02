import { Ionicons } from '@expo/vector-icons'
import dayjs from 'dayjs'
import { useFormikContext } from 'formik'
import React, { useMemo, useState } from 'react'
import { Chip, Colors } from 'react-native-ui-lib'
import { todoFilters } from '../../../constant'
import { ModalMenu } from '../../ui'
import { AddTodoFormType } from '../form.model'

export function StartTimeField() {
  const [modalVisible, setModalVisible] = useState(false)
  const { values, setFieldValue } = useFormikContext<AddTodoFormType>()

  const valueDisplay = useMemo(() => {
    if (values.startAt) return dayjs(values.startAt).format('MM 月 DD 日')
    return todoFilters[values.plan].title
  }, [values])

  return (
    <>
      <Chip
        backgroundColor={Colors.dark20}
        labelStyle={{ color: 'white' }}
        borderRadius={8}
        containerStyle={{ borderWidth: 0 }}
        label={valueDisplay}
        rightElement={<Ionicons name="caret-down" color={Colors.white} style={{ marginRight: 8 }} />}
        onPress={() => setModalVisible(true)}
      />
      <ModalMenu
        visible={modalVisible}
        setVisible={setModalVisible}
        title="安排到"
        menu={Object.entries(todoFilters).map(([key, value]) => ({
          iconName: value.icon,
          title: value.title,
          onPress: () => setFieldValue('plan', key),
          hidden: !key.startsWith('plan'),
        }))}
      />
    </>
  )
}
