import { PlanType } from '../constant'

export type TodoType = {
  id: string
  title: string
  description: string | null
  date: {
    start: string
    end: string | null
  } | null
  plan: PlanType
  status: boolean
}
