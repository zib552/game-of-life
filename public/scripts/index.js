/* eslint-disable prefer-const */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { calcNewCellState, makeMatrix, calcCellCoordinates, calcClickCoordinates, getIntermediateFrame, drawBoard, getPreset, draw, drawToad, drawAcorn, drawLWSS } from './engine.js'

let currentFrame
let intermediateFrame // For holding the neighbour count
let nextFrame
const context = canvas.getContext('2d')
const cellSize = 8
let status
const value = 0
window.addEventListener('DOMContentLoaded', init)
window.addEventListener('resize', resize)
function init () {
  console.log('INIT')
  const simulateBtn = document.getElementById('simulate-button')
  simulateBtn.addEventListener('click', simulate)
  const clearBtn1 = document.getElementById('clear-button')
  clearBtn1.addEventListener('click', clear)
  const drawPresetBtn = document.getElementById('drawPreset-button')
  drawPresetBtn.addEventListener('click', drawPreset)
  const animateBtn = document.getElementById('animate')
  animateBtn.addEventListener('click', animate)
  const body = document.getElementById('body').addEventListener('click', handleMouseClick)
  resize()
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
    spanMouseX.innerHTML = 'Column' + point2.x
    spanMouseY.innerHTML = 'Row ' + point2.y
  } else {
    spanMouseX.innerHTML = 'Out of bounds'
    spanMouseY.innerHTML = 'Out of bounds'
  }
}
function getInputValue () {
  /* const rows = document.getElementById('rows').value
  const cols = document.getElementById('columns').value

  const h = rows * cellSize
  canvas.height = h

  const w = cols * cellSize
  canvas.width = w

  const arrH = h / cellSize
  const arrW = w / cellSize

  currentFrame = makeMatrix(arrH, arrW)
  nextFrame = makeMatrix(arrH, arrW)
  intermediateFrame = makeMatrix(arrH, arrW)
  // drawBoard(w, h, context, cellSize) */
}

function simulate () {
  let Nwid = (Math.ceil(window.innerWidth / 8) * 8)
  let Nhei = (Math.ceil(window.innerHeight / 8) * 8)

  let wid = Nwid - 32
  let hei = Nhei - 32

  let rows = hei / cellSize
  let cols = wid / cellSize

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
  let Nwid = (Math.ceil(window.innerWidth / 8) * 8)
  let Nhei = (Math.ceil(window.innerHeight / 8) * 8)
  let wid = Nwid - 32
  let hei = Nhei - 32
  const arrH = hei / cellSize
  const arrW = wid / cellSize
  currentFrame = makeMatrix(arrH, arrW)
  const value = getPreset()
  const numValue = parseInt(value)
  if (numValue === 1 && currentFrame.length >= 17 && currentFrame[16][16] !== undefined) {
    console.log(currentFrame)
    clear()
    drawToad(currentFrame, context, cellSize)
  }
  if (numValue === 2 && currentFrame.length >= 17 && currentFrame[16][16] !== undefined) {
    clear()
    drawAcorn(currentFrame, context, cellSize)
  }
  if (numValue === 3 && currentFrame.length >= 17 && currentFrame[16][16] !== undefined) {
    clear()
    drawLWSS(currentFrame, context, cellSize)
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
  let Nwid = (Math.ceil(window.innerWidth / 8) * 8)
  let Nhei = (Math.ceil(window.innerHeight / 8) * 8)
  let wid = Nwid - 32
  let hei = Nhei - 32
  const rows = hei / cellSize
  const cols = wid / cellSize
  currentFrame = makeMatrix(rows, cols)
  intermediateFrame = makeMatrix(rows, cols)
  nextFrame = makeMatrix(rows, cols)
  draw(currentFrame, context, cellSize)
}
function animate () {
  const checkedVal = document.getElementById('animate').checked
  console.log(checkedVal)
  if (checkedVal === true) {
    setTimeout(function () { simulate() }, 500)
    setTimeout(function () { animate() }, 500)
  } else {
    console.log('NOT ANIMATING')
  }
}

function resize () {
  let Nwid = (Math.ceil(window.innerWidth / 8) * 8)
  let Nhei = (Math.ceil(window.innerHeight / 8) * 8)
  let wid = Nwid - 32
  let hei = Nhei - 32

  canvas.height = hei

  canvas.width = wid

  const arrH = hei / cellSize
  const arrW = wid / cellSize

  currentFrame = makeMatrix(arrH, arrW)
  nextFrame = makeMatrix(arrH, arrW)
  intermediateFrame = makeMatrix(arrH, arrW)
  const context = canvas.getContext('2d')
  drawBoard(wid, hei, context, cellSize)
}
