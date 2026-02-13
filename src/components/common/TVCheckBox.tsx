import React, { useState } from 'react'
import { StyleSheet, ViewStyle, Animated, Pressable, View, Text, type PressableProps } from 'react-native'
import { TV_CONFIG, TV_COLORS } from '@/config/tv'
import { createStyle } from '@/utils/tools'

export interface TVCheckBoxProps extends PressableProps {
  checked?: boolean
  onChange?: (checked: boolean) => void
  label?: string
  disabled?: boolean
  style?: ViewStyle
}

export const TVCheckBox: React.FC<TVCheckBoxProps> = ({
  checked = false,
  onChange,
  label,
  disabled = false,
  style,
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

  const handlePress = () => {
    if (!disabled && onChange) {
      onChange(!checked)
    }
  }

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ scale: scaleAnim }],
          borderColor: focused ? TV_COLORS.focusBorder : 'transparent',
          backgroundColor: focused ? TV_COLORS.focusBackground : 'transparent',
        },
        style,
      ]}
    >
      <Pressable
        onPress={handlePress}
        onFocus={handleFocus}
        onBlur={handleBlur}
        disabled={disabled}
        style={styles.pressable}
        {...props}
      >
        <View style={styles.content}>
          <View style={[
            styles.checkbox,
            {
              borderColor: checked ? TV_COLORS.focusBorder : 'rgba(0, 0, 0, 0.3)',
              backgroundColor: checked ? TV_COLORS.focusBorder : 'transparent',
            }
          ]}>
            {checked && <View style={styles.checkmark} />}
          </View>
          {label && <Text style={styles.label}>{label}</Text>}
        </View>
      </Pressable>
    </Animated.View>
  )
}

const styles = createStyle({
  container: {
    borderWidth: TV_CONFIG.borderWidthOnFocus,
    borderRadius: TV_CONFIG.borderRadius,
    padding: TV_CONFIG.padding.medium,
    minHeight: TV_CONFIG.minTouchTargetSize,
    marginVertical: TV_CONFIG.padding.small,
  },
  pressable: {
    width: '100%',
    height: '100%',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 28,
    height: 28,
    borderWidth: 2,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: TV_CONFIG.padding.medium,
  },
  checkmark: {
    width: 16,
    height: 16,
    backgroundColor: '#fff',
    borderRadius: 2,
  },
  label: {
    fontSize: 20,
    color: '#000',
  },
})

export default TVCheckBox
