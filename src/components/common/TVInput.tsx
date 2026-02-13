import React, { useState } from 'react'
import { StyleSheet, ViewStyle, Animated, TextInput, View, type TextInputProps } from 'react-native'
import { TV_CONFIG, TV_COLORS } from '@/config/tv'
import { createStyle } from '@/utils/tools'

export interface TVInputProps extends TextInputProps {
  style?: ViewStyle
  placeholder?: string
  value?: string
  onChangeText?: (text: string) => void
  disabled?: boolean
}

export const TVInput: React.FC<TVInputProps> = ({
  style,
  placeholder,
  value,
  onChangeText,
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
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          borderColor: focused ? TV_COLORS.focusBorder : 'rgba(0, 0, 0, 0.1)',
          backgroundColor: focused ? TV_COLORS.focusBackground : 'rgba(255, 255, 255, 0.9)',
        },
        style,
      ]}
    >
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        editable={!disabled}
        placeholderTextColor={TV_COLORS.disabled}
        {...props}
      />
    </Animated.View>
  )
}

const styles = createStyle({
  container: {
    borderWidth: TV_CONFIG.borderWidthOnFocus,
    borderRadius: TV_CONFIG.borderRadius,
    padding: TV_CONFIG.padding.medium,
    minHeight: TV_CONFIG.minTouchTargetSize,
    justifyContent: 'center',
  },
  input: {
    fontSize: 20,
    color: '#000',
  },
})

export default TVInput
