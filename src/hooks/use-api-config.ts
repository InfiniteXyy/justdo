import { Client } from '@notionhq/client'
import Constants from 'expo-constants'
import create from 'zustand'

type APIConfigState = {
  databaseId: string
  authToken: string
  notion: Client
}

export const useAPIConfig = create<APIConfigState>((set) => ({
  authToken: Constants.manifest?.extra?.devAuthToken || '',
  databaseId: Constants.manifest?.extra?.devDatabaseId || '',
  notion: new Client({ auth: Constants.manifest?.extra?.devAuthToken || '' }),
}))
