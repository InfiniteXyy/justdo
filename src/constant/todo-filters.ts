export const todoFilters = {
  'filter/inbox': { title: '收集箱', icon: 'server' },
  'filter/today': { title: '今日待办', icon: 'sunny', divider: true },
  'filter/next': { title: '下一步行动', icon: 'podium' },
  'filter/tomorrow': { title: '明日待办', icon: 'today' },
  'filter/plan': { title: '日程', icon: 'calendar' },
  'filter/maybe': { title: '将来/也许', icon: 'git-branch' },
  'filter/wait': { title: '等待', icon: 'hand-right' },
  finished: { title: '已完成', icon: 'checkmark', divider: true },
  removed: { title: '回收站', icon: 'trash' },
} as const

export type AllFilterType = keyof typeof todoFilters

export type FilterType = Exclude<AllFilterType, 'finished' | 'removed'>
