import { CornerData } from '../types.js'
import { createX } from './dom.js'
import { ass } from './util.js'

export const cornersToScape = ( corners: CornerData[], scapeDocument: Document ) => {
  const X = createX(scapeDocument)

  const cornersEl = ass(scapeDocument.querySelector('corners'))
  const voxelsEl = ass(scapeDocument.querySelector('voxels'))

  for (const { x, y, voxels } of corners) {
    const cEl = X('C',
      X('x', x),
      X('y', y),
      X('count', voxels.length)
    )

    cornersEl.append(cEl)

    for (const { t, h } of voxels) {
      const vEl = X('V',
        X('t', t),
        X('h', h)
      )

      voxelsEl.append(vEl)
    }
  }

  return `<?xml version="1.0" encoding="utf-8"?>\n` + scapeDocument.documentElement.outerHTML
}
