//References
const calcDisplayText = document.querySelector('#calcDisplayText');

var calcData = [0]; //initial value for calc dispaly should be zero

var operatorKeys = [' / ',' * ',' + ',' - '];

//Button refs go here eventually

//Key event handling for keyboard input
document.addEventListener('keydown', (e) => {

    let key = e.key;
    let code = e.code;

    if (!isNaN(key) && code !=='Space') numberKey(key);

    if (key === 'Backspace') backKey();

    if (key === 'Delete') clearKey();

    if (operatorKeys.includes(' ' + key + ' ')) operatorKey(' ' + key + ' ');

    if (key === '.') decimalKey();

    if (key === 'Enter') equalsKey();
})

//Functions
function numberKey(key){
    if (calcData[0] === 0 && !operatorKeys.includes(calcData[1])) calcData.shift();
    calcData.push(+key);
    addCommas();
    updateDisplay();
}

function backKey(){
    calcData.pop();
    if (calcData.length === 0) calcData = [0];
    updateDisplay();
}

function clearKey(){
    calcData = [0];
    updateDisplay();
}

function operatorKey(key){
    if (lastIsNumber()) calcData.push(key);
    else if (!lastIsNumber()){
        calcData.pop();
        calcData.push(key);
    }
    updateDisplay();
}

function decimalKey(){
    if (inDecimal().found === true) return;
    calcData.push('.');
    updateDisplay();
}

function equalsKey(){
    let num1 = '';
    let num2 = '';
    let result = 0;
    let beginIndex = 0;
    let endIndex = 0;

    for (i = 0; i <= calcData.length - 1; i++){
        if (calcData[i] === ' * ') { 
        getNumsForOperation(num1,num2,beginIndex,endIndex,i);
        console.log('* found! Index: ' + i);
        }
    }
}

function getNumsForOperation(num1, num2, beginIndex, endIndex, operatorIndex){
    for (i = operatorIndex - 1; i >= 0; i--){
        if (!isNaN(calcData[i])) num1 = calcData[i].toString() + num1;
    }
}

function lastIsNumber(){
    if(!isNaN(calcData[calcData.length -1])) return true;
    return false;
}

function inDecimal(index = calcData.length -1){
    let decimalDetection = {
        found: false,
        indexAt: 0
    }

    for (let i = index; i >= 0; i--){
        if (calcData[i] === '.'){
            decimalDetection.found = true;
            decimalDetection.indexAt = i;
            break;
        }
        if (operatorKeys.includes(calcData[i])) break;
    }

    return decimalDetection;
}

function numberOfOperators(){
    let numOperators = 0;
    calcData.forEach((e) => {if (operatorKeys.includes(e)) numOperators++});
    return numOperators;
}

function numberOfDecimals(){
    let numDecimals = 0;
    calcData.forEach((e) => {if (e === '.') numDecimals++});
    return numDecimals;
}

function updateDisplay(){
    calcDisplayText.innerHTML = calcData.join("");
}

function removeCommas(){
    for (let i = 0; i <= calcData.length -1; i++){
        if (calcData[i] === ',') calcData.splice(i,1);
    }
}

function addCommas(){
    let digitCount = 0;

    removeCommas();

    for (let i = calcData.length -1; i >= 0; i--){
        if (inDecimal(i).found === true) {
            i = inDecimal(i).indexAt;
            continue;
        }
        if (isNaN(calcData[i])) digitCount = 0;
        if (!isNaN(calcData[i]) && calcData[i] != '.') digitCount++;
        if (digitCount === 3 && !isNaN(calcData[i-1])){
            calcData.splice(i,0,',');
            digitCount = 0;
        }
    }

    return;    
}