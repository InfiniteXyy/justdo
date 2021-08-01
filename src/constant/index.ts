import { Platform } from 'react-native'

export const todoFilters: Record<string, { title: string; icon: string }> = {
  inbox: { title: '收集箱', icon: 'server' },
  'filter/today': { title: '今日待办', icon: 'sunny' },
  'filter/next': { title: '下一步行动', icon: 'podium' },
  'filter/tomorrow': { title: '明日待办', icon: 'today' },
  'filter/plan': { title: '日程', icon: 'calendar' },
  'filter/maybe': { title: '将来/也许', icon: 'git-branch' },
  'filter/wait': { title: '等待', icon: 'hand-right' },
}

export const isAndroid = Platform.OS === 'android'
