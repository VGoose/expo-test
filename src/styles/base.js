import { Dimensions } from 'react-native'

// Iphone Res Width
// SE: 640
// 6-7-8: 750
// 6P-7P-8P: 1080
// X: 1125
export const dimensions = {
  fullHeight: Dimensions.get('window').height,
  fullWidth: Dimensions.get('window').width
}
export const fonts = (() => {
  const width = dimensions.fullWidth
  if(width <= 750) {
    return {
      xs: 8,
      sm: 11,
      md: 14,
      lg: 18,
      xl: 24,
      xxl: 29,
      primary: 'Cochin'
    }
  }else {
    return {
      xs: 10,
      sm: 12,
      md: 16,
      lg: 20,
      xl: 28,
      xxl: 35, 
      primary: 'Cochin'
    }
  }
})()

  
export const colors  = {
  danger: 'red',
  warning: 'yellow',
  OK: 'green',
  white: 'white',
  grey: '#E8E9EB',
  darkGrey: '#808080',
  lightGrey: '#f5f5f5',
  xlightGrey: '#fafafa',
  black: 'black'
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
