let currentFrame;
let intermediateFrame; //For holding the neighbour count
let nextFrame; 
let spanMouseX = document.getElementById('mouse-x'); 
let spanMouseY = document.getElementById('mouse-y');
let canvas = document.getElementById('canvas');
let context = canvas.getContext("2d");
const cellSize = 10;
let body = document.getElementById('body').addEventListener('click', handleMouseClick);
let status;

window.addEventListener('DOMContentLoaded', init);

function init(){
    console.log('Hello from init');
}

function handleMouseClick(event){
    const boundingRect = canvas.getBoundingClientRect();
    let point = calcClickCoordinates(event.clientX, event.clientY, boundingRect.left, boundingRect.top, boundingRect.right, boundingRect.bottom);
    if(point){
        let point2 = calcCellCoordinates(point.x , point.y);
        if(currentFrame[point2.y][point2.x] === 0){
            currentFrame[point2.y][point2.x] = 1;
        }
        else{
            currentFrame[point2.y][point2.x] = 0;
        }
        draw();
        spanMouseX.innerHTML = 'Column ' + point2.x;
        spanMouseY.innerHTML = 'Row ' + point2.y;
    }
    else {
        spanMouseX.innerHTML = 'Out of bounds';
        spanMouseY.innerHTML = 'Out of bounds';
    }
}
function calcCellCoordinates(canvasX, canvasY){
    let colNum = (Math.floor((canvasX / cellSize)));
    let rowNum = (Math.floor((canvasY / cellSize)));
    let point2 = {x: colNum,y: rowNum};
    return point2;
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
function draw(){
    for (let i = 0; i < currentFrame.length; i++){
        for (let j = 0; j < currentFrame[0].length; j++){
            if(currentFrame[i][j] === 1){
                context.fillStyle = 'black';
                context.fillRect(j*cellSize + 1, i*cellSize + 1, cellSize - 2, cellSize - 2);
            }
            else{
                context.fillStyle = 'white';
                context.fillRect(j *cellSize + 1, i *cellSize + 1, cellSize - 2, cellSize - 2); 
            }
        }
    }
}
function simulate(){
    console.log('INITIALIZE');
    for (let i = 0; i < currentFrame.length; i++){
        for (let j = 0; j < currentFrame[0].length; j++){
            
            let jOffset;
            let iOffset;
    
            //Right Neighbour
            jOffset = j + 1;
            iOffset = i;
            iOffset = reindex(iOffset);
            jOffset = reindex(jOffset);
            let rightNeighbourCount = currentFrame[iOffset][jOffset];

            //Left Neighbour
            jOffset = j - 1;
            iOffset = i;
            iOffset = reindex(iOffset);
            jOffset = reindex(jOffset);
            let leftNeighbourCount = currentFrame[iOffset][jOffset];

            //Bottom Neighbour
            jOffset = j;
            iOffset = i + 1;
            iOffset = reindex(iOffset);
            jOffset = reindex(jOffset);
            let bottomNeighbourCount = currentFrame[iOffset][jOffset];

            //Bottom Right Neighbour
            jOffset = j + 1;
            iOffset = i + 1;
            iOffset = reindex(iOffset);
            jOffset = reindex(jOffset);
            let bottomRightNeighbourCount = currentFrame[iOffset][jOffset];

            //Bottom Left Neighbour
            jOffset = j - 1;
            iOffset = i + 1;
            iOffset = reindex(iOffset);
            jOffset = reindex(jOffset);
            let bottomLeftNeighbourCount = currentFrame[iOffset][jOffset];

            //Top Neighbour
            jOffset = j;
            iOffset = i - 1;
            iOffset = reindex(iOffset);
            jOffset = reindex(jOffset);
            let topNeighbourCount = currentFrame[iOffset][jOffset];
            

            //Top Left Neighbour
            jOffset = j - 1;
            iOffset = i - 1;
            iOffset = reindex(iOffset);
            jOffset = reindex(jOffset);
            let topLeftNeighbourCount = currentFrame[iOffset][jOffset];

            //Top Right Neighbour
            jOffset = j + 1;
            iOffset = i - 1;
            iOffset = reindex(iOffset);
            jOffset = reindex(jOffset);
            let topRightNeighbourCount = currentFrame[iOffset][jOffset];

            iOffset = reindex(iOffset);
            jOffset = reindex(jOffset);

            let totalNeighbourCount = topNeighbourCount
                + topRightNeighbourCount
                + rightNeighbourCount
                + bottomRightNeighbourCount
                + bottomNeighbourCount
                + bottomLeftNeighbourCount
                + leftNeighbourCount
                + topLeftNeighbourCount; 

            intermediateFrame[i][j] = totalNeighbourCount;
            //console.log('Cell ' + i + j + ' Has ' +totalNeighbourCount + ' total neighbours neighbours' + rightNeighbourCount + ' RIGHT NEIGHBOURS ' + leftNeighbourCount + ' LEFT NEIGHBOURS ' + topNeighbourCount + ' TOP NEIGHBOURS ' + topRightNeighbourCount + ' TOP RIGHT NEIGHBOURS ' + topLeftNeighbourCount + ' TOP LEFT NEIGHBOURS ' + bottomNeighbourCount + ' BOTTOM NEIGHBOURS ' + bottomRightNeighbourCount + ' BOTTOM RIGHT NEIGHBOURS ' + bottomLeftNeighbourCount + ' BOTTOM LEFT NEIGHBOURS ');
        }            
    }
   
    for (let i = 0; i < intermediateFrame.length; i++){
        for (let j = 0; j < intermediateFrame[0].length; j++){
            nextFrame[i][j] = calcNewCellState(currentFrame[i][j], intermediateFrame[i][j]);
        }
    }
    //console.table(currentFrame);
    //console.table(intermediateFrame);
    //console.table(nextFrame);

    currentFrame = nextFrame;
    draw();        
}
function calcNewCellState(currentState, neighbours){
    let newState;
    console.log(neighbours);
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

function testCalcNewCellStateIsBorn(){
    let result = calcNewCellState(0, 3);
    if(result === 1){
        console.log('PASS');
    }
    else{
        console.error('FAILED');
    }
}

function testCalcNewCellStateSurvive(){
    let result = calcNewCellState(1, 2);
    if(result === 1){
        console.log('PASS');
    }
    else{
        console.error('FAILED');
    }
}

function testCalcNewCellStateDie(){
    let result = calcNewCellState(1, 0);
    if(result === 0){
        console.log('PASS');
    }
    else{
        console.error('FAILED');
    }
}

function runTests(){
    testCalcNewCellStateIsBorn();
    testCalcNewCellStateSurvive();
    testCalcNewCellStateDie();
}  


function reindex(num){
    if(num === -1){
        //num = matrix.length - 1;
        indexNum = currentFrame.length - 1;
        return indexNum;
    }
    if(num === 0){
        indexNum = num;
        return indexNum;
    }
    if(num === -2){
        //num = 8;
        indexNum = 8;
        return indexNum;
    }
    if (num < currentFrame.length && num != -2 && num != 0){
        indexNum = num;
        return indexNum;
    }
    if(num >= currentFrame.length){
        //num = 0;
        indexNum = 0;
        return indexNum;
    }
    
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
    //console.table(matrix);
    return matrix;
}

/* function toggleState(rowPoint, colPoint){
    arr[rowPoint][colPoint] = 1;
    return arr;
} */

function getInputValue() {
    let rows = document.getElementById("rows").value;
    let cols = document.getElementById("columns").value;
    const h = rows * cellSize;
    canvas.height = h;

    const w = cols * cellSize;
    canvas.width = w;
    const arrH = h / cellSize;
    const arrW = w / cellSize;
    currentFrame = makeMatrix(arrH, arrW);
    nextFrame = makeMatrix(arrH, arrW);
    intermediateFrame = makeMatrix(arrH, arrW);
    drawBoard(w, h);
}
function drawBoard(w, h){
    context.strokeStyle = "black";
    context.beginPath();
    for (let x = 0; x <= w ; x += cellSize) {
        context.moveTo( x, 0);
        context.lineTo( x , h );
    }

    for (let x = 0; x <= h; x += cellSize) {
        context.moveTo(0,  x );
        context.lineTo(w,  x );
    }
    context.stroke();
}          