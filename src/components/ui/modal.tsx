import React, { useEffect } from 'react'
import { StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Text, View } from 'react-native-ui-lib'

interface ModalProps {
  title: string
  visible: boolean
  setVisible: (value: boolean) => void
  children: React.ReactNode
}
// FIXME: 在 reanimated 更新到 2.3 后替换为 Transition API
export function Modal(props: ModalProps) {
  const { visible, setVisible, children, title } = props
  const animProgress = useSharedValue(0)
  const style = useAnimatedStyle(() => ({
    opacity: animProgress.value,
    height: animProgress.value === 0 ? 0 : undefined,
    width: animProgress.value === 0 ? 0 : undefined,
    transform: [{ translateY: (1 - animProgress.value) * 10 }],
  }))

  const overlayStyle = useAnimatedStyle(() => ({
    opacity: animProgress.value,
    height: animProgress.value === 0 ? 0 : undefined,
    width: animProgress.value === 0 ? 0 : undefined,
  }))
  useEffect(() => {
    animProgress.value = withTiming(visible ? 1 : 0, { easing: Easing.ease, duration: 300 })
  }, [visible])

  return (
    <>
      <TouchableWithoutFeedback onPressIn={() => setVisible(false)}>
        <Animated.View style={[styles.overlay, overlayStyle]} />
      </TouchableWithoutFeedback>
      <Animated.View style={[styles.modal, style]}>
        <View padding-18>
          <Text text65 marginB-10>
            {title}
          </Text>
          {children}
        </View>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    shadowOpacity: 0.2,
    shadowColor: 'rgba(0,0,0,0.3)',
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
    borderRadius: 10,
    left: '10%',
    right: '10%',
    top: '10%',
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1,
  },
})
