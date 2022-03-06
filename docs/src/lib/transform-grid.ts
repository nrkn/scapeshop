import { Point } from '../types.js'
import { bresenham } from './bresenham.js'
import { getViewBox } from './util.js'

export const transformGrid = (grid: Point[]) => {
  const [, top, width, height] = getViewBox(grid)
  const startX = Math.round(height * skewRatio)
  const skewX = bresenham(startX, 0, 0, height).map(([x]) => x)

  return grid.map(
    ({ x, y }, i ) => {
      const skewY = y - top 

      x = width - x + skewX[skewY]

      if( isNaN( x ) ){
        throw Error( `Unexpected NaN x ${ JSON.stringify({ x, y , i })}` )
      }

      if( isNaN( y ) ){
        throw Error( `Unexpected NaN y ${ JSON.stringify({ x, y , i })}` )
      }

      const p: Point = { x, y }

      return p
    }
  )
}

const degreeToSkewRatio = (deg: number) => Math.tan(deg * Math.PI / 180)

const skewRatio = degreeToSkewRatio(30)
