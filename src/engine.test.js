//import {calcNewCellState} from './engine';
const {calcNewCellState, makeMatrix, calcCellCoordinates, reindexJ, reindexI, calcClickCoordinates, getInputValue, draw, clearBtn} = require('./engine');

test('Is born', () => {
    let result = calcNewCellState(0, 3);
    expect(result).toBe(1);
});

test('Survives', () => {
    let result = calcNewCellState(1, 2);
    expect(result).toBe(1);
});

test('Dies', () => {
    let result = calcNewCellState(1, 0);
    expect(result).toBe(0);
});

test('Make matrix', () => {
    let result = makeMatrix(1, 1);
    for (let i = 0; i < 2; i++){
        for (let j = 0; j < 1; j++){
            expect(result).toEqual([[0]]);
        }
    }
});

test('Show row and col pos', () => {
     let result = calcCellCoordinates(10, 20, 5)
     expect(result).toEqual({x: 2, y: 4});
 });

test('Reindex when J pos is -1', () => {
    let result = reindexJ(-1, 5)
    expect(result).toBe(4)
 });

test('Reindex when J pos is 0', () => {
    let result = reindexJ(0, 10)
    expect(result).toBe(0)
 });

test('Reindex when J pos is inside grid', () => {
    let result = reindexJ(9, 10)
    expect(result).toBe(9)
 });

test('Reindex when J pos is outside of grid', () => {
    let result = reindexJ(12, 10)
    expect(result).toBe(0)
 });

test('Reindex when I pos is -1', () => {
     let result = reindexI(-1, 10);
     expect(result).toBe(9);
 });

test('Reindex when I pos is 0', () => {
    let result = reindexI(0, 10);
    expect(result).toBe(0);
});

test('Reindex when I pos is inside grid', () => {
    let result = reindexI(9, 10);
    expect(result).toBe(9);
});

test('Reindex when I pos is outside of grid', () => {
    let result = reindexI(11, 10);
    expect(result).toBe(0);
});

test('Get click coordinates inside grid', () => {
    let result = calcClickCoordinates(24, 193, 8, 178, 308, 378);
    expect(result).toEqual({x: 16, y: 15});
});

test('Get click coordinates outside of grid', () => {
    let result = calcClickCoordinates(319, 185, 8, 178, 308, 378);
    expect(result).toEqual(null);
});

test('Get width and height', () => {
    let result = getInputValue(50, 12, 5);
    expect(result).toBe(250, 60);
})

test('Cell is drawn black', () => {
    let result = draw([[1,1,1,1,1],[0,1,0,0,0],[0,0,0,0,0]]);
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 6; j++){
            expect(result).toBe(true);
        }
    }
});

test('Cell is drawn white', () => {
    let result = draw([[0,0,0,0,0],[0,0,1,0,0],[0,0,0,0,0]]);
    for (let i = 0; i < 4; i++){
        for (let j = 0; j < 6; j++){
            expect(result).toBe(false);
        }
    }
});

test('Clear button', () => {
    let result = clearBtn([[0,0],[0,0]], [[0,1],[0,0]], [[0,1],[0,0]]);
    expect(result).not.toContain(1)
});