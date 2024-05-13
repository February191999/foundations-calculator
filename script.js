const numbers = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const displayDiv = document.querySelector(".display-div");
const displayPara = document.createElement("p");
const clear = document.querySelector(".clear");
const del = document.querySelector(".del");
const decimal = document.querySelector(".decimal");
const operateButton = document.querySelector(".operate");

displayDiv.setAttribute("style", "display: flex; justify-content: flex-end; align-items: flex-end;");

displayPara.setAttribute("style", "display: flex; font-size: 5em; font-weight: bold; margin: 0; max-width: 100%; padding-right: 10px;")

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
let operator = "";
let displayValue = "";

operatorButtons.forEach(button => button.addEventListener("click", () => {

    if (firstNumber !== "") {
        secondNumber = Number(displayValue);//Store displayValue in secondNumber and change value type to number if firstNumber variable isn't empty
        console.log(`first num is ${firstNumber}`);
        console.log(`Second num is ${secondNumber}`);
        displayValue = ""; //Reset displayValue
        displayDiv.removeChild(displayPara); //Remove displayPara for users to enter new number
        operator = button.value;
        console.log(operator);
    } else {
        firstNumber = Number(displayValue); //Store displayValue in firstNumber and change value type to number 
        console.log(`first num is ${firstNumber}`);
        console.log(`Second num is ${secondNumber}`);
        displayValue = ""; //Reset displayValue
        console.log(displayValue);
        displayDiv.removeChild(displayPara); //Remove displayPara for users to enter new number
        operator = button.value;
        console.log(operator);
    }
}))

operateButton.addEventListener("click", () => {
    
    secondNumber = Number(displayValue); //Store displayValue in secondNumber 
    displayDiv.removeChild(displayPara); //Remove displayPara for users to enter new number
    displayValue = operate(firstNumber, secondNumber, operator); //Store operated value in displayValue

    firstNumber = displayValue; //Store displayValue in firstNumber so users can use previous results in other operations

    secondNumber = ""; //Reset secondNumber value to take in new number in anticipation of another operation with previous result

    let displayValueToString = displayValue.toString();
    console.log(displayValueToString);
   
    displayValue = displayValueToString;
    displayPara.textContent = addComma(displayValue);
    displayDiv.appendChild(displayPara);
})

numbers.forEach(num => num.addEventListener("click", () => {

    displayValue += num.value; //Add num value to displayValue for each click on buttons with number class

    let splitDisplayValue = displayValue.split(""); //Split string into array
    let checkIfOverTen = isOverTen(splitDisplayValue); //Check if array length is over ten
    
    if (checkIfOverTen === true) { //Disable numbers buttons if over ten digits
        numbers.ariaDisabled = "true";
    } 
    else if (splitDisplayValue.includes(",") === true) { //Return displayValue without adding comma if splitDiplayValue contains comma
        displayPara.textContent = displayValue;
        displayDiv.appendChild(displayPara);
    } 
    else {
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
    firstNumber = "";
    secondNumber = "";
    operator = "";
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
    console.log(displayValue);

    let splitDisplayValue = displayValue.split(""); //Split string into array
    let checkIfOverTen = isOverTen(splitDisplayValue);

    if (checkIfOverTen === true) {
        splitDisplayValue.splice(8); //Delete any item after index eight if array length is more than 10
        console.log(splitDisplayValue);
    } else {
        splitDisplayValue.splice(-1, 1); //Delete last item
    }

    let newString = splitDisplayValue.join(""); 
    displayValue = newString;

    displayPara.textContent = addComma(displayValue);

    displayDiv.appendChild(displayPara);
})

function addComma(text) {
    let array = text.split(""); //Split text into array
    let newArray = []; 
    let newStringArray = [];
    array.map((char) => { //Unshift characters from array into newArray
        newArray.unshift(char);
    }); 

    if (array.includes(".") === true) { //Check if array includes decimal and return text if yes
        return array.join("");
    }

    for (let i = 0; i < newArray.length; i++) {   
        if (i % 3 === 0 && i !== 0 && newArray[i] !== "," && newArray[i] !== "." && newArray[i] !== "-") { 
            newArray[i] += ","; //Add comma to newArray if i is divisible by 3 and isn't 0 and newArray[i] isn't comma, decimal, or negative symbol
        } 
    }

    newArray.map((char) => { //Unshift characters into newStringArray to get correct order of numbers
        newStringArray.unshift(char);
    });

    let newString = newStringArray.join(""); 

    return newString;
}

function operate(firstNum, secondNum, operator) {
    switch (operator) {
        case ("add"): 
            return addNumbers(firstNum, secondNum);
        case ("subtract"):
            return subtractNumbers(firstNum, secondNum);
        case ("multiply"):
            return multiplyNumbers(firstNum, secondNum);
        case ("divide"):
            return divideNumbers(firstNum, secondNum);
    }   
}