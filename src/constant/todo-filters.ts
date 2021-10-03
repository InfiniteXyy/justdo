export const todoFilters = {
  'plan/inbox': { title: '收集箱', icon: 'file-tray' },
  'plan/next': { title: '下一步行动', icon: 'rocket' },
  'plan/maybe': { title: '将来/也许', icon: 'git-branch' },
  'plan/wait': { title: '等待', icon: 'hand-right' },
  today: { title: '今日待办', icon: 'sunny', divider: true },
  calendar: { title: '日程', icon: 'calendar' },
  'archived/finished': { title: '已完成', icon: 'checkmark', divider: true },
  'archived/removed': { title: '回收站', icon: 'trash' },
} as const

export type AllFilterType = keyof typeof todoFilters

export type PlanType = { [key in AllFilterType]: key extends `plan/${string}` ? key : never }[AllFilterType]

export const getPlanTitle = (type: AllFilterType) => todoFilters[type].title

export const isPlanType = (type: AllFilterType): type is PlanType => type.startsWith('plan/')
