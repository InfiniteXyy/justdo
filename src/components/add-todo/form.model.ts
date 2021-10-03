import * as yup from 'yup'

export const AddTodoFormSchema = yup.object().shape({
  title: yup.string().required('请输入标题'),
})
