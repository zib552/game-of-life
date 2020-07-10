import { calcNewCellState, makeMatrix, calcCellCoordinates, calcClickCoordinates, getIntermediateFrame, drawBoard, getPreset, draw, drawToad, drawAcorn, drawLWSS, resize } from './engine.js'

let currentFrame
let nextFrame
const context = canvas.getContext('2d')
const cellSize = 8
const topOffset = 96
const leftOffset = 24
const crdOffset = 1
window.addEventListener('DOMContentLoaded', init)
window.addEventListener('resize', callResize)
function init () {
  console.log('INIT')
  const crdBtn = document.getElementById('crd-btn')
  crdBtn.addEventListener('click', getCoordinates)
  const simulateBtn = document.getElementById('simulate-button')
  simulateBtn.addEventListener('click', simulate)
  const clearBtn1 = document.getElementById('clear-button')
  clearBtn1.addEventListener('click', clear)
  const drawPresetBtn = document.getElementById('drawPreset-button')
  drawPresetBtn.addEventListener('click', drawPreset)
  const animateBtn = document.getElementById('animate')
  animateBtn.addEventListener('click', animate)
  document.getElementById('body').addEventListener('click', handleMouseClick)
  callResize()
}
function handleMouseClick (event) {
  const spanMouseX = document.getElementById('mouse-x')
  const spanMouseY = document.getElementById('mouse-y')
  const canvas = document.getElementById('canvas')
  const boundingRect = canvas.getBoundingClientRect()
  const point = calcClickCoordinates(event.clientX, event.clientY, boundingRect.left, boundingRect.top, boundingRect.right, boundingRect.bottom)
  if (point) {
    const point2 = calcCellCoordinates(point.x, point.y, cellSize)
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
  const crd = getCoordinates()
  const value = getPreset()
  const numValue = parseInt(value)
  const adjustedSize = calcAdjustedSize()

  const rows = adjustedSize.h / cellSize
  const cols = adjustedSize.w / cellSize

  if (numValue === 1 && currentFrame.length >= 17 && currentFrame[16][16] !== undefined) {
    drawToad(currentFrame, context, cellSize, crd, rows, cols)
  }
  if (numValue === 2 && currentFrame.length >= 17 && currentFrame[16][16] !== undefined) {
    drawAcorn(currentFrame, context, cellSize, crd, rows, cols)
  }
  if (numValue === 3 && currentFrame.length >= 17 && currentFrame[16][16] !== undefined) {
    drawLWSS(currentFrame, context, cellSize, crd, rows, cols)
  }

  if (currentFrame === undefined) {
    alert('you must draw a grid')
  } else if (numValue === 0) {
    alert('You must select a preset')
  } else if (currentFrame.length < 17) {
    alert('Grid is too small. The minimum size is 17x17')
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
function animate () {
  const checkedVal = document.getElementById('animate').checked
  if (checkedVal === true) {
    setTimeout(function () { simulate() }, 50)
    setTimeout(function () { animate() }, 50)
  } else {
    console.log('NOT ANIMATING')
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

function getCoordinates () {
  const coordinates = document.getElementById('coordinates')
  const adjustedSize = calcAdjustedSize()
  const rowCrd = document.getElementById('row').value
  const colCrd = document.getElementById('column').value

  const prsdRowCrd = parseInt(rowCrd)
  const prsdColCrd = parseInt(colCrd)

  const rows = (adjustedSize.h / cellSize) - crdOffset
  const cols = (adjustedSize.w / cellSize) - crdOffset
  if (isNaN(prsdRowCrd) || isNaN(prsdColCrd)) {
    coordinates.innerHTML = 'You must submit coordinates to draw a preset'
  } else if (prsdRowCrd > rows || prsdColCrd > cols) {
    alert('Coordinates too big, the max row coordinate is ' + rows + ' and the max column coordinate is ' + cols)
  } else {
    coordinates.innerHTML = 'Current preset coordinates: row ' + prsdRowCrd + ' column ' + prsdColCrd
  }
  const crd = { row: prsdRowCrd, col: prsdColCrd }
  return crd
}
