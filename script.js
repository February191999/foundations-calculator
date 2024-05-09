const numbers = document.querySelectorAll(".number");
const buttons = document.querySelectorAll(".button");
const displayDiv = document.querySelector(".display-div");
const displayPara = document.createElement("p");
const clear = document.querySelector(".clear");
const del = document.querySelector(".del");
const decimal = document.querySelector(".decimal");
const buttonTag = document.querySelectorAll("button");

displayDiv.setAttribute("style", "display: flex; justify-content: flex-end; align-items: flex-end; text-wrap: pretty; text-wrap: balance;")

displayPara.setAttribute("style", "display: flex; font-size: 5em; font-weight: bold; margin: 0; text-wrap: balance;")

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

numbers.forEach(num => num.addEventListener("click", () => {

    displayValue += num.value; //Add num value to displayValue for each click on buttons with number class

    displayPara.textContent = displayValue;

    displayDiv.appendChild(displayPara);
}))

clear.addEventListener("click", () => {
    displayValue = ""; //Resets displayValue
    displayDiv.removeChild(displayPara); 
})

function isDecimal(item) {
    if (item === ".") { //Check if item is period
        return true;
    }
}


decimal.addEventListener("click", () => {
    
    let splitDisplayValue = displayValue.split(""); //Split string into array
    let checkDecimal = splitDisplayValue.find(isDecimal); //Check if array has a period

    if (checkDecimal === undefined) { //If checkDecimal returns undefined, decimal button works
        decimal.ariaDisabled = "false"; 
        console.log(decimal.ariaDisabled)
        displayValue += decimal.value;
        displayPara.textContent = displayValue;

        displayDiv.appendChild(displayPara);
    } else if (checkDecimal === true) {
        decimal.ariaDisabled = "true"; //Disable decimal button if checkDecimal finds a period
    }
})

del.addEventListener("click", () => {
    let splitDisplayValue = displayValue.split(""); //Split string into array
    splitDisplayValue.splice(-1, 1); //Delete last item

    let newString = splitDisplayValue.join(""); 

    displayValue = newString;
    displayPara.textContent = displayValue;
    displayDiv.appendChild(displayPara);
})

function operate(firstNum, secondNum, operator) {
    switch (operator) {
        case (operator === "add"): 
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