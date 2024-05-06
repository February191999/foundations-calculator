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
let displayValue = '';

const zero = document.querySelector(".zero");
const one = document.querySelector(".one");
const two = document.querySelector(".two");
const three = document.querySelector(".three");
const four = document.querySelector(".four");
const five = document.querySelector(".five");
const six = document.querySelector(".six");
const seven = document.querySelector(".seven");
const eight = document.querySelector(".eight");
const nine = document.querySelector(".nine");
const numbers = document.querySelectorAll(".number");
const numList = [zero, one, two, three, four, five, six, seven, eight, nine];
const displayDiv = document.querySelector(".display-div");
const displayPara = document.createElement("p");

numbers.forEach(num => num.addEventListener("click", () => {
    displayPara.textContent += num.value;
    displayDiv.appendChild(displayPara);
}))

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