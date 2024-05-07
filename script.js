const numbers = document.querySelectorAll(".number");
const buttons = document.querySelectorAll(".button");
const displayDiv = document.querySelector(".display-div");
const displayPara = document.createElement("p");
const clear = document.querySelector(".clear");
const del = document.querySelector(".del");

function addNumbers(firstNum, secondNum) {
    return firstNum + secondNum;
}

function subtractNumbers(firstNum, secondNum) {
    return firstNum - secondNum;
}

function multiplyNumbers(firstNum, secondNum) {
    return firstNum * secondNum;
}

function divideNumbers(firstNum, secondNum) {
    return firstNum / secondNum;
}

let firstNumber = "";
let secondNumber = "";
let operator;
let displayValue = "";

// buttons.forEach(button => button.addEventListener("click", () => {
//     button.setAttribute("style", "opacity: 0.6; transition: 0.3s;")
// }))

numbers.forEach(num => num.addEventListener("click", () => {

    displayValue += num.value;

    displayPara.textContent = displayValue;

    displayDiv.appendChild(displayPara);
}))

clear.addEventListener("click", () => {
    displayValue = ""; //Resets displayValue
    displayDiv.removeChild(displayPara); 
})

function storeInFirst() {
    if (operator !== undefined) {
        firstNumber = displayValue;
    }
}


function operate(firstNum, secondNum, operator) {
    switch (operator) {
        case ("add"): 
            addNumbers(firstNum, secondNum);
            break;
        case ("subtract"):
            subtractNumbers(firstNum, secondNum);
            break;
        case ("multiply"):
            multiplyNumbers(firstNum, secondNum);
            break;
        case ("divide"):
            divideNumbers(firstNum, secondNum);
            break;
    }   
}