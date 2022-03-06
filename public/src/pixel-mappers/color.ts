import { closestColor } from '../lib/palette.js'
import { PixelMapper } from './types.js'

export const colorMapper: PixelMapper = rgba => {
  const { r, g, b, a } = rgba
  const index = closestColor( r, g, b, a )  

  return [{ t: 15, h: 0 }, { t: index, h: 1 }]
}
