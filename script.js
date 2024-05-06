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

let firstNumber;
let secondNumber;
let operator;
let displayValue;

const numbers = document.querySelector(".number");
const displayDiv = document.querySelector(".display-div");
const displayPara = document.createElement("p");

numbers.addEventListener("click", () => {
    alert(numbers.value);
})



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