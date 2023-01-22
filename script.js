//References
const calcDisplayText = document.querySelector('#calcDisplayText');

var calcData = [0]; //initial value for calc dispaly should be zero
var formattedData = [0];

//Button refs go here eventually

//Key event handling for keyboard input
document.addEventListener('keydown', (e) => {

    let key = e.key;
    let code = e.code;

    //If it is a number key
    if (!isNaN(key) && code !=='Space'){ //Space is not a number, ignore it.
        appendData(+key);
        updateDisplay();
    }
    //If it is a function key
    //console.log(e.key); //Remove later
    if (key === 'Backspace'){
        backKey();
    }

    if (key === 'Delete'){
        clearKey();
    }

    if (key === '/'){
        divideKey();
    }

    if (key === '*'){
        multiplyKey();
    }
    //Subtract

    //Add

    //Decimal

    //Parenthesis

    //Equals

})

//Functions
function backKey(){
    calcData.pop();
    if (calcData.length === 0) calcData = [0];
    updateDisplay();
}

function clearKey(){
    calcData = [0];
    updateDisplay();
}

function divideKey(){
    calcData.push('/');
    updateDisplay();
}

function multiplyKey(){
    calcData.push('*');
    updateDisplay();
}

function lastIsNumber(){
    if(!isNaN(calcData[calcData.length -1])) return true;
    return false;
}

function appendData(d){
    //Check for leading 0 in display data
    if (calcData[0] === 0) calcData.shift();

    calcData.push(d);
}

function updateDisplay(){
    formattedData = [...calcData];

    formattedData = formatData(formattedData);

    calcDisplayText.innerHTML = formattedData.join("");
}

function formatData(data){
    var dCount = 0;

    for (var i = data.length -1; i >=0; i--){ //step backwards through array
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