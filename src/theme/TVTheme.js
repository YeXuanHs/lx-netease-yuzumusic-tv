import { Platform } from 'react-native'

export const isTV = Platform.isTV

export const TV_CONFIG = {
  isTV: Platform.isTV,
  minFocusWidth: 2,
  minFocusHeight: 2,
  focusAnimationDuration: 200,
  scaleOnFocus: 1.05,
}

export const TV_STYLES = {
  button: {
    minHeight: 60,
    minWidth: 120,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  listItem: {
    minHeight: 80,
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  touchable: {
    minHeight: 50,
  },
  input: {
    minHeight: 50,
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  card: {
    minHeight: 120,
    paddingVertical: 20,
    paddingHorizontal: 24,
  },
}

export const TV_LAYOUT = {
  padding: {
    small: 12,
    medium: 20,
    large: 32,
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
  },
  borderRadius: {
    small: 4,
    medium: 8,
    large: 12,
  },
}

export const TV_FOCUS_STYLES = {
  default: {
    borderWidth: 2,
    borderColor: '#4eb17d',
    borderRadius: 4,
  },
  primary: {
    borderWidth: 3,
    borderColor: '#4eb17d',
    borderRadius: 6,
  },
  secondary: {
    borderWidth: 2,
    borderColor: '#666',
    borderRadius: 4,
  },
}
