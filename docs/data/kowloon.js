const firstFloor = 0
const maxFloors = 16

const groundDensity = 1
const roofDensity = 1
const shopFrontDensity = 0.33

export const pixelMapper = ({ r, g, b, a, x, y, imageData }) => {
  if (r === 0 && g === 0 && b === 0) return []

  //const seed = r<<24|g<<16|b<<8|a
  const seed = y * imageData.width + x
  
  rnd = seededRandom( seed )

  const floor = r / 255
  const middleDensity = g / 255
  const height = b / 255

  // don't scale it like floor etc
  const district = a

  let floors = Math.floor(height * maxFloors) + 1

  const voxels = []

  for (let i = 0; i < floors; i++) {
    const h = i + firstFloor

    const isBase = h === 0
    const isGroundBottom = h === 1
    const isGroundTop = h === 2
    const isGroundFloor = isGroundBottom || isGroundTop
    const isRoofBottom = i === floors - 2
    const isRoofTop = i === floors - 1
    const isRoof = !isGroundFloor && ( isRoofBottom || isRoofTop )
    const isMiddle = !isGroundFloor && !isRoof

    if (isBase) {
      if (floor > 0) {
        voxels.push({ t: 15, h: 0 })
      }

      continue
    }

    const t = getColor(district, isMiddle || isRoofBottom || isGroundTop )

    if (isGroundFloor) {
      if( rnd() > groundDensity ) continue

      const isBuilding = floor > 0.9

      if (isBuilding || h === 2 ) {   
        voxels.push({ t, h })
        
        continue
      }

      const isShopFront = floor > 0.66

      if( isShopFront ){
        if( rnd() > shopFrontDensity ) continue

        voxels.push({ t, h })
        
        continue
      }

      continue
    }

    if (isMiddle) {
      if (middleDensity === 0) continue
      if (rnd() > middleDensity) continue

      voxels.push({ t, h })

      continue
    }

    if (isRoof) {
      if (rnd() > roofDensity) continue

      voxels.push({ t, h })

      continue
    }
  }

  return voxels
}

const seededRandom = (seed = Math.floor(Math.random() * 2147483647)) => {
  seed = seed % 2147483647

  if (seed <= 0)
      seed += 2147483646

  const rand = () => {
      seed = seed * 16807 % 2147483647
      return (seed - 1) / 2147483646
  }

  return rand
}

let rnd = seededRandom()

//

const createSeq = ( length, cb ) => Array.from({length}, ( _v, k ) => cb(k))

// color schemes

const ANY = -1
const ORANGE_D = 0
const ORANGE = 1
const ORANGE_B = 2
const YELLOW_D = 2
const YELLOW = 3
const YELLOW_B = 4
const GREEN_D = 5
const GREEN = 6
const GREEN_B = 7
const BLUE_D = 8
const BLUE = 9
const BLUE_B = 10
const TEAL_D = 6
const TEAL = 7
const TEAL_B = 8

const PURPLE_B = 9
const PURPLE = 10
const PURPLE_D = 11

const PLUM_B = 10
const PLUM = 11
const PLUM_D = 0

const WHITE_D = 12
const WHITE = 13
const WHITE_B = 14


const cs = (value, size) => ({ value, size })

const standardMix = (color, dark, bright) => [
  cs(color, 2), //cs(color, 6),
  cs(dark, 1),
  cs(bright, 1)
]

const repeatStop = ({ value, size }, repeat) => ({ value, size: size * repeat })

const repeatStops = (stops, repeat) => stops.map(s => repeatStop(s, repeat))

const combineStops = (...stops) => {
  const map = new Map()
  for (const colorMix of stops) {
    for (const mix of colorMix) {
      const { value, size } = mix
      let c = map.get(value)
      if (c === undefined) {
        c = 0
        map.set(value, 0)
      }
      map.set(value, size + c)
    }
  }
  return [...map.entries()].map(([value, size]) => ({ value, size }))
}

const sumSize = (size, stop) => size + stop.size

const totalSize = (stops) => stops.reduce(sumSize, 0)

