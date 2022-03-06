import { rgbToHsl } from '../lib/color.js'
import { S } from '../lib/dom.js'
import { paletteRgbaTuples } from '../lib/palette.js'
import { transformGrid } from '../lib/transform-grid.js'
import { getViewBox } from '../lib/util.js'
import { CornerData } from '../types.js'

export const createPreview = ( viewEl: Element, info: ( ...args: any[] ) => void ) => {
  const updatePreview = (corners: CornerData[], showAllVoxels = true ) => {  
    viewEl.innerHTML = ''
  
    const transformed = transformGrid(corners)
    const viewBox = getViewBox(transformed)
  
    info('updatePreview')  
    info('transformedCorners', transformed)
    info('transformedViewBox', viewBox)
  
    const [left, top, width, height] = viewBox
  
    const centerX = left + width / 2
    const centerY = top + height / 2
  
    const attrs: any[] = []
  
    for (let i = 0; i < transformed.length; i++) {
      const transform = transformed[i]
      const corner = corners[i]
  
      let voxels = corner.voxels

      if( !showAllVoxels ){
        voxels = voxels.slice()
        voxels.sort( ( a, b ) => b.h - a.h )
        voxels = [ voxels[ 0 ] ]
      }

      for (const voxel of voxels ) {
        const r = 5
        let rgba = [127, 127, 127, 255]
  
        if (voxel.t < 15) {
          rgba = paletteRgbaTuples[voxel.t]
        }
  
        const [cr, cg, cb] = rgba
  
        let [h, s, l] = rgbToHsl(cr, cg, cb)
  
        const scale = voxel.h * 0.01 + 1
  
        l = l * 0.66 * (voxel.h * 0.075 + 1)
  
        l = Math.min(Math.floor(l), 100)
  
        const fill = `hsl(${h},${s}%,${l}%)`
  
        if (isNaN(transform.x) || isNaN(transform.y)) {
          throw Error('Wtf mate ' + i + ' / ' + transformed.length)
        }

        const attr = {
          cx: transform.x, 
          cy: transform.y,
          r, fill
        }

        if( showAllVoxels ){
          Object.assign( attr, {
            transform: `scale(${scale})`,
            'transform-origin': [centerX, centerY],
            'data-z': voxel.h
          })
        }
  
        attrs.push( attr )  
      }
    }
  
    attrs.sort((a, b) => a['data-z'] - b['data-z'])
  
    const circles = attrs.map(attr => S('circle', attr))
  
    const svgEl = S('svg', { viewBox }, S('g', ...circles))
  
    info('svgEl', svgEl)
  
    viewEl.append(svgEl)
  }

  return updatePreview
}
