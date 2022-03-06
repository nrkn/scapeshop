import { Tuple3 } from '../types.js'

export const rgbToHsl = (r = 0, g = 0, b = 0) => {
  r /= 255
  g /= 255
  b /= 255
  
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const d = max - min
  
  let h = 0

  if( d !== 0 ){
    if (max === r) h = (g - b) / d % 6
    else if (max === g) h = (b - r) / d + 2
    else if (max === b) h = (r - g) / d + 4  
  }

  
  let l = (min + max) / 2
  let s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1))
  
  h = Math.floor( h * 60 ) % 360
  
  while( h < 0 ) h += 360

  s = Math.floor( s * 100 )
  l = Math.floor( l * 100 )

  const hsl: Tuple3 = [ h, s, l ]

  return hsl
}

export const getL = ( r = 0, g = 0, b = 0 ) => ( 0.2126*r + 0.7152*g + 0.0722*b ) / 255

