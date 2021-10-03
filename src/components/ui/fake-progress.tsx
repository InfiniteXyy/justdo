import React, { useEffect, useState } from 'react'
import { Colors, ProgressBar, View } from 'react-native-ui-lib'

export function FakeProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((progress) => Math.min(100, progress + 25))
    }, 300)
    return () => clearInterval(interval)
  }, [])

  return (
    <View absT absL absR>
      <ProgressBar progress={progress} style={{ borderRadius: 0, height: 4 }} progressColor={Colors.blue10} />
    </View>
  )
}
