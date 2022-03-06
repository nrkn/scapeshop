import { p, pre, span, strong } from '../lib/h.js'
import { ass } from '../lib/util.js'

type DebugLevel = 'info' | 'debug' | 'none'

export const createDebug = ( debugEl: Element ) => {
  let dlev: DebugLevel = 'none'

  const clear = () => debugEl.innerHTML = ''

  const debug = (...args: any[]) => {
    if( dlev === 'none' ) return
  
    if (args.length === 0) return
  
    if (args.length === 1 && typeof args[0] === 'string') {
      debugEl.append(p(strong(args[0])))
  
      return
    }
  
    if (args.length > 1) {
      const [title, ...children] = args
      const [first] = children
  
      if (typeof title !== 'string' || !first) return
  
      let childNodes: Node[] = []
  
      if (typeof first === 'string') {
        childNodes = children.map(r => pre(r))
      } else if (first instanceof Node) {      
        if( first instanceof HTMLCanvasElement ){
          childNodes = children.map( c => {
            const el = c.cloneNode( true )
  
            const ctx = ass( el.getContext( '2d' ) )
            ctx.drawImage( c, 0, 0 )
  
            return el
          })
        } else {
          childNodes = children.map( c => c.cloneNode( true ) )
        }      
      } else {
        childNodes = children.map(c => pre(JSON.stringify(c, null, 2)))
      }
  
      debugEl.append(span(title), ...childNodes)
    }
  }
  
  const info = (...args: any[]) => {
    if( dlev !== 'info' ) return
  
    debug(...args)
  }

  const level = ( level?: DebugLevel ) => {
    if( level !== undefined ){
      dlev = level
    }

    return dlev
  }
  
  return { clear, debug, info, level }
}

