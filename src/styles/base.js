import { Dimensions } from 'react-native'

export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}
  
export const colors  = {
  danger: 'red',
  warning: 'yellow',
  OK: 'green',
  white: 'white',
  grey: '#E8E9EB',
  darkGrey: '#808080',
  lightGrey: '#f5f5f5',
  xlightGrey: '#fafafa'
}

export const padding = {
  xxs: 2,
  xs: 5,
  sm: 10,
  md: 20,
  lg: 30,
  xl: 40
}

export const margin = {
  xs: 2,
  sm: 5,
  md: 10,
  lg: 15,
  xl: 20
}

export const fonts = {
  xs: 10,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  xxl: 35,
  primary: 'Cochin'
}