import { Platform } from 'react-native'

export const TV_CONFIG = {
  isTV: Platform.OS === 'android' && Platform.isTV,
  minTouchTargetSize: 48,
  focusAnimationDuration: 150,
  scaleOnFocus: 1.05,
  borderWidthOnFocus: 3,
  padding: {
    small: 8,
    medium: 16,
    large: 24,
  },
  borderRadius: 8,
}

export const TV_COLORS = {
  focusBorder: '#4CAF50',
  focusBackground: 'rgba(76, 175, 80, 0.1)',
  disabled: 'rgba(0, 0, 0, 0.26)',
}

export const TV_STYLES = {
  listItem: {
    minHeight: 64,
    padding: 12,
    marginVertical: 4,
  },
  button: {
    minHeight: 48,
    padding: 12,
  },
  input: {
    minHeight: 48,
    padding: 12,
    fontSize: 20,
  },
}

export const isTV = TV_CONFIG.isTV
