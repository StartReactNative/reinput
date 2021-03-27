import { BASE_UNIT } from '../services/constants'

export const overlay = (props) => {
  return {
    alignItems: 'flex-end',
    justifyContent: 'center',
    position: 'absolute',
    // Stretch vertically
    bottom: 0,
    top: 0,
    zIndex: 300,

    right: props.hasTranslateX ? undefined : BASE_UNIT,
    left: props.hasTranslateX ? BASE_UNIT : undefined,
  }
}

/** @param { import('./props').propTypes } props */
export const icon = (props = {}) => {
  if (props.overlay) {
    return overlay(props)
  }
  return {
    alignItems: 'center',
    alignSelf: 'flex-start',
    justifyContent: 'flex-start',
    height: props.iconHeight,
    marginTop: props.marginTop,
    paddingTop: props.iconPaddingTop,
    width: props.iconWidth
  }
}
