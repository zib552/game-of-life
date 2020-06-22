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

module.exports = {calcNewCellState};