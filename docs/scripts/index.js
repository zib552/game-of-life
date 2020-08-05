import { calcNewCellState, makeMatrix, calcCellCoordinates, calcClickCoordinates, getIntermediateFrame, drawBoard, getPreset, draw, resize, insertPreset } from './engine.js'

let currentFrame
let nextFrame
let canvas
let context
let spanMouseX
let spanMouseY
let checkedVal
let checkedEl
let animate
let animateBtn
let state = 0
const cellSize = 8
const topOffset = 96
const leftOffset = 24
let point2
const toad = [
  [0, 1, 1, 1],
  [1, 1, 1, 0]
]

const acorn = [
  [0, 1, 0, 0, 0, 0, 0],
  [0, 0, 0, 1, 0, 0, 0],
  [1, 1, 0, 0, 1, 1, 1]
]

const LWSS = [
  [1, 0, 0, 1, 0],
  [0, 0, 0, 0, 1],
  [1, 0, 0, 0, 1],
  [0, 1, 1, 1, 1]
]
window.addEventListener('DOMContentLoaded', init)
window.addEventListener('resize', callResize)
function init () {
  console.log('INIT')
  animateBtn = document.getElementById('animate-btn')
  animateBtn.addEventListener('click', ChangeAnimateBtn)
  checkedEl = document.getElementById('animate')
  spanMouseY = document.getElementById('mouse-y')
  spanMouseX = document.getElementById('mouse-x')
  canvas = document.getElementById('canvas')
  context = canvas.getContext('2d')
  const simulateBtn = document.getElementById('simulate-button')
  simulateBtn.addEventListener('click', simulate)
  const clearBtn1 = document.getElementById('clear-button')
  clearBtn1.addEventListener('click', clear)
  const drawPresetBtn = document.getElementById('drawPreset-button')
  drawPresetBtn.addEventListener('click', drawPreset)
  animate = document.getElementById('animate')
  animate.addEventListener('click', animateFunc)
  document.getElementById('body').addEventListener('click', handleMouseClick)
  callResize()
}
function handleMouseClick (event) {
  const boundingRect = canvas.getBoundingClientRect()
  const point = calcClickCoordinates(event.clientX, event.clientY, boundingRect.left, boundingRect.top, boundingRect.right, boundingRect.bottom)
  if (point) {
    point2 = calcCellCoordinates(point.x, point.y, cellSize)
    if (currentFrame[point2.y][point2.x] === 0) {
      currentFrame[point2.y][point2.x] = 1
    } else {
      currentFrame[point2.y][point2.x] = 0
    }
    draw(currentFrame, context, cellSize)
    spanMouseX.innerHTML = 'Row ' + point2.y
    spanMouseY.innerHTML = 'Column ' + point2.x
  } else {
    spanMouseX.innerHTML = 'Out of bounds'
    spanMouseY.innerHTML = 'Out of bounds'
  }
}
function simulate () {
  const adjustedSize = calcAdjustedSize()

  const rows = adjustedSize.h / cellSize
  const cols = adjustedSize.w / cellSize

  const intermediateFrame = getIntermediateFrame(currentFrame, rows, cols)
  for (let i = 0; i < intermediateFrame.length; i++) {
    for (let j = 0; j < intermediateFrame[0].length; j++) {
      nextFrame[i][j] = calcNewCellState(currentFrame[i][j], intermediateFrame[i][j])
    }
  }
  currentFrame = nextFrame
  draw(currentFrame, context, cellSize)
}

function drawPreset () {
  const value = getPreset()
  const numValue = parseInt(value)
  const cellSz = cellSize
  let preset

  if (numValue === 1) {
    preset = toad
  }
  if (numValue === 2 && currentFrame.length >= 17 && currentFrame[16][16] !== undefined) {
    preset = acorn
  }
  if (numValue === 3 && currentFrame.length >= 17 && currentFrame[16][16] !== undefined) {
    preset = LWSS
  }

  if (numValue === 0) {
    window.alert('You must select a preset')
  }
  if (point2 === undefined) {
    window.alert('Click on the grid')
  } else {
    insertPreset(currentFrame, preset, point2, context, cellSz)
  }
}

function clear () {
  const adjustedSize = calcAdjustedSize()

  const rows = adjustedSize.h / cellSize
  const cols = adjustedSize.w / cellSize

  currentFrame = makeMatrix(rows, cols)
  nextFrame = makeMatrix(rows, cols)
  draw(currentFrame, context, cellSize)
}
function animateFunc () {
  checkedVal = checkedEl.checked
  if (checkedVal === true) {
    setTimeout(function () { simulate() }, 50)
    setTimeout(function () { animateFunc() }, 50)
  } else {
    console.log('NOT ANIMATING')
  }
}

function ChangeAnimateBtn () {
  if (state === 0) {
    animateBtn.innerHTML = 'Animate &#x23F8'
    state = 1
  } else {
    animateBtn.innerHTML = 'Animate &#9658'
    state = 0
  }
}

function calcAdjustedSize () {
  const Nwid = (Math.ceil(window.innerWidth / cellSize) * cellSize)
  const Nhei = (Math.ceil(window.innerHeight / cellSize) * cellSize)
  const wid = Nwid - leftOffset
  const hei = Nhei - topOffset
  const adjustedSize = { w: wid, h: hei }
  return adjustedSize
}

function callResize () {
  const adjustedSize = calcAdjustedSize()
  const adjustedArr = resize(adjustedSize, cellSize)

  canvas.height = adjustedSize.h
  canvas.width = adjustedSize.w

  currentFrame = makeMatrix(adjustedArr.arrH, adjustedArr.arrW)
  nextFrame = makeMatrix(adjustedArr.arrH, adjustedArr.arrW)

  drawBoard(adjustedSize.w, adjustedSize.h, context, cellSize)
}
