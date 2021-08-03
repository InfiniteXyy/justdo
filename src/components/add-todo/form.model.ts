import { FilterType } from '../../constant'

export interface AddTodoFormType {
  title: string
  description: string | null
  startAt: string | null
  plan: FilterType
}
