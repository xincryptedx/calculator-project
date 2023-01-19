//References
calcDisplayText = document.querySelector('#calcDisplayText');

var calcDisplayData = [0]; //initial value for calc dispaly should be zero

//Button refs go here eventually

//Key event handling for keyboard input
document.addEventListener('keydown', (e) => {
    console.log("You pressed the " + e.key + " key! Its key code is " + e.code + ".")
})