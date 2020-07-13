/* eslint-disable no-undef */
function calcNewCellState (currentState, neighbours) {
  let newState
  // console.log(neighbours);
  if (neighbours === 3) {
    newState = 1
  } else if (neighbours === 2 && currentState === 1) {
    newState = 1 // Survive
  } else {
    newState = 0 // Die
  }
  return newState
}

function makeMatrix (rows, cols) {
  const matrix = []
  for (let i = 0; i < rows; i++) {
    matrix.push([])
  }
  for (let i = 0; i < rows; i++) {
    for (let j = matrix[i].length; j < cols; j++) {
      matrix[i].push(0)
    }
  }
  return matrix
}

function calcCellCoordinates (canvasX, canvasY, cellSize) {
  const colNum = (Math.floor((canvasX / cellSize)))
  const rowNum = (Math.floor((canvasY / cellSize)))
  const point2 = { x: colNum, y: rowNum }
  return point2
}

function reindexJ (num, cols) {
  let indexNum = 0
  if (num === -1) {
    indexNum = cols - 1
    return indexNum
  }
  if (num === 0) {
    indexNum = num
    return indexNum
  }
  if (num < cols && num !== -2 && num !== 0) {
    indexNum = num
    return indexNum
  }
  if (num > cols - 1) {
    indexNum = 0
    return indexNum
  }
}

function reindexI (num, rows) {
  let indexNum = 0
  if (num === -1) {
    indexNum = rows - 1
    return indexNum
  }
  if (num === 0) {
    indexNum = num
    return indexNum
  }
  if (num < rows && num !== -2 && num !== 0) {
    indexNum = num
    return indexNum
  }
  if (num > rows - 1) {
    indexNum = 0
    return indexNum
  }
}

function calcClickCoordinates (mouseX, mouseY, canvasLeft, canvasTop, canvasRight, canvasBottom) {
  let xInBounds = false
  let yInBounds = false
  if (mouseX >= canvasLeft && mouseX <= canvasRight) {
    xInBounds = true
  }
  if (mouseY >= canvasTop && mouseY <= canvasBottom) {
    yInBounds = true
  }
  if (xInBounds && yInBounds) {
    const clickX = mouseX - canvasLeft
    const clickY = mouseY - canvasTop
    const point = { x: clickX, y: clickY }
    return point
  } else {
    return null
  }
}

function getIntermediateFrame (currentFrame, rows, cols) {
  const frame = makeMatrix(rows, cols)
  // console.log(frame)
  for (let i = 0; i < currentFrame.length; i++) {
    for (let j = 0; j < currentFrame[0].length; j++) {
      let jOffset
      let iOffset

      // Right Neighbour
      jOffset = j + 1
      iOffset = i
      iOffset = reindexI(iOffset, rows)
      jOffset = reindexJ(jOffset, cols)
      const rightNeighbourCount = currentFrame[iOffset][jOffset]

      // Left Neighbour
      jOffset = j - 1
      iOffset = i
      iOffset = reindexI(iOffset, rows)
      jOffset = reindexJ(jOffset, cols)
      const leftNeighbourCount = currentFrame[iOffset][jOffset]

      // Bottom Neighbour
      jOffset = j
      iOffset = i + 1
      iOffset = reindexI(iOffset, rows)
      jOffset = reindexJ(jOffset, cols)
      // console.log('I OFFSET' +  iOffset + 'FOR CELL' + i + j);
      // console.log('J OFFSET' +  jOffset + 'FOR CELL' + i + j);
      const bottomNeighbourCount = currentFrame[iOffset][jOffset]

      // Bottom Right Neighbour
      jOffset = j + 1
      iOffset = i + 1
      iOffset = reindexI(iOffset, rows)
      jOffset = reindexJ(jOffset, cols)
      const bottomRightNeighbourCount = currentFrame[iOffset][jOffset]

      // Bottom Left Neighbour
      jOffset = j - 1
      iOffset = i + 1
      iOffset = reindexI(iOffset, rows)
      jOffset = reindexJ(jOffset, cols)
      const bottomLeftNeighbourCount = currentFrame[iOffset][jOffset]

      // Top Neighbour
      jOffset = j
      iOffset = i - 1
      iOffset = reindexI(iOffset, rows)
      jOffset = reindexJ(jOffset, cols)
      const topNeighbourCount = currentFrame[iOffset][jOffset]

      // Top Left Neighbour
      jOffset = j - 1
      iOffset = i - 1
      iOffset = reindexI(iOffset, rows)
      jOffset = reindexJ(jOffset, cols)
      const topLeftNeighbourCount = currentFrame[iOffset][jOffset]

      // Top Right Neighbour
      jOffset = j + 1
      iOffset = i - 1
      iOffset = reindexI(iOffset, rows)
      jOffset = reindexJ(jOffset, cols)
      const topRightNeighbourCount = currentFrame[iOffset][jOffset]

      const totalNeighbourCount = topNeighbourCount +
                topRightNeighbourCount +
                rightNeighbourCount +
                bottomRightNeighbourCount +
                bottomNeighbourCount +
                bottomLeftNeighbourCount +
                leftNeighbourCount +
                topLeftNeighbourCount
      // console.log(i + ' I')
      // console.log(j + ' J')
      frame[i][j] = totalNeighbourCount
      if (totalNeighbourCount !== 0) {
        // console.log('Cell ' + i + j + ' Has ' +totalNeighbourCount + ' total neighbours neighbours' + rightNeighbourCount + ' RIGHT NEIGHBOURS ' + leftNeighbourCount + ' LEFT NEIGHBOURS ' + topNeighbourCount + ' TOP NEIGHBOURS ' + topRightNeighbourCount + ' TOP RIGHT NEIGHBOURS ' + topLeftNeighbourCount + ' TOP LEFT NEIGHBOURS ' + bottomNeighbourCount + ' BOTTOM NEIGHBOURS ' + bottomRightNeighbourCount + ' BOTTOM RIGHT NEIGHBOURS ' + bottomLeftNeighbourCount + ' BOTTOM LEFT NEIGHBOURS ');
      }
    }
  }
  return frame
}

