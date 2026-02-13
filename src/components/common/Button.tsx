import { useTheme } from '@/store/theme/hook'
import { useMemo, useRef, useImperativeHandle, forwardRef } from 'react'
import { Pressable, type PressableProps, StyleSheet, type View, type ViewProps, Platform } from 'react-native'
import { isTV, TV_CONFIG, TV_STYLES } from '@/config/tv'

export interface BtnProps extends PressableProps {
  ripple?: PressableProps['android_ripple']
  style?: ViewProps['style']
  onChangeText?: (value: string) => void
  onClearText?: () => void
  children: React.ReactNode
  tvFocusable?: boolean
}

export interface BtnType {
  measure: (
    callback: (
      x: number,
      y: number,
      width: number,
      height: number,
      pageX: number,
      pageY: number
    ) => void
  ) => void
}

export default forwardRef<BtnType, BtnProps>(
  ({ ripple: propsRipple = {}, disabled, children, style, tvFocusable = true, ...props }, ref) => {
    const theme = useTheme()
    const btnRef = useRef<View>(null)
    const ripple = useMemo(
      () => ({
        color: theme['c-primary-light-200-alpha-700'],
        ...propsRipple,
      }),
      [theme, propsRipple]
    )

    useImperativeHandle(ref, () => ({
      measure(callback) {
        btnRef.current?.measure(callback)
      },
    }))

    const buttonStyle = useMemo(() => {
      const baseStyle = {
        opacity: disabled ? 0.3 : 1,
      }

      if (isTV) {
        return StyleSheet.compose(
          baseStyle,
          TV_STYLES.button,
          style
        )
      }

      return StyleSheet.compose(baseStyle, style)
    }, [disabled, style])

    return (
      <Pressable
        android_ripple={ripple}
        disabled={disabled}
        style={buttonStyle}
        focusable={isTV ? tvFocusable : undefined}
        {...props}
        ref={btnRef}
      >
        {children}
      </Pressable>
    )
  }
)
