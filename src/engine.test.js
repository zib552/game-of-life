//import {calcNewCellState} from './engine';
const {calcNewCellState, makeMatrix, calcCellCoordinates} = require('./engine');

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
    expect(result).toEqual([[0]]);
});

 test('Show row and col pos', () => {
     let result = calcCellCoordinates(10, 20)
     expect(result).toEqual({x: 2, y: 4})
 })
