import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { Animated, Easing } from 'react-native'
import { Colors } from 'react-native-ui-lib'

export const Spinner = ({ margin = 16 }: { margin?: number }) => {
  const [spinAnim] = useState(new Animated.Value(0))
  const spin = spinAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  })

  useEffect(() => {
    const anim = Animated.loop(
      Animated.timing(spinAnim, {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    )
    anim.start()
    return () => anim.stop()
  }, [])

  return (
    <Animated.View style={{ height: 18, width: 18, transform: [{ rotate: spin }], margin }}>
      <MaterialCommunityIcons name="loading" size={18} color={Colors.grey30} />
    </Animated.View>
  )
}
