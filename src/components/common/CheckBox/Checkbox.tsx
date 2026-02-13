import * as React from 'react'
import { Animated, type GestureResponderEvent, StyleSheet, View, Pressable, Platform } from 'react-native'

import { Icon } from '../Icon'
import { createStyle } from '@/utils/tools'
import { scaleSizeW } from '@/utils/pixelRatio'
import { TV_CONFIG, TV_COLORS } from '@/config/tv'

export interface Props {
  /**
   * Status of checkbox.
   */
  status: 'checked' | 'unchecked' | 'indeterminate'
  /**
   * Whether checkbox is disabled.
   */
  disabled?: boolean
  /**
   * Function to execute on press.
   */
  onPress?: (e: GestureResponderEvent) => void

  size?: number

  /**
   * Custom color for checkbox.
   */
  tintColors: {
    true: string
    false: string
  }
}

const ANIMATION_DURATION = 200
const PADDING = scaleSizeW(4)

const isTV = Platform.OS === 'android' && Platform.isTV

/**
 * Checkboxes allow the selection of multiple options from a set.
 * This component follows platform guidelines for Android, but can be used
 * on any platform.
 */
const Checkbox = ({ status, disabled, size = 1, onPress, tintColors, ...rest }: Props) => {
  const checked = status === 'checked'
  const indeterminate = status === 'indeterminate'

  const icon = indeterminate ? 'minus-box' : 'checkbox-marked'

  const { current: scaleAnim } = React.useRef<Animated.Value>(new Animated.Value(checked ? 1 : 0))
  const { current: focusScaleAnim } = React.useRef<Animated.Value>(new Animated.Value(1))
  const [focused, setFocused] = React.useState(false)

  const isFirstRendering = React.useRef<boolean>(true)

  React.useEffect(() => {
    // Do not run animation on very first rendering
    if (isFirstRendering.current) {
      isFirstRendering.current = false
      return
    }

    Animated.timing(scaleAnim, {
      toValue: checked ? 1 : 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start()
  }, [checked, scaleAnim])

  const handleFocus = () => {
    if (isTV) {
      setFocused(true)
      Animated.spring(focusScaleAnim, {
        toValue: TV_CONFIG.scaleOnFocus,
        duration: TV_CONFIG.focusAnimationDuration,
        useNativeDriver: true,
      }).start()
    }
  }

  const handleBlur = () => {
    if (isTV) {
      setFocused(false)
      Animated.spring(focusScaleAnim, {
        toValue: 1,
        duration: TV_CONFIG.focusAnimationDuration,
        useNativeDriver: true,
      }).start()
    }
  }

  const containerStyle = {
    ...styles.container,
    padding: isTV ? TV_CONFIG.padding.medium : PADDING,
    marginLeft: isTV ? -TV_CONFIG.padding.medium : -PADDING,
    minHeight: isTV ? TV_CONFIG.minTouchTargetSize : undefined,
    borderWidth: isTV && focused ? TV_CONFIG.borderWidthOnFocus : 0,
    borderColor: isTV && focused ? TV_COLORS.focusBorder : 'transparent',
    borderRadius: isTV ? TV_CONFIG.borderRadius : 0,
    backgroundColor: isTV && focused ? TV_COLORS.focusBackground : 'transparent',
  }

  return (
    <Pressable
      {...rest}
      onPress={onPress}
      disabled={disabled}
      onFocus={handleFocus}
      onBlur={handleBlur}
      accessibilityRole="checkbox"
      accessibilityState={{ disabled, checked }}
      accessibilityLiveRegion="polite"
      style={containerStyle}
    >
      <Animated.View style={{ transform: [{ scale: focusScaleAnim }] }}>
        <Icon
          allowFontScaling={false}
          name="checkbox-blank-outline"
          size={isTV ? 32 * size : 24 * size}
          color={tintColors.false}
        />
        <View style={[StyleSheet.absoluteFill, styles.fillContainer]}>
          <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
            <Icon allowFontScaling={false} name={icon} size={isTV ? 32 * size : 24 * size} color={tintColors.true} />
          </Animated.View>
        </View>
      </Animated.View>
    </Pressable>
  )
}

Checkbox.displayName = 'Checkbox'

const styles = createStyle({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  fillContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default Checkbox
