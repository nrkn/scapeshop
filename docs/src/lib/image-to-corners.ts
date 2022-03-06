import { CornerData, Point, Size } from '../types.js'
import { PixelMapper, PixelMapperData } from '../pixel-mappers/types.js'
import { transformGrid } from './transform-grid.js'
import { clone, getViewBox } from './util.js'

// special
const xOff = 0

export const imageToCorners = (
  grid: Point[],
  sourceImage: ImageData,
  pixelMapper: PixelMapper,
  offset: Point = { x: 0, y: 0 },
  debug: (...args: any[]) => void = () => { }
) => {
  let transformed = transformGrid(grid)

  const tranformedViewBox = getViewBox(transformed)
  const [tL, tT, tW, tH] = tranformedViewBox

  const inner = { width: tW, height: tH }

  const center = getCenter(sourceImage, inner)

  const offsetX = -tL + center.x + offset.x
  const offsetY = -tT + center.y + offset.y

  // normalize transformed coordinates and add offset
  transformed = transformed.map(
    ({ x, y }) => ({ x: x + offsetX, y: y + offsetY })
  )

  // debug
  {
    const { width, height } = sourceImage
    debug('gridViewBox', getViewBox(grid))
    debug('transformedViewBox', tranformedViewBox)
    debug('transformedSize', inner)
    debug('sourceSize', { width, height })
    debug('center', center)
    debug('offset', { offsetX, offsetY })
  }

  const corners: CornerData[] = []

  const gridClone = clone( grid )

  for (let i = 0; i < transformed.length; i++) {
    const { x, y } = grid[i]
    let { x: sx, y: sy } = transformed[i]

    sx |= 0
    sy |= 0

    if (
      sx < 0 || sy < 0 ||
      sx >= sourceImage.width || sy >= sourceImage.height
    ) continue

    const index = sy * sourceImage.width + sx
    const dataIndex = index * 4
    const r = sourceImage.data[dataIndex]
    const g = sourceImage.data[dataIndex + 1]
    const b = sourceImage.data[dataIndex + 2]
    const a = sourceImage.data[dataIndex + 3]

    const data: PixelMapperData = {
      r, g, b, a,
      x: sx, y: sy,
      imageData: sourceImage,
      gridX: x, gridY: y,
      grid: gridClone
    }

    const voxels = pixelMapper(data)

    if (voxels.length) {
      const corner: CornerData = { x, y, voxels }

      corners.push(corner)
    }
  }

  return corners
}

const getCenter = (outer: Size, inner: Size) => {
  const x = (outer.width - inner.width) / 2
  const y = (outer.height - inner.height) / 2

  return { x, y }
}
