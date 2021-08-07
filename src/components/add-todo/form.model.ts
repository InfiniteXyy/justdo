import * as yup from 'yup'
import { PlanType } from '../../constant'
export interface AddTodoFormType {
  title: string
  description: string | null
  startAt: string | null
  plan: PlanType
}

export const AddTodoFormSchema = yup.object().shape({
  title: yup.string().required('请输入标题'),
})
