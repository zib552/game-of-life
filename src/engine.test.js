//import {calcNewCellState} from './engine';
const {calcNewCellState} = require('./engine');

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
})
