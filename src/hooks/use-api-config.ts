import { Client } from '@notionhq/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import create from 'zustand'
import { persist } from 'zustand/middleware'

type APIConfigState = {
  databaseId: string
  authToken: string
  notion: Client
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
      notion: new Client({ auth: '' }),
      setAuthToken(token: string) {
        const client = new Client({ auth: token })
        set({ authToken: token, notion: client })
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
