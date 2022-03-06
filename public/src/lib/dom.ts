import { ass } from './util.js'

export const hArgs = <T extends Element>( el: T, ...args: any[] ) => {
  for( const arg of args ){
    if( typeof arg === 'string' ) el.append( arg )
    else if( typeof arg === 'number' ) el.append( String( arg ) )
    else if( Array.isArray( arg ) ) el.append( arg.join( ' ' ) )
    else if( 'nodeType' in arg ) el.append( arg )
    else {
      for( const key in arg ){
        let value = arg[ key ]

        if( Array.isArray( value ) ) value = value.join( ' ' )
        if( typeof value !== 'string' ) value = String( value )
        if( value === false ) continue
        if( value === true ) value = ''
        
        el.setAttribute( key,  value )
      }
    }
  }

  return el
}

export const H = <K extends keyof HTMLElementTagNameMap>( name: K, ...args: any[] ) => {
  const el = document.createElement( name )

  hArgs( el, ...args )  

  return el
}

export const S = <K extends keyof SVGElementTagNameMap>( name: K, ...args: any[] ) => {
  const el = document.createElementNS( 'http://www.w3.org/2000/svg', name )

  hArgs( el, ...args )  

  return el
}

export const createX = ( document: Document ) => ( name: string, ...args: any[] ) => {
  const el = document.createElement( name )

  hArgs( el, ...args )  

  return el
}

type QFn = {
  <K extends keyof HTMLElementTagNameMap>(selector: K): HTMLElementTagNameMap[K]  
  <K extends keyof HTMLElementTagNameMap>(selector: string): HTMLElementTagNameMap[K]  
  <T extends Element = Element>(selector: string): T
}

export const Q = ( parent: ParentNode ) => {
  const q: QFn = (selector: any) => ass( parent.querySelector( selector ) )

  return q
}

export const populate = ( parent: ParentNode, ...args: any[] ) => {
  const tt = parent.querySelectorAll( 't-t' )

  for( let i = 0; i < tt.length; i++ ){
    const el = tt[ i ]
    const value = args[ i ] 

    if( !value ) break

    el.innerHTML = String( value )
  }
}
