import { cornersToScape } from '../lib/corners-to-scape.js'
import { populate, Q } from '../lib/dom.js'
import { imageToCorners } from '../lib/image-to-corners.js'
import { parseGrid } from '../lib/parse-grid.js'
import { clone, getViewBox } from '../lib/util.js'
import { Point } from '../types.js'

import {
  canvasToImageData, fileImage, inputFile, imageToCanvas,
  loadImage, loadJson, loadText, parseXml
} from './dom.js'

import { thresholdMapper } from '../pixel-mappers/threshold.js'

import { createPreview } from './preview.js'

import { option } from '../lib/h.js'

import { baseHeightMapper, towerHeightMapper } from '../pixel-mappers/height.js'
import { baseColorMapper } from '../pixel-mappers/color.js'
import { baseColorHeightMapper, towerColorHeightMapper } from '../pixel-mappers/color-height.js'
import { createDebug } from './debug.js'

const pixelMappers = {
  'color + height (tower)': towerColorHeightMapper,
  'color + height (base)': baseColorHeightMapper,
  threshold: thresholdMapper,
  'height (tower)': towerHeightMapper,
  'height (base)': baseHeightMapper,
  color: baseColorMapper,
  custom: () => [{ t: 15, h: 0 }]
}

const q = Q(document)

// tools

const scapeGridInput = q<'input'>('#scapeGrid')
const sourceImageInput = q<'input'>('#sourceImage')
const customPixelMapperInput = q<'input'>('#customPixelMapper')

const downloadOutputAnchor = q<'a'>('#downloadOutput')

const loadGridDefault = q<'button'>('#loadGridDefault')
const loadImageDefault = q<'button'>('#loadImageDefault')
const loadOffsetDefault = q<'button'>('#loadOffsetDefault')

const offsetXInput = q<'input'>( '#offsetX')
const offsetYInput = q<'input'>( '#offsetY')
const offsetXRange = q<'input'>( '#offsetXRange')
const offsetYRange = q<'input'>( '#offsetYRange')

const pixelMapperSelect = q<'select'>('#pixelMapper')

const showAllVoxelsInput = q<'input'>( '#showAllVoxels' )

for (const key in pixelMappers) {
  pixelMapperSelect.append(option(key))
}

// view elements etc

const viewEl = q('#view')

const debugEl = q('#debug')

// info elements etc

const gridSize = q('#gridSize')
const gridCorners = q('#gridCorners')

const imageSize = q('#imageSize')
const srcImg = q<'img'>('#sourceImg')

const outputSize = q('#outputSize')
const outputCorners = q('#outputCorners')
const outputVoxels = q('#outputVoxels')

//

const d = createDebug( debugEl )

type State = { sourceImg: HTMLImageElement, sourceImageData: ImageData; grid: Point[]; emptyScapeXml: string, offset: Point }

let defaults: State
let state: State

const start = async () => {  
  d.level( 'none' )
  
  const sourceImg = await loadImage('./img/test-pattern.png')
  const sourceCanvas = imageToCanvas(sourceImg)
  const emptyScapeXml = await loadText('./data/empty.scape')

  const sourceImageData = canvasToImageData(sourceCanvas)
  const grid = await loadJson<Point[]>('./data/grid-large.json')

  d.info('start')
  d.info('sourceImg', sourceImg)
  d.info('sourceCanvas', sourceCanvas)
  d.info('emptyScapeXml', emptyScapeXml)
  d.info('grid', grid)  

  let offset = { x: 0, y: 0 }
  
  state = {
    sourceImg, sourceImageData, grid, emptyScapeXml, offset
  }

  offset = clone( offset )

  defaults = {
    sourceImg, sourceImageData, grid, emptyScapeXml, offset
  }

  update()
}

const updatePreview = createPreview( viewEl, d.info )

