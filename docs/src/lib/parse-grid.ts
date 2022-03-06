import { Point } from '../types.js'
import { ass } from './util.js'

export const parseGrid = (scapeDocument: Document) => {
  const cornerEls = [...scapeDocument.querySelectorAll('C')]

  const cornerData = cornerEls.map(el => {
    const x = getElAsNumber(el, 'x')
    const y = getElAsNumber(el, 'y')

    const data: Point = { x, y }

    return data
  })

  return cornerData
}

const getElAsNumber = (parent: Element, selector: string) =>
  Number(ass(parent.querySelector(selector)).textContent)
