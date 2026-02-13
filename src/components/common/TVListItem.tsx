import React, { useState } from 'react'
import { StyleSheet, ViewStyle, Animated, Pressable, View, type PressableProps } from 'react-native'
import { TV_CONFIG, TV_COLORS } from '@/config/tv'
import { createStyle } from '@/utils/tools'

export interface TVListItemProps extends PressableProps {
  children: React.ReactNode
  style?: ViewStyle
  onPress?: () => void
  disabled?: boolean
  left?: React.ReactNode
  right?: React.ReactNode
}

export const TVListItem: React.FC<TVListItemProps> = ({
  children,
  style,
  onPress,
  disabled = false,
  left,
  right,
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
        styles.item,
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
        <View style={styles.container}>
          {left && <View style={styles.left}>{left}</View>}
          <View style={styles.content}>{children}</View>
          {right && <View style={styles.right}>{right}</View>}
        </View>
      </Pressable>
    </Animated.View>
  )
}

const styles = createStyle({
  item: {
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
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left: {
    marginRight: TV_CONFIG.padding.medium,
  },
  content: {
    flex: 1,
  },
  right: {
    marginLeft: TV_CONFIG.padding.medium,
  },
})

export default TVListItem
