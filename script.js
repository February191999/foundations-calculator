const numbers = document.querySelectorAll(".number");
const buttons = document.querySelectorAll(".button");
const displayDiv = document.querySelector(".display-div");
const displayPara = document.createElement("p");
const clear = document.querySelector(".clear");
const del = document.querySelector(".del");
const decimal = document.querySelector(".decimal");
const buttonTag = document.querySelectorAll("button");

displayDiv.setAttribute("style", "display: flex; justify-content: flex-end; align-items: flex-end;");

displayPara.setAttribute("style", "display: flex; font-size: 5em; font-weight: bold; margin: 0; max-width: 100%")

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

    let splitDisplayValue = displayValue.split(""); //Split string into array
    let checkIfOverTen = isOverTen(splitDisplayValue); //Check if array length is over ten
    
    if (checkIfOverTen === true) { //Disable numbers buttons if over ten digits
        numbers.ariaDisabled = "true";
        console.log(numbers.ariaDisabled);
    } else if (splitDisplayValue.includes(",") === true) {
        displayPara.textContent = displayValue;
        displayDiv.appendChild(displayPara);
    } else {
        displayPara.textContent = addComma(displayValue);

        displayDiv.appendChild(displayPara);
    }
}))

function isOverTen(array) {

    let numString = "0123456789";

    let filteredArray = array.filter(num => numString.includes(num)); //Check if array item is in string to count only numbers

    if (filteredArray.length >= 10) {
        return true;
    }
}

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
        let displayValueWithComma = addComma(displayValue);

        displayValue = displayValueWithComma + decimal.value; //Adds decimal to displayValue

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

function addComma(text) {
    let array = text.split("");
    let newArray = [];
    let newStringArray = [];
    array.map((char) => {
        newArray.unshift(char);
    }); 

    for (let i = 0; i < newArray.length; i++) { 
        if (i % 3 === 0 && i !== 0) {
            newArray[i] += ",";
            console.log(newArray);
        } 
    }

    newArray.map((char) => {
        newStringArray.unshift(char);
    });

    let newString = newStringArray.join("");

    return newString;
}

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