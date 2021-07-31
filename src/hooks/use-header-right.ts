import React, { useEffect, useState } from 'react'
import { Subject } from 'rxjs'

const headerRightSubject = new Subject<React.ReactNode>()

export function useSubscribeHeaderRight() {
  const [headerRight, setHeaderRight] = useState<React.ReactNode>(null)
  useEffect(() => {
    const subscription = headerRightSubject.subscribe(setHeaderRight)
    return () => subscription.unsubscribe()
  }, [])
  return headerRight
}

export function useHeaderRight(node: React.ReactNode) {
  useEffect(() => {
    headerRightSubject.next(node)
  }, [node])
}
