import { Client } from '@notionhq/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useMemo } from 'react'
import create from 'zustand'
import { persist } from 'zustand/middleware'

type APIConfigState = {
  databaseId: string
  authToken: string
  pageId: string
  setAuthToken(token: string): Client
  setDatabaseId(databaseId: string): void
  setPageId(pageId: string): void
}

export const useAPIConfig = create<APIConfigState>(
  persist(
    (set) => ({
      authToken: '',
      databaseId: '',
      pageId: '',
      setAuthToken(token: string) {
        const client = new Client({ auth: token })
        set({ authToken: token })
        return client
      },
      setDatabaseId(databaseId: string) {
        set({ databaseId })
      },
      setPageId(pageId: string) {
        set({ pageId })
      },
    }),
    {
      name: 'api-config',
      whitelist: ['authToken', 'databaseId', 'pageId'],
      getStorage: () => AsyncStorage,
    }
  )
)

export const useNotion = () => {
  const { authToken } = useAPIConfig()
  return useMemo(() => new Client({ auth: authToken }), [])
}
