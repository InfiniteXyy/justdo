import { Client } from '@notionhq/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import create from 'zustand'
import { persist } from 'zustand/middleware'

type APIConfigState = {
  databaseId: string
  authToken: string
  notion: Client
  setAuthToken(token: string): Client
  setDatabaseId(databaseId: string): void
}

export const useAPIConfig = create<APIConfigState>(
  persist(
    (set) => ({
      authToken: '',
      databaseId: '',
      notion: new Client({ auth: '' }),
      setAuthToken(token: string) {
        const client = new Client({ auth: token })
        set({ authToken: token, notion: client })
        return client
      },
      setDatabaseId(databaseId: string) {
        set({ databaseId })
      },
    }),
    {
      name: 'api-config',
      whitelist: ['authToken', 'databaseId'],
      getStorage: () => AsyncStorage,
    }
  )
)