const update = () => {  
  const start = performance.now()
  
  d.clear()    

  const { grid, sourceImageData, emptyScapeXml, offset } = state

  const pixelMapper = pixelMappers[pixelMapperSelect.value]

  const pstart = performance.now()
  const corners = imageToCorners(grid, sourceImageData, pixelMapper, offset, d.debug)
  const pend = performance.now()

  d.debug( 'imageToCorners ms', pend - pstart )

  const emptyScape = parseXml(emptyScapeXml)

  const scape = cornersToScape(corners, emptyScape)

  downloadOutputAnchor.download = 'test-pattern.scape'
  downloadOutputAnchor.href = 'data:application/xml,' + scape

  const voxelCount = corners.reduce((sum, corner) => sum + corner.voxels.length, 0)
  const gridViewBox = getViewBox(grid)
  const cornerViewBox = getViewBox(corners)

  const [, , gw, gh] = gridViewBox
  const [, , cw, ch] = cornerViewBox

  populate(gridSize, gw, gh)
  populate(gridCorners, grid.length)
  populate(imageSize, sourceImageData.width, sourceImageData.height)
  srcImg.src = state.sourceImg.src
  populate(outputSize, cw, ch)
  populate(outputCorners, corners.length)
  populate(outputVoxels, voxelCount)
  
  d.info('update')  
  d.info(`${corners.length} corner(s)`)
  d.info(`${voxelCount} voxel(s)`)
  d.info('gridViewBox', gridViewBox)
  d.info('cornerViewBox', cornerViewBox)  

  const prevStart = performance.now()
  updatePreview(corners, showAllVoxelsInput.checked )

  const end = performance.now()

  d.debug( 'updatePreview ms', end - prevStart )
  d.debug( 'update ms', end - start )
}

scapeGridInput.addEventListener('change', async () => {
  const file = inputFile(scapeGridInput)

  if (file === undefined) return

  const xml = await file.text()
  const scapeDocument = parseXml(xml)
  const grid = parseGrid(scapeDocument)

  state.grid = grid

  update()
})

sourceImageInput.addEventListener('change', async () => {
  const file = inputFile(sourceImageInput)

  if (file === undefined) return

  const image = await fileImage(file)
  const canvas = imageToCanvas(image)
  const imageData = canvasToImageData(canvas)

  state.sourceImg = image
  state.sourceImageData = imageData

  update()
})

customPixelMapperInput.addEventListener( 'change', async () => {
  const file = inputFile( customPixelMapperInput )

  if( file === undefined ) return

  const js = await file.text()

  const jsImport = `data:text/javascript,${ encodeURIComponent( js ) }`

  console.log( 'jsImport', jsImport )

  const { pixelMapper } = await import( jsImport )

  if( typeof pixelMapper !== 'function' ) throw Error( 'Expected pixelMapper function export' )

  console.log( 'pixelMapper', pixelMapper )

  pixelMappers.custom = pixelMapper

  if( pixelMapperSelect.value === 'custom' ){
    update()
  }
})

offsetXInput.addEventListener( 'change', () => {
  state.offset.x = offsetXRange.valueAsNumber = offsetXInput.valueAsNumber

  update()
})

offsetYInput.addEventListener( 'change', () => {
  state.offset.y = offsetYRange.valueAsNumber = offsetYInput.valueAsNumber

  update()
})

offsetXRange.addEventListener( 'change', () => {
  state.offset.x = offsetXInput.valueAsNumber = offsetXRange.valueAsNumber

  update()
})

offsetYRange.addEventListener( 'change', () => {
  state.offset.y = offsetYInput.valueAsNumber = offsetYRange.valueAsNumber

  update()
})

pixelMapperSelect.addEventListener('change', () => {
  update()
})

showAllVoxelsInput.addEventListener( 'change', () => {
  update()
} )

loadGridDefault.addEventListener('click', e => {
  e.preventDefault()

  state.grid = defaults.grid.slice()

  update()
})

loadImageDefault.addEventListener('click', e => {
  e.preventDefault()

  state.sourceImageData = defaults.sourceImageData
  state.sourceImg = defaults.sourceImg

  update()
})

const offsetInputs = [
  offsetXInput, offsetYInput, offsetXRange, offsetYRange
]

loadOffsetDefault.addEventListener('click', e => {
  e.preventDefault()

  for( const input of offsetInputs ){
    input.valueAsNumber = 0
  }

  state.offset = defaults.offset

  update()
})

start().catch(
  err => {
    alert(err ? err.message ? err.message : err : 'Unknown error')

    throw err
  }
)
