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
