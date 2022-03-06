import { ass } from '../lib/util.js'

export const loadImage = ( src: string ) => new Promise<HTMLImageElement>(
  resolve => {
    const img = new Image()

    img.onload = () => resolve( img )

    img.src = src
  }
)

export const loadText = async ( src: string ) => {
  const res = await fetch( src )

  return res.text()
}

export const loadJson = async <T>( src: string ) => {
  const res = await fetch( src )

  return res.json() as Promise<T>
}

export const imageToCanvas = ( image: HTMLImageElement ) => {
  const canvas = document.createElement( 'canvas' )

  canvas.width = image.naturalWidth
  canvas.height = image.naturalHeight

  const ctx = ass( canvas.getContext('2d'))

  ctx.drawImage( image, 0, 0 )

  return canvas
}

export const canvasToImageData = ( canvas: HTMLCanvasElement ) => {
  const ctx = ass( canvas.getContext('2d'))

  return ctx.getImageData( 0, 0, canvas.width, canvas.height )
}

export const fileImage = ( file: File ) => new Promise<HTMLImageElement>(
  ( resolve, reject ) => {
    const image = new Image()

    image.crossOrigin = 'anonymous'

    const reader = new FileReader()

    reader.onload = e => {
      const dataUrl = ass(e.target).result as string

      image.onerror = e => reject( e )
      image.onload = () => resolve( image )
      

      image.src = dataUrl
    }

    reader.onerror = e => reject( e )

    reader.readAsDataURL(file)
  }
)

export const fileDataUrl = ( file: File ) => new Promise<string>(
  ( resolve, reject ) => {
    const reader = new FileReader()

    reader.onload = e => {
      const dataUrl = ass(e.target).result as string

      resolve( dataUrl)
    }

    reader.onerror = e => reject( e )

    reader.readAsDataURL(file)
  }
)

export const inputFile = ( inputEl: HTMLInputElement ) => {
  if( inputEl.files === null ) return

  return inputEl.files[ 0 ]
}

export const parseXml = ( xml: string ) => new DOMParser().parseFromString( xml, 'application/xml' )
