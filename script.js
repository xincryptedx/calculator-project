//References
calcDisplayText = document.querySelector('#calcDisplayText');

var calcDisplayData = [0]; //initial value for calc dispaly should be zero

//Button refs go here eventually

//Key event handling for keyboard input
document.addEventListener('keydown', (e) => {

    let key = e.key;

    if (!isNaN(key)){
        appendData(+key);
    }
})

//Functions
function appendData(d){
    //Check for leading 0 in display data
    if (calcDisplayData[0] === 0) calcDisplayData.shift();

    calcDisplayData.push(d);
}