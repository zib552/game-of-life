import { calcNewCellState, makeMatrix, calcCellCoordinates, calcClickCoordinates, getIntermediateFrame, drawBoard, getPreset, draw} from './engine.js';

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
let value = 0;
let rows = document.getElementById("rows").value;
let cols = document.getElementById("columns").value;

window.addEventListener('DOMContentLoaded', init);

function init(){
    console.log('Hello from init');
    let submitBtn = document.getElementById('submit-button');
    submitBtn.addEventListener('click', getInputValue);
    let simulateBtn = document.getElementById('simulate-button');
    simulateBtn.addEventListener('click', simulate);
    let clearBtn1 = document.getElementById('clear-button');
    clearBtn1.addEventListener('click', clear);
    let drawPresetBtn = document.getElementById('drawPreset-button');
    drawPresetBtn.addEventListener('click', drawPreset);
    let selectPresetBtn = document.getElementById('preset1');
    selectPresetBtn.addEventListener('click', getPreset);
    let animateBtn = document.getElementById('animate');
    animateBtn.addEventListener('click', animate);
}
function handleMouseClick(event){
    const boundingRect = canvas.getBoundingClientRect();
    let point = calcClickCoordinates(event.clientX, event.clientY, boundingRect.left, boundingRect.top, boundingRect.right, boundingRect.bottom);
    if(point){
        let point2 = calcCellCoordinates(point.x , point.y, cellSize);
        if(currentFrame[point2.y][point2.x] === 0){
            currentFrame[point2.y][point2.x] = 1;
        }
        else{
            currentFrame[point2.y][point2.x] = 0;
        }
        draw(currentFrame, context, cellSize);
        spanMouseX.innerHTML = 'Column ' + point2.x;
        spanMouseY.innerHTML = 'Row ' + point2.y;
    }
    else {
        spanMouseX.innerHTML = 'Out of bounds';
        spanMouseY.innerHTML = 'Out of bounds';
    }
}
function getInputValue() {
    rows = document.getElementById("rows").value;
    cols = document.getElementById("columns").value;

    const h = rows * cellSize;
    canvas.height = h;

    const w = cols * cellSize;
    canvas.width = w;

    const arrH = h / cellSize;
    const arrW = w / cellSize;

    currentFrame = makeMatrix(arrH, arrW);
    nextFrame = makeMatrix(arrH, arrW);
    intermediateFrame = makeMatrix(arrH, arrW);

    let context = canvas.getContext("2d");

    drawBoard(w, h, context, cellSize);
}

function simulate(){
    let intermediateFrame = getIntermediateFrame(currentFrame, rows, cols);
    for (let i = 0; i < intermediateFrame.length; i++){
        for (let j = 0; j < intermediateFrame[0].length; j++){
                nextFrame[i][j] = calcNewCellState(currentFrame[i][j], intermediateFrame[i][j]);
        }
    }
    currentFrame = nextFrame;
    draw(currentFrame, context, cellSize);        
}

function drawPreset(){
    let value = getPreset();
    let numValue = parseInt(value);
    if (numValue === 1 && currentFrame.length >= 17 && currentFrame[16][16] != undefined ){
        clear();
        currentFrame[8][7] = 1;
        currentFrame[8][8] = 1;
        currentFrame[8][9] = 1;
        currentFrame[9][8] = 1;
        currentFrame[9][7] = 1;
        currentFrame[9][6] = 1;
        draw(currentFrame, context, cellSize);
    }
    if (numValue === 2 && currentFrame.length >= 17 && currentFrame[16][16] != undefined){
        clear(currentFrame, intermediateFrame, nextFrame);
        currentFrame[7][8] = 1;
        currentFrame[8][9] = 1;
        currentFrame[8][10] = 1;
        currentFrame[8][11] = 1;
        currentFrame[8][6] = 1;
        currentFrame[8][5] = 1;
        currentFrame[6][6] = 1;
        draw(currentFrame, context, cellSize);
    }
    if (numValue === 3 && currentFrame.length >= 17 && currentFrame[16][16] != undefined){
        clear(currentFrame, intermediateFrame, nextFrame);
        currentFrame[7][9] = 1;
        currentFrame[7][6] = 1;
        currentFrame[8][10] = 1;
        currentFrame[9][10] = 1;
        currentFrame[9][6] = 1;
        currentFrame[10][7] = 1;
        currentFrame[10][8] = 1;
        currentFrame[10][9] = 1;
        currentFrame[10][10] = 1;
        draw(currentFrame, context, cellSize);
    }

    if (currentFrame === undefined){
        alert('you must draw a grid')
    }
    else if (numValue === 0){
        alert('You must select a preset');
    }
    else if (currentFrame.length < 17){
        alert('Grid is too small. The minimum size is 17x17');
    }    
}
function clear(){
    for (let i = 0; i < currentFrame.length; i++){
        for (let j = 0; j < currentFrame[0].length; j++){
            currentFrame[i][j] = 0;
        }
    }
    for (let i = 0; i < intermediateFrame.length; i++){
        for (let j = 0; j < intermediateFrame[0].length; j++){
            intermediateFrame[i][j] = 0;
        }
    }
    for (let i = 0; i < nextFrame.length; i++){
        for (let j = 0; j < nextFrame[0].length; j++){
            nextFrame[i][j] = 0;
        }
    }
    draw(currentFrame, context, cellSize);
}
function timer(checkedVal){
    while (checkedVal === true){
        simulate();
        draw(currentFrame, context);
    } 
}
function animate(){
    let checkedVal =  document.getElementById('animate').checked;
    console.log(checkedVal);
    timer(function(checkedVal) {
        while (checkedVal === true){
            //simulate();
            //draw();
        } 
    }, 20);    
}



