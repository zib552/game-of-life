let matrix; 
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
        if(matrix[point2.y][point2.x] === 0){
            matrix[point2.y][point2.x] = 1;
        }
        else{
            matrix[point2.y][point2.x] = 0;
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
    for (let i = 0; i < matrix.length; i++){
        for (let j = 0; j < matrix[0].length; j++){
            if(matrix[i][j] === 1){
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
    for (let i = 0; i < matrix.length; i++){
        for (let j = 0; j < matrix[0].length; j++){
        
            let reindexJ = j;
            let reindexI = i;

            reindexJ = reindexJ + 1;
            reindexI = reindex(reindexI);
            reindexJ = reindex(reindexJ);
            let rightNeighbourCount = matrix[reindexI][reindexJ];
            reindexJ = reindexJ - 1;

            reindexJ = reindexJ - 1;
            reindexI = reindex(reindexI);
            reindexJ = reindex(reindexJ);
            let leftNeighbourCount = matrix[reindexI][reindexJ];
            reindexJ = reindexJ + 1;

            reindexI = reindexI + 1;
            reindexI = reindex(reindexI);
            reindexJ = reindex(reindexJ);
            let bottomNeighbourCount = matrix[reindexI][reindexJ];
            reindexI = reindexI - 1;

            reindexI = reindexI + 1;
            reindexJ = reindexJ + 1;
            reindexI = reindex(reindexI);
            reindexJ = reindex(reindexJ);
            let bottomRightNeighbourCount = matrix[reindexI][reindexJ];
            reindexI = reindexI - 1;
            reindexJ = reindexJ - 1

            reindexI = reindexI + 1;
            reindexJ = reindexJ - 1;
            reindexI = reindex(reindexI);
            reindexJ = reindex(reindexJ);
            let bottomLeftNeighbourCount = matrix[reindexI][reindexJ];
            reindexI = reindexI - 1;
            reindexJ = reindexJ + 1;

            reindexI = reindexI - 1;
            reindexI = reindex(reindexI);
            reindexJ = reindex(reindexJ);
            let topNeighbourCount = matrix[reindexI][reindexJ];
            reindexI = reindexI + 1

           
            reindexI = reindexI - 1;
            reindexJ = reindexJ - 1;
            reindexI = reindex(reindexI);
            reindexJ = reindex(reindexJ);
            let topLeftNeighbourCount = matrix[reindexI][reindexJ];
            reindexI = reindexI + 1;
            reindexJ = reindexJ + 1;

            reindexI = reindexI - 1;
            reindexJ = reindexJ + 1;
            reindexI = reindex(reindexI);
            reindexJ = reindex(reindexJ);
            let topRightNeighbourCount = matrix[reindexI][reindexJ];
            reindexI = reindexI + 1;
            reindexJ = reindexJ - 1;

            reindexI = reindex(reindexI);
            reindexJ = reindex(reindexJ);

            let totalNeighbourCount = (rightNeighbourCount + leftNeighbourCount) + (bottomNeighbourCount + bottomRightNeighbourCount) + (bottomLeftNeighbourCount) + (topNeighbourCount + topRightNeighbourCount) + (topLeftNeighbourCount);
            //console.log('Cell ' + i + j + ' Has ' +totalNeighbourCount + ' total neighbours neighbours' + rightNeighbourCount + ' RIGHT NEIGHBOURS ' + leftNeighbourCount + ' LEFT NEIGHBOURS ' + topNeighbourCount + ' TOP NEIGHBOURS ' + topRightNeighbourCount + ' TOP RIGHT NEIGHBOURS ' + topLeftNeighbourCount + ' TOP LEFT NEIGHBOURS ' + bottomNeighbourCount + ' BOTTOM NEIGHBOURS ' + bottomRightNeighbourCount + ' BOTTOM RIGHT NEIGHBOURS ' + bottomLeftNeighbourCount + ' BOTTOM LEFT NEIGHBOURS ');
            cellId = {i: i, j: j, neighbours: totalNeighbourCount };
            status = drawSimulate(cellId);
        }            
    }
    console.log(cellId.status);
    for (let i = 0; i < matrix.length; i++){
        for (let j = 0; j < matrix[0].length; j++){
            if(cellId.status === 1){
                console.log('WOOO');
                matrix[i][j] = 1; 
            }
            else{
                console.log('DEAD')
                matrix[i][j] = 0;
            }
        }
    }
    draw();        
}
function drawSimulate(cellId){
    if(cellId.neighbours === 3){
        cellId.status = 1;
        console.log('CELL ' + cellId.i + cellId.j + ' IS ' +  status + ' WITH ' + cellId.neighbours + ' NEIGHBOURS'); 
    }
    if(cellId.neighbours === 2  && matrix[cellId.i][cellId.j] === 1){
        cellId.status = 1;
        console.log('CELL ' + cellId.i + cellId.j + ' IS ' + status + ' WITH ' + cellId.neighbours + ' NEIGHBOURS');
    }
    else {
        cellId.status = 0;
    }
}
function reindex(num){
    if(num === -1){
        //num = matrix.length - 1;
        indexNum = matrix.length - 1;
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
    if (num < matrix.length && num != -2 && num != 0){
        indexNum = num;
        return indexNum;
    }
    if(num >= matrix.length){
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
    console.table(matrix);
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
    matrix = makeMatrix(arrH, arrW);
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