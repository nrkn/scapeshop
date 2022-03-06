import { getL } from '../lib/color.js'
import { Voxel } from '../types.js'
import { PixelMapper } from './types.js'

export const heightMapper: PixelMapper = rgba => {
  const { r, g, b } = rgba
  const l = getL( r, g, b )

  const firstFloor = 0
  const maxFloors = 8

  const floors = Math.floor(l * maxFloors)

  const voxels: Voxel[] = []

  for( let i = 0; i < floors; i++ ){
    const h = i + firstFloor

    const t = h === 0 ? 15 : 14

    voxels.push({ t, h })
  }

  return voxels
}
