import React, { useEffect } from 'react'
import { StyleSheet, TouchableHighlight, TouchableWithoutFeedback } from 'react-native'
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Text, View } from 'react-native-ui-lib'

interface DropdownMenuProps {
  menuItems: { label: string; onPress: () => void; icon?: React.ReactNode }[]
  visible: boolean
  setVisible: (value: boolean) => void
  position: { top: number; right: number }
}
export function DropdownMenu(props: DropdownMenuProps) {
  const { menuItems, position, visible, setVisible } = props
  const animProgress = useSharedValue(0)
  const style = useAnimatedStyle(() => ({
    opacity: animProgress.value,
    height: animProgress.value === 0 ? 0 : undefined,
    transform: [
      { translateY: -(1 - animProgress.value) * 100 },
      { translateX: (1 - animProgress.value) * 100 },
      { scale: animProgress.value },
    ],
  }))

  useEffect(() => {
    animProgress.value = withTiming(visible ? 1 : 0, { easing: Easing.ease, duration: 300 })
  }, [visible])

  return (
    <>
      {visible && (
        <TouchableWithoutFeedback style={styles.overlay} onPressIn={() => setVisible(false)}>
          <View style={[styles.overlay]} />
        </TouchableWithoutFeedback>
      )}
      <Animated.View style={[styles.dropdown, position, style]}>
        {menuItems.map((i) => (
          <TouchableHighlight key={i.label} onPress={i.onPress}>
            <View height={40} row centerV paddingH-20 bg-white>
              {i.icon}
              <Text>{i.label}</Text>
            </View>
          </TouchableHighlight>
        ))}
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
    zIndex: 1000,
  },
  dropdown: {
    // shadowOpacity: 0.2,
    // shadowColor: 'rgba(0,0,0,0.3)',
    // shadowRadius: 3,
    // shadowOffset: { width: 0, height: 4 },
    // elevation: 3,
    backgroundColor: 'white',
    position: 'absolute',
    width: 200,
    borderWidth: 1,
    borderColor: '#ababab',
  },
})