const sample = (stops, x) => {
  if (stops.length === 0)
    throw Error('Empty array')
  const total = totalSize(stops)
  const target = total * x
  // 0..1
  x = Math.min(Math.max(x, 0), 1)
  let size = 0
  let i
  for (i = 0; i < stops.length; i++) {
    if (size >= target && i > 0) {
      break
    }
    size += stops[i].size
  }
  const targetItem = stops[i - 1]

  if (targetItem) {
    return targetItem.value
  }

  throw Error(`Expected target, ${JSON.stringify({ total, target, size, i })}`)
}

const seenValues = new Set()

const greys = 15
const space = 16

const valueToDistrict = value => {
  const district = Math.floor( value / space )

  return district
}

const colorMap = {
  1: 1,
  2: 10,
  3: 9,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 3,
  10: 2,
  11: 11,
  12: 12,
  13: 13,
  14: 14,
  15: 15
}

const getColor = ( district, isMiddle ) => {
  const d = valueToDistrict( district ) 
  
  const hasEntry = d in colorMap

  if( !seenValues.has( d )){
    seenValues.add( d )

    const args = [ 'new district', { district, d } ]

    if( !hasEntry ){
      console.log( ...args, 'not in district pal')

      return sample( whiteBaseMix, rnd() )
    }

    console.log( ...args )
  }  

  // d should be 0-15

  const color = colorMap[ d - 1 ]

  if( isMiddle && middleMap[ color ] ){
    return sample( middleMap[ color ], rnd() )
  }

  // special 
  if( color === PLUM ){
    // because we are replacing with WHITE_B, we could instead
    // replace all PLUM instances except one or two feature buildings 
    // and return something special here
    //return WHITE_B
    return PLUM
  }
  if( color === ORANGE ){
    return ORANGE_B
  }

  return color
}


const redMix = [
  { value: ORANGE_D, size: 2 },
  { value: ORANGE, size: 1 }
]
const orangeMix = standardMix( ORANGE, ORANGE_D, ORANGE_B )
const yellowMix = standardMix(YELLOW, YELLOW_D, YELLOW_B)
const greenMix = standardMix(GREEN, GREEN_D, GREEN_B)
const tealMix = standardMix(TEAL, TEAL_D, TEAL_B)
const blueMix = standardMix( BLUE, BLUE_D, BLUE_B )
const purpleMix = standardMix( PURPLE, PURPLE_D, PURPLE_B )
const whiteMix = standardMix(WHITE_B, WHITE, WHITE_D )

const redBlueMix = [
  { value: BLUE, size: 1 },
  { value: ORANGE_D, size: 1 }
]

const yellowSpecialMix = [
  { value: YELLOW, size: 1 },
  { value: YELLOW_B, size: 1 }
]

const whiteBaseMix = combineStops(
  repeatStops( whiteMix, 124 ),
  repeatStops( tealMix, 56 ),
  [{ value: ORANGE, size: 13 }],
  [{ value: ORANGE_D, size: 6 }],
  [{ value: YELLOW, size: 11 }],
)

const tealBaseMix = combineStops(
  repeatStops( whiteMix, 56 ),
  repeatStops( tealMix, 124 ),
  [{ value: ORANGE, size: 13 }],
  [{ value: ORANGE_D, size: 6 }],
  [{ value: YELLOW, size: 11 }],
)

const greenBaseMix = combineStops(
  repeatStops( greenMix, 124 ),
  repeatStops( whiteMix, 56 ),
  repeatStops( tealMix, 19 ),
  [{ value: YELLOW, size: 11 }],
)

const yellowBaseMix = combineStops(
  repeatStops( yellowMix, 124 ),
  repeatStops( whiteMix, 56 ),
  [{ value: ORANGE, size: 13 }],
  [{ value: TEAL, size: 6 }],
  [{ value: ORANGE_D, size: 11 }],
)

const middleMap = {
  0: redMix,
  1: yellowBaseMix,
  2: yellowMix,
  3: yellowMix,
  4: whiteBaseMix,
  5: greenMix,
  6: greenBaseMix,
  7: greenBaseMix,
  8: tealBaseMix,
  9: tealBaseMix,
  10: tealBaseMix,
  11: whiteBaseMix,
  12: whiteBaseMix,
  13: whiteBaseMix,
  14: whiteMix
}