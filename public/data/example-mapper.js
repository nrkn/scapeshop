/*
  Your function should take a single data argument, which is an object:

  // information about the image currently being sampled
  {
    
    // the color of the pixel
    r: number, g: number, b: number, a: number, 
    
    // the sample location, relative to the source image
    x: number, y: number, 
    
    // the image being sampled (https://developer.mozilla.org/en-US/docs/Web/API/ImageData)
    imageData: ImageData,
    
    // the townscaper grid coordinate being sampled, using townscaper global coordinates
    gridX: number, gridY: number,
    
    // the locations of all corners being sampled in the townscaper global grid
    // points like: { x: number, y: number }
    grid: Point[]
  }
  
  You should return an array of voxels:  

  [{ t: 15, h: 0 }, { t: 5, h: 1 }, ... ]
  
  {    
    t: number, // the color, using townscaper palette (0-14)    
    h: number  // how high up the voxel is
  }

  // Base voxels at h: 0 should always use the special color 15:
  {
    t: 15, h: 0
  }

*/

// choose our three colors from the townscaper index (0-14)

const rColor = 12
const bColor = 13
const gColor = 14

export const pixelMapper = ({ r, g, b }) => {
  // normalize to range 0..1 
  const rHeight = r / 255
  const gHeight = g / 255
  const bHeight = b / 255  

  // townscaper gets slow very quickly as voxel counts increase!
  const maxFloors = 3
  const rFloors = Math.floor( rHeight * maxFloors )
  const gFloors = Math.floor( gHeight * maxFloors )
  const bFloors = Math.floor( bHeight * maxFloors )

  // rounded to zero, leave sea here, empty array
  if( rFloors + gFloors + bFloors === 0 ) return []  

  // place a base voxel 
  const voxels = [{ t: 15, h: 0 }]    
  
  // climb upward along h, and push some voxels for each level
  let h = 1  

  for( let i = 0; i < rFloors; i++ ){
    voxels.push({ t: rColor, h })
    h++
  }  

  for( let i = 0; i < gFloors; i++ ) {
    voxels.push({ t: gColor, h })
    h++
  }

  for( let i = 0; i < bFloors; i++ ) {
    voxels.push({ t: bColor, h })
    h++
  }

  return voxels	
}