function drawBoard (wid, hei, context, cellSize) {
  context.strokeStyle = 'black'
  context.beginPath()
  for (let x = 0; x <= wid; x += cellSize) {
    context.moveTo(x, 0)
    context.lineTo(x, hei)
  }

  for (let x = 0; x <= hei; x += cellSize) {
    context.moveTo(0, x)
    context.lineTo(wid, x)
  }
  context.stroke()
}

function getPreset () {
  const value = select.options[select.selectedIndex].value
  return value
}

function draw (currentFrame, context, cellSize) {
  for (let i = 0; i < currentFrame.length; i++) {
    for (let j = 0; j < currentFrame[0].length; j++) {
      if (currentFrame[i][j] === 1) {
        context.fillStyle = 'black'
        context.fillRect(j * cellSize + 1, i * cellSize + 1, cellSize - 2, cellSize - 2)
      } else {
        context.fillStyle = 'white'
        context.fillRect(j * cellSize + 1, i * cellSize + 1, cellSize - 2, cellSize - 2)
      }
    }
  }
}
function any () {
  let array = [[0, 1, 1, 1],
    [1, 1, 1, 0]]
}

function drawToad (currentFrame, context, cellSize, crd, rows, cols) {
  let rowOffset = crd.y
  let colOffset = crd.x
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y
  colOffset = crd.x + 1
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y
  colOffset = crd.x + 1
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset + 1] = 1

  rowOffset = crd.y + 1
  colOffset = crd.x
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y + 1
  colOffset = crd.x - 1
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y + 1
  colOffset = crd.x + 1
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  draw(currentFrame, context, cellSize)
}

function drawAcorn (currentFrame, context, cellSize, crd, rows, cols) {
  let rowOffset = crd.y
  let colOffset = crd.x
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y - 1
  colOffset = crd.x - 2
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y + 1
  colOffset = crd.x - 3
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y + 1
  colOffset = crd.x - 2
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y + 1
  colOffset = crd.x + 1
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y + 1
  colOffset = crd.x + 2
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y + 1
  colOffset = crd.x + 3
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  draw(currentFrame, context, cellSize)
}

function drawLWSS (currentFrame, context, cellSize, crd, rows, cols) {
  let rowOffset = crd.y
  let colOffset = crd.x
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y
  colOffset = crd.x - 3
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y + 1
  colOffset = crd.x + 1
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y + 2
  colOffset = crd.x - 3
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y + 2
  colOffset = crd.x + 1
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y + 3
  colOffset = crd.x - 2
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y + 3
  colOffset = crd.x - 1
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y + 3
  colOffset = crd.x
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  rowOffset = crd.y + 3
  colOffset = crd.x + 1
  rowOffset = reindexI(rowOffset, rows)
  colOffset = reindexJ(colOffset, cols)
  currentFrame[rowOffset][colOffset] = 1

  draw(currentFrame, context, cellSize)
}

function resize (adjustedSize, cellSize) {
  const arrH = adjustedSize.h / cellSize
  const arrW = adjustedSize.w / cellSize
  const adjustedArr = { arrH: arrH, arrW: arrW }
  return adjustedArr
}

export { calcNewCellState, makeMatrix, calcCellCoordinates, calcClickCoordinates, getIntermediateFrame, drawBoard, getPreset, draw, drawToad, drawAcorn, drawLWSS, reindexJ, reindexI, resize }
