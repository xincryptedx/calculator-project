//References
const calcDisplayText = document.querySelector('#calcDisplayText');

var calcDisplayData = [0]; //initial value for calc dispaly should be zero

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
    console.log(e.key); //Remove later

    //If it is back
    if (key === 'Backspace'){
        calcDisplayData.pop();
        updateDisplay();
    }

})

//Functions
function appendData(d){
    //Check for leading 0 in display data
    if (calcDisplayData[0] === 0) calcDisplayData.shift();

    calcDisplayData.push(d);
}

function updateDisplay(){


    calcDisplayText.innerHTML = calcDisplayData.join("");
}