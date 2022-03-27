
// define color schemes

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

const WHITE_D = 12
const WHITE = 13
const WHITE_B = 14

type Stop = { value: number, size: number }

const cs = ( value: number, size: number ): Stop => ({ value, size })

const standardMix = (color: number, dark: number, bright: number ) => [
  cs( color, 6 ),
  cs( dark, 1 ),
  cs( bright, 1 )
]

const repeatStop = ({ value, size }: Stop, repeat: number ): Stop => ({ value, size: size * repeat })

const repeatStops = ( stops: Stop[], repeat: number ) => stops.map( s => repeatStop( s, repeat ) )

const whiteMix = standardMix(WHITE, WHITE_D, WHITE_B)



// const standardMix = (color: number, dark: number, bright: number ) => [
//   mix( color, 6 ),
//   mix( dark, 1 ),
//   mix( bright, 1 )
// ]

// type Mix = [number, number]
// type ColorMix = Mix[]

// const mix = ( 
//   color
//   //: number
//   ,   
//   count
//   //: number 
// ) => [ color, count ] // as Mix


// const standardMix = (color: number, dark: number, bright: number ) => [
//   mix( color, 6 ),
//   mix( dark, 1 ),
//   mix( bright, 1 )
// ]

// const whiteMix = standardMix(WHITE, WHITE_D, WHITE_B)
// const tealMix = standardMix(TEAL, TEAL_D, TEAL_B)
// const orangeMix = standardMix(ORANGE, ORANGE_D, ORANGE_B)
// const yellowMix = standardMix(YELLOW, YELLOW_D, YELLOW_B)
// const greenMix = standardMix(GREEN, GREEN_D, GREEN_B)

// const repeatMix = ( mixes: Mix[], repeat: number ) => mixes.map(
//   ([color, count]) => [color, count * repeat] as Mix
// )

// console.log( whiteMix, repeatMix( whiteMix, 80 ) )

// const repeatMix = (colorMix: ColorMix, repeat: number) => colorMix.map(
//   ([color, count]) => [color, count * repeat] as Mix
// )

// const combineMixes = (colorMixes: ColorMix[]): Mix[] => {
//   const map = new Map<number, number>()

//   for (const colorMix of colorMixes) {
//     for (const mix of colorMix) {
//       const [color, count] = mix

//       let c = map.get(color)

//       if (c === undefined) {
//         c = 0
//         map.set(color, 0)
//       }

//       map.set(color, count + c)
//     }
//   }

//   return [...map.entries()]
// }

// const whiteStrongMix = combineMixes(
//   [
//     repeatMix(whiteMix, 80),
//     repeatMix(tealMix, 15),
//     repeatMix(orangeMix, 4),
//     [[ANY, 1]]
//   ]
// )

// console.log(JSON.stringify(whiteStrongMix))

// console.log(repeatMix(whiteMix, 80))
