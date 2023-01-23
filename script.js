//References
const calcDisplayText = document.querySelector('#calcDisplayText');

var calcData = [0]; //initial value for calc dispaly should be zero
var formattedData = [0];

var operatorKeys = ['/','*','+','-']

//Button refs go here eventually

//Key event handling for keyboard input
document.addEventListener('keydown', (e) => {

    let key = e.key;
    let code = e.code;

    if (!isNaN(key) && code !=='Space') numberKey(key);

    if (key === 'Backspace') backKey();

    if (key === 'Delete') clearKey();

    if (operatorKeys.includes(key)) operatorKey(key);

    if (key === '.') decimalKey();
    //Parenthesis

    //Equals

})

//Functions
function numberKey(key){
    //Check for leading 0 in display data
    if (calcData[0] === 0 && !operatorKeys.includes(calcData[1])) calcData.shift();

    calcData.push(+key);

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
    if (inDecimal()) return;
    calcData.push('.');
    updateDisplay();
}

function lastIsNumber(){
    if(!isNaN(calcData[calcData.length -1])) return true;
    return false;
}

function inDecimal(){
    let decDetected = false;
    for (let i = 0; i <= calcData.length; i++){
        if (calcData[i] === '.') decDetected = true;
        if (operatorKeys.includes(calcData[i])) decDetected = false;
    }
    return decDetected;
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
    formattedData = [...calcData];

    formattedData = formatData(formattedData);

    calcDisplayText.innerHTML = formattedData.join("");
}

function formatData(data){
    var dCount = 0;

    for (let i = data.length -1; i >=0; i--){ //step backwards through array
        //Add commas
        if (!isNaN(data[i])){ //if data is number
            dCount++;
        } 
        else if (isNaN(data[i])) dCount = 0; //if not a number
        if (dCount === 3 && !isNaN(data[i -1])){ //if dcount =3, and the next data check is a number
            data.splice(i,0,",");

            dCount = 0;
        }
    }

    return data;    
}