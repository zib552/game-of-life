function calcNewCellState(currentState, neighbours){
    let newState;
    //console.log(neighbours);
    if(neighbours === 3){
        newState = 1;
    }
    else if(neighbours === 2  && currentState === 1){
        newState = 1; //Survive
    }
    else {
        newState = 0; //Die
    }
    return newState;
}

function makeMatrix(rows, cols){
    let  matrix= [];
    for( let i = 0; i < rows; i++ ) {
        matrix.push( [] );
    }
    for (let i = 0; i < rows; i++){
        for (let j =  matrix[i].length; j < cols; j++){
            matrix[i].push(0);
        }
    }
    return matrix;
}

function calcCellCoordinates(canvasX, canvasY, cellSize){
    let colNum = (Math.floor((canvasX / cellSize)));
    let rowNum = (Math.floor((canvasY / cellSize)));
    let point2 = {x: colNum,y: rowNum};
    return point2;
}

function reindexJ(num, cols){
    let indexNum = 0;
    if(num === -1){
        indexNum = cols - 1;
        return indexNum;
    }
    if(num === 0){
        indexNum = num;
        return indexNum;
    }
    if (num < cols && num != -2 && num != 0){
        indexNum = num;
        return indexNum;
    }
    if(num > cols - 1){
        indexNum = 0;
        return indexNum;
    }
} 

function reindexI(num, rows){
    let indexNum = 0;
    if(num === -1){
        indexNum = rows - 1;
        return indexNum;
    }
    if(num === 0){
        indexNum = num;
        return indexNum;
    }
    if (num < rows && num != -2 && num != 0){
        indexNum = num;
        return indexNum;
    }
    if(num > rows - 1){
        indexNum = 0;
        return indexNum;
    }  
}

function calcClickCoordinates(mouseX, mouseY, canvasLeft, canvasTop, canvasRight, canvasBottom){
    let xInBounds = false;
    let yInBounds = false;
    if (mouseX >= canvasLeft && mouseX <= canvasRight){
        xInBounds = true;
    }
    if (mouseY >= canvasTop && mouseY <= canvasBottom){
        yInBounds = true;
    }
    if (xInBounds && yInBounds) {
        let clickX = mouseX - canvasLeft;
        let clickY = mouseY - canvasTop;
        let point = {x: clickX, y: clickY};
        return point;
    }
    else {
        return null;
    }
} 

function getInputValue(rows, cols, cellSize) {
    //rows = document.getElementById("rows").value;
    //cols = document.getElementById("columns").value;
    const h = rows * cellSize;
    //canvas.height = h;

    const w = cols * cellSize;
    //canvas.width = w;
    const arrH = h / cellSize;
    const arrW = w / cellSize;
    currentFrame = makeMatrix(arrH, arrW);
    nextFrame = makeMatrix(arrH, arrW);
    intermediateFrame = makeMatrix(arrH, arrW);
    //drawBoard(w, h);
    return(w, h);
}

function draw(currentFrame){
    for (let i = 0; i < currentFrame.length; i++){
        for (let j = 0; j < currentFrame[0].length; j++){
            if(currentFrame[i][j] === 1){
                //context.fillStyle = 'black';
                //context.fillRect(j*cellSize + 1, i*cellSize + 1, cellSize - 2, cellSize - 2);
                return true;
            }
            else{
                //context.fillStyle = 'white';
                //context.fillRect(j *cellSize + 1, i *cellSize + 1, cellSize - 2, cellSize - 2);
                return false; 
            }
        }
    }
}

function clearBtn(currentFrame, intermediateFrame, nextFrame){
    for (let i = 0; i < currentFrame.length; i++){
        for (let j = 0; j < currentFrame[0].length; j++){
            currentFrame[i][j] = 0;
            return currentFrame;
        }
    }
    for (let i = 0; i < intermediateFrame.length; i++){
        for (let j = 0; j < intermediateFrame[0].length; j++){
            intermediateFrame[i][j] = 0;
            return intermediateFrame;
        }
    }
    for (let i = 0; i < nextFrame.length; i++){
        for (let j = 0; j < nextFrame[0].length; j++){
            nextFrame[i][j] = 0;
            return nextFrame;
        }
    }
    //draw();
}
module.exports = {calcNewCellState, makeMatrix, calcCellCoordinates, reindexJ, reindexI, calcClickCoordinates, getInputValue, draw, clearBtn};