import { calcNewCellState, makeMatrix, calcCellCoordinates, calcClickCoordinates, getIntermediateFrame, drawBoard, getPreset, draw, drawToad, drawAcorn, drawLWSS} from './engine.js';

let currentFrame;
let intermediateFrame; //For holding the neighbour count
let nextFrame; 
let context = canvas.getContext("2d");
const cellSize = 10;
let status;
let value = 0;
window.addEventListener('DOMContentLoaded', init);

function init(){
    let submitBtn = document.getElementById('submit-button');
    submitBtn.addEventListener('click', getInputValue);
    let simulateBtn = document.getElementById('simulate-button');
    simulateBtn.addEventListener('click', simulate);
    let clearBtn1 = document.getElementById('clear-button');
    clearBtn1.addEventListener('click', clear);
    let drawPresetBtn = document.getElementById('drawPreset-button');
    drawPresetBtn.addEventListener('click', drawPreset);
    let animateBtn = document.getElementById('animate');
    animateBtn.addEventListener('click', animate);
    let body = document.getElementById('body').addEventListener('click', handleMouseClick);
    let spanMouseX = document.getElementById('mouse-x'); 
    let spanMouseY = document.getElementById('mouse-y');
    let canvas = document.getElementById('canvas');
    let spans = {spanMouseX: spanMouseX, spanMouseY: spanMouseY, canvas: canvas};
    return spans;
}
function handleMouseClick(event){
    let spans = init();
    const boundingRect = spans.canvas.getBoundingClientRect();
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
        spans.spanMouseX.innerHTML = 'Column ' + point2.x;
        spans.spanMouseY.innerHTML = 'Row ' + point2.y;
    }
    else {
        spans.spanMouseX.innerHTML = 'Out of bounds';
        spans.spanMouseY.innerHTML = 'Out of bounds';
    }
}
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

    let context = canvas.getContext("2d");

    drawBoard(w, h, context, cellSize);
}

function simulate(){
    let rows = document.getElementById("rows").value;
    let cols = document.getElementById("columns").value;

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
        drawToad(currentFrame, context, cellSize);
    }
    if (numValue === 2 && currentFrame.length >= 17 && currentFrame[16][16] != undefined){
        clear();
        drawAcorn(currentFrame, context, cellSize);
    }
    if (numValue === 3 && currentFrame.length >= 17 && currentFrame[16][16] != undefined){
        clear();
        drawLWSS(currentFrame, context, cellSize)
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
function animate(){
    let checkedVal = document.getElementById('animate').checked;
    console.log(checkedVal);
    if(checkedVal === true){
        setTimeout(function(){ simulate(); }, 500);
        setTimeout(function(){ animate(); }, 500);
    }
    else{
        console.log('NOT ANIMATING');
    }
}

function alert(){
    console.log('ALERT');
}


