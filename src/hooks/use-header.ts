import produce, { Draft } from 'immer'
import React from 'react'
import create from 'zustand'

type HeaderState = {
  headerRight?: React.ReactNode
  headerLeft?: React.ReactNode
  leftIcon?: React.ReactNode
  setHeader: (props: { right?: React.ReactNode; left?: React.ReactNode; leftIcon?: React.ReactNode }) => void
}

export const useHeader = create<HeaderState>((set) => ({
  headerLeft: undefined,
  headerRight: undefined,
  setHeader({ left, right, leftIcon }) {
    set(
      produce((draft: Draft<HeaderState>) => {
        draft.headerLeft = left
        draft.headerRight = right
        draft.leftIcon = leftIcon
      })
    )
  },
}))
