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