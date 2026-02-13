import React, { useState } from 'react'
import { StyleSheet, ViewStyle, Animated, Pressable, type PressableProps } from 'react-native'
import { TV_CONFIG, TV_COLORS } from '@/config/tv'
import { createStyle } from '@/utils/tools'

export interface TVButtonProps extends PressableProps {
  children: React.ReactNode
  style?: ViewStyle
  onPress?: () => void
  disabled?: boolean
}

export const TVButton: React.FC<TVButtonProps> = ({
  children,
  style,
  onPress,
  disabled = false,
  ...props
}) => {
  const [focused, setFocused] = useState(false)
  const scaleAnim = React.useRef(new Animated.Value(1)).current

  const handleFocus = () => {
    setFocused(true)
    Animated.spring(scaleAnim, {
      toValue: TV_CONFIG.scaleOnFocus,
      duration: TV_CONFIG.focusAnimationDuration,
      useNativeDriver: true,
    }).start()
  }

  const handleBlur = () => {
    setFocused(false)
    Animated.spring(scaleAnim, {
      toValue: 1,
      duration: TV_CONFIG.focusAnimationDuration,
      useNativeDriver: true,
    }).start()
  }

  return (
    <Animated.View
      style={[
        styles.button,
        {
          transform: [{ scale: scaleAnim }],
          borderColor: focused ? TV_COLORS.focusBorder : 'transparent',
          backgroundColor: focused ? TV_COLORS.focusBackground : 'transparent',
        },
        style,
      ]}
    >
      <Pressable
        onPress={onPress}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        style={styles.pressable}
        {...props}
      >
        {children}
      </Pressable>
    </Animated.View>
  )
}

const styles = createStyle({
  button: {
    borderWidth: TV_CONFIG.borderWidthOnFocus,
    borderRadius: TV_CONFIG.borderRadius,
    padding: TV_CONFIG.padding.medium,
    minHeight: TV_CONFIG.minTouchTargetSize,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pressable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default TVButton
