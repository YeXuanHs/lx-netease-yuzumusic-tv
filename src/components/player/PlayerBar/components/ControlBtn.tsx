import { TouchableOpacity, Platform, Animated } from 'react-native'
import { Icon } from '@/components/common/Icon'
import { useIsPlay } from '@/store/player/hook'
import { useTheme } from '@/store/theme/hook'
import { playNext, playPrev, togglePlay } from '@/core/player/player'
import { createStyle } from '@/utils/tools'
import { useHorizontalMode } from '@/utils/hooks'
import { TV_CONFIG, TV_COLORS } from '@/config/tv'

const BTN_SIZE = 24
const isTV = Platform.OS === 'android' && Platform.isTV

const handlePlayPrev = () => {
  void playPrev()
}
const handlePlayNext = () => {
  void playNext()
}

const PlayPrevBtn = () => {
  const theme = useTheme()
  const [focused, setFocused] = React.useState(false)
  const scaleAnim = React.useRef(new Animated.Value(1)).current

  const handleFocus = () => {
    if (isTV) {
      setFocused(true)
      Animated.spring(scaleAnim, {
        toValue: TV_CONFIG.scaleOnFocus,
        duration: TV_CONFIG.focusAnimationDuration,
        useNativeDriver: true,
      }).start()
    }
  }

  const handleBlur = () => {
    if (isTV) {
      setFocused(false)
      Animated.spring(scaleAnim, {
        toValue: 1,
        duration: TV_CONFIG.focusAnimationDuration,
        useNativeDriver: true,
      }).start()
    }
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.cotrolBtn,
          isTV && focused ? {
            borderWidth: TV_CONFIG.borderWidthOnFocus,
            borderColor: TV_COLORS.focusBorder,
            backgroundColor: TV_COLORS.focusBackground,
          } : {}
        ]}
        activeOpacity={0.5}
        onPress={handlePlayPrev}
        onFocus={handleFocus}
        onBlur={handleBlur}
        focusable={isTV}
      >
        <Icon name="prevMusic" color={theme['c-button-font']} size={isTV ? 32 : BTN_SIZE} />
      </TouchableOpacity>
    </Animated.View>
  )
}

const PlayNextBtn = () => {
  const theme = useTheme()
  const [focused, setFocused] = React.useState(false)
  const scaleAnim = React.useRef(new Animated.Value(1)).current

  const handleFocus = () => {
    if (isTV) {
      setFocused(true)
      Animated.spring(scaleAnim, {
        toValue: TV_CONFIG.scaleOnFocus,
        duration: TV_CONFIG.focusAnimationDuration,
        useNativeDriver: true,
      }).start()
    }
  }

  const handleBlur = () => {
    if (isTV) {
      setFocused(false)
      Animated.spring(scaleAnim, {
        toValue: 1,
        duration: TV_CONFIG.focusAnimationDuration,
        useNativeDriver: true,
      }).start()
    }
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.cotrolBtn,
          isTV && focused ? {
            borderWidth: TV_CONFIG.borderWidthOnFocus,
            borderColor: TV_COLORS.focusBorder,
            backgroundColor: TV_COLORS.focusBackground,
          } : {}
        ]}
        activeOpacity={0.5}
        onPress={handlePlayNext}
        onFocus={handleFocus}
        onBlur={handleBlur}
        focusable={isTV}
      >
        <Icon name="nextMusic" color={theme['c-button-font']} size={isTV ? 32 : BTN_SIZE} />
      </TouchableOpacity>
    </Animated.View>
  )
}

const TogglePlayBtn = () => {
  const isPlay = useIsPlay()
  const theme = useTheme()
  const [focused, setFocused] = React.useState(false)
  const scaleAnim = React.useRef(new Animated.Value(1)).current

  const handleFocus = () => {
    if (isTV) {
      setFocused(true)
      Animated.spring(scaleAnim, {
        toValue: TV_CONFIG.scaleOnFocus,
        duration: TV_CONFIG.focusAnimationDuration,
        useNativeDriver: true,
      }).start()
    }
  }

  const handleBlur = () => {
    if (isTV) {
      setFocused(false)
      Animated.spring(scaleAnim, {
        toValue: 1,
        duration: TV_CONFIG.focusAnimationDuration,
        useNativeDriver: true,
      }).start()
    }
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[
          styles.cotrolBtn,
          isTV && focused ? {
            borderWidth: TV_CONFIG.borderWidthOnFocus,
            borderColor: TV_COLORS.focusBorder,
            backgroundColor: TV_COLORS.focusBackground,
          } : {}
        ]}
        activeOpacity={0.5}
        onPress={togglePlay}
        onFocus={handleFocus}
        onBlur={handleBlur}
        focusable={isTV}
      >
        <Icon name={isPlay ? 'pause' : 'play'} color={theme['c-button-font']} size={isTV ? 32 : BTN_SIZE} />
      </TouchableOpacity>
    </Animated.View>
  )
}

export default () => {
  const isHorizontalMode = useHorizontalMode()
  return (
    <>
      {/* <TouchableOpacity activeOpacity={0.5} onPress={toggleNextPlayMode}>
        <Text style={{ ...styles.cotrolBtn }}>
          <Icon name={playModeIcon} style={{ color: theme.secondary10 }} size={18} />
        </Text>
      </TouchableOpacity>
    */}
      {/* {btnPrev} */}
      {isHorizontalMode ? <PlayPrevBtn /> : null}
      <TogglePlayBtn />
      <PlayNextBtn />
    </>
  )
}

const styles = createStyle({
  cotrolBtn: {
    width: 46,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',

    // backgroundColor: '#ccc',
    shadowOpacity: 1,
    textShadowRadius: 1,
  },
})
