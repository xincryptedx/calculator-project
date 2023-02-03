const calcDisplayText = document.querySelector('#calcDisplayText');

const backBtn = document.getElementById('backBtn');
const clearBtn = document.getElementById('clearBtn');
const divideBtn = document.getElementById('divideBtn');
const multiplyBtn = document.getElementById('multiplyBtn');
const addBtn = document.getElementById('addBtn');
const subtractBtn = document.getElementById('subtractBtn');
const decimalBtn = document.getElementById('decimalBtn');
const equalsBtn = document.getElementById('equalsBtn');
const btn0 = document.getElementById('0Btn');
const btn1 = document.getElementById('1Btn');
const btn2 = document.getElementById('2Btn');
const btn3 = document.getElementById('3Btn');
const btn4 = document.getElementById('4Btn');
const btn5 = document.getElementById('5Btn');
const btn6 = document.getElementById('6Btn');
const btn7 = document.getElementById('7Btn');
const btn8 = document.getElementById('8Btn');
const btn9 = document.getElementById('9Btn');

var calcData = [0]; //initial value for calc dispaly should be zero

var operatorKeys = [' / ',' * ',' + ',' - '];

const foundNumbers ={
    num1:'',
    num2:'',
    beginIndex:0,
    endIndex:0
}

//Button click events
backBtn.onclick = () => backKey();
clearBtn.onclick = () => clearKey();
divideBtn.onclick = () => operatorKey(' / ');
multiplyBtn.onclick = () => operatorKey(' * ');
addBtn.onclick = () => operatorKey(' + ');
subtractBtn.onclick = () => operatorKey(' - ');
decimalBtn.onclick = () => decimalKey();
equalsBtn.onclick = () =>{
    equalsKey();
    splitResult();
    addCommas();
    updateDisplay();
}
btn0.onclick = () => numberKey(0);
btn1.onclick = () => numberKey(1);
btn2.onclick = () => numberKey(2);
btn3.onclick = () => numberKey(3);
btn4.onclick = () => numberKey(4);
btn5.onclick = () => numberKey(5);
btn6.onclick = () => numberKey(6);
btn7.onclick = () => numberKey(7);
btn8.onclick = () => numberKey(8);
btn9.onclick = () => numberKey(9);

//Key event handling for keyboard input
document.addEventListener('keydown', (e) => {

    let key = e.key;
    let code = e.code;

    if (!isNaN(key) && code !=='Space') numberKey(key);

    if (key === 'Backspace') backKey();

    if (key === 'Delete') clearKey();

    if (operatorKeys.includes(' ' + key + ' ')) operatorKey(' ' + key + ' ');

    if (key === '.') decimalKey();

    if (key === 'Enter'){
        equalsKey();
        splitResult();
        addCommas();
        updateDisplay();
    }
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
    let result = 0;

    for (i = 0; i <= calcData.length - 1; i++){
        if (calcData[i] === ' * ' || calcData[i] === ' / ') { 
            getNumsForOperation(i);
            if (calcData[i] === ' * ') result = parseFloat(foundNumbers.num1) * parseFloat(foundNumbers.num2);
            if (calcData[i] === ' / ') result = parseFloat(foundNumbers.num1) / parseFloat(foundNumbers.num2);
            updateAfterOperation(result);
            equalsKey();
            break;
        }
        if (calcData.includes(' * ') || calcData.includes(' / ')) continue;
        if (calcData[i] === ' + ' || calcData[i] === ' - ') { 
            getNumsForOperation(i);
            if (calcData[i] === ' + ') result = parseFloat(foundNumbers.num1) + parseFloat(foundNumbers.num2);
            if (calcData[i] === ' - ') result = parseFloat(foundNumbers.num1) - parseFloat(foundNumbers.num2);
            updateAfterOperation(result);
            equalsKey();
            break;
        }
    }
}

function getNumsForOperation(operatorIndex){
    clearFoundNumbers();
    for (let i = operatorIndex - 1; i >= 0; i--){
        if (!isNaN(calcData[i]) || calcData[i] === '.'){
            foundNumbers.num1 = calcData[i].toString() + foundNumbers.num1;
            foundNumbers.beginIndex = i;
        }
        if (operatorKeys.includes(calcData[i])) break;
    }
    for (let i = operatorIndex + 1; i <= calcData.length -1; i++){
        if (!isNaN(calcData[i]) || calcData[i] === '.'){
            foundNumbers.num2 += calcData[i].toString();
            foundNumbers.endIndex = i;
        }
        if (operatorKeys.includes(calcData[i])) break;
    }

    return;
}

function updateAfterOperation(result){
    calcData.splice(foundNumbers.beginIndex, foundNumbers.endIndex 
        - foundNumbers.beginIndex + 1, result);
    console.log(calcData);
}

function clearFoundNumbers(){
    foundNumbers.num1 = '';
    foundNumbers.num2 = '';
    foundNumbers.beginIndex = 0;
    foundNumbers.endIndex = 0;
}

function splitResult(){
    let result = calcData[0].toString();
    calcData = result.split('');
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