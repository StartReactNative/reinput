import React from 'react'
import { Text, Animated } from 'react-native'

import { defaultProps, propTypes } from './props'
import * as styles from './styles'

/** @augments {React.Component<typeof defaultProps, {}>} */
export default class ReinputLabel extends React.Component {
  static propTypes = propTypes
  static defaultProps = defaultProps

  constructor(props) {
    super(props)

    const isFocused = props.hasValue || props.focused

    this.state = {
      // Ensures animation is not required for the first render
      animatedScale: new Animated.Value(isFocused ? props.labelActiveScale : 1),
      animatedTranslate: new Animated.Value(isFocused ? props.labelActiveTop : 0),
      animatedTranslateX: new Animated.Value(isFocused ? this.props.labelWidth * 0.2 : 0)
    }
  }

  componentDidUpdate(prevProps) {
    const wasActive = prevProps.hasValue || prevProps.focused
    const isActive = this.props.hasValue || this.props.focused
    if (wasActive === isActive) { return }

    const { animatedScale, animatedTranslate, animatedTranslateX } = this.state
    const { labelDuration, labelActiveScale, labelActiveTop } = this.props

    Animated.timing(animatedScale, {
      duration: labelDuration,
      toValue: isActive ? labelActiveScale : 1,
      useNativeDriver: true
    }).start()

    Animated.timing(animatedTranslate, {
      duration: labelDuration,
      toValue: isActive ? labelActiveTop : 0,
      useNativeDriver: true
    }).start()

    Animated.timing(animatedTranslateX, {
      duration: labelDuration,
      toValue: (isActive && this.props.hasTranslateX) ? this.props.labelWidth * 0.2 : 0,
      useNativeDriver: true
    }).start()
  }

  render() {

    return (
      <Animated.View
        numberOfLines={1}
        style={styles.container({
          scale: this.state.animatedScale,
          top: this.props.paddingTop,
          translateY: this.state.animatedTranslate,
          translateX: this.state.animatedTranslateX,
        })}
      >
        <Text style={[styles.label(this.props), { ...this.props.labelStyle, width: (this.props.hasValue || this.props.focused) ? this.props.labelWidth * 1 : this.props.labelWidth }]}>
          {this.props.label}
        </Text>
      </Animated.View>
    )
  }
}
