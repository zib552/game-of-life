/* eslint-disable no-undef */
import { calcNewCellState, makeMatrix, calcCellCoordinates, calcClickCoordinates, reindexJ, reindexI, resize } from './engine.js'

test('Is born', () => {
  const result = calcNewCellState(0, 3)
  expect(result).toBe(1)
})

test('Survives', () => {
  const result = calcNewCellState(1, 2)
  expect(result).toBe(1)
})

test('Dies', () => {
  const result = calcNewCellState(1, 0)
  expect(result).toBe(0)
})

test('Make matrix', () => {
  const result = makeMatrix(1, 1)
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 1; j++) {
      expect(result).toEqual([[0]])
    }
  }
})

test('Show row and col pos', () => {
  const result = calcCellCoordinates(10, 20, 5)
  expect(result).toEqual({ x: 2, y: 4 })
})

test('Reindex when J pos is -1', () => {
  const result = reindexJ(-1, 5)
  expect(result).toBe(4)
})

test('Reindex when J pos is 0', () => {
  const result = reindexJ(0, 10)
  expect(result).toBe(0)
})

test('Reindex when J pos is inside grid', () => {
  const result = reindexJ(9, 10)
  expect(result).toBe(9)
})

test('Reindex when J pos is outside of grid', () => {
  const result = reindexJ(12, 10)
  expect(result).toBe(0)
})

test('Reindex when I pos is -1', () => {
  const result = reindexI(-1, 10)
  expect(result).toBe(9)
})

test('Reindex when I pos is 0', () => {
  const result = reindexI(0, 10)
  expect(result).toBe(0)
})

test('Reindex when I pos is inside grid', () => {
  const result = reindexI(9, 10)
  expect(result).toBe(9)
})

test('Reindex when I pos is outside of grid', () => {
  const result = reindexI(11, 10)
  expect(result).toBe(0)
})

test('Get click coordinates inside grid', () => {
  const result = calcClickCoordinates(24, 193, 8, 178, 308, 378)
  expect(result).toEqual({ x: 16, y: 15 })
})

test('Get click coordinates outside of grid', () => {
  const result = calcClickCoordinates(319, 185, 8, 178, 308, 378)
  expect(result).toEqual(null)
})

test('Resize array', () => {
  const result = resize({ h: 1152, w: 1600 }, 8)
  expect(result).toEqual({ arrH: 144, arrW: 200 })
})
