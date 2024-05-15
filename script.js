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
   
    displayValue = roundDisplayNumber(displayValueToString); //Check if displayValue is too big or if decimal value is too big

    if (displayValue === "That number is too big!") { //If whole number is too big, returns a string to say so
        displayPara.setAttribute("style", "display: flex; font-size: 3em; font-weight: bold; margin: 0; max-width: 100%; padding: 10px;"); 
        displayPara.textContent = displayValue;
        displayDiv.appendChild(displayPara);
    } else {
        displayPara.textContent = addComma(displayValue);
        displayDiv.appendChild(displayPara);
    }
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
    displayPara.setAttribute("style", "display: flex; font-size: 5em; font-weight: bold; margin: 0; max-width: 100%; padding-right: 10px;") //Reset displayPara style if cleared
})

function isDecimal(item) {
    if (item === ".") { //Check if item is period
        return true;
    }
}

decimal.addEventListener("click", () => {
    
    let splitDisplayValue = displayValue.split(""); //Split string into array
    let checkDecimal = splitDisplayValue.find(isDecimal); //Check if array has a period
    let checkIfOverTen = isOverTen(splitDisplayValue); //Check if array is over or equal to ten


    if (checkIfOverTen === true) { //Disable decimal button if displayValue is equal or over ten digits
        decimal.ariaDisabled = "true";
    } else {
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

function addComma(string) {
    let array = string.split(""); //Split text into array
    let newArray = []; 
    let newStringArray = [];
    array.map((char) => { //Unshift characters from array into newArray
        newArray.unshift(char);
    }); 
    let decimalIndex = array.indexOf("."); //Find index of decimal

    if (array.includes(".") === true) { //Check if array includes decimal and return text if yes
        return array.join("");
    }

    if (decimalIndex !== -1) { //Execute code below if decimal is found
        let wholeNumberPart = array.slice(0, decimalIndex) 
        console.log(wholeNumberPart);
        let decimalNumberPart = array.slice(decimalIndex, (array.length + 1));
        console.log(decimalNumberPart);

        for (let i = 0; i < wholeNumberPart.length; i++) {   
            if (i % 3 === 0 && i !== 0 && wholeNumberPart[i] !== "," && wholeNumberPart[i] !== "-") { 
                wholeNumberPart[i] += ","; //Add comma to wholeNumberPart if i is divisible by 3 and isn't 0 and wholeNumberPart[i] isn't comma or negative symbol
            } 

            const completeNumber = wholeNumberPart.concat(decimalNumberPart); //Combine wholeNumberPart with added comma to decimalNumberPart

            console.log(completeNumber);

            return completeNumber;

        } 
    } else {
        for (let i = 0; i < newArray.length; i++) {   
            if (i % 3 === 0 && i !== 0 && newArray[i] !== "," && newArray[i] !== "-") { 
                newArray[i] += ","; //Add comma to newArray if i is divisible by 3 and isn't 0 and newArray[i] isn't comma or negative symbol
            } 
        }
    }

    newArray.map((char) => { //Unshift characters into newStringArray to get correct order of numbers
        newStringArray.unshift(char);
    });

    let newString = newStringArray.join(""); 

    return newString;
}

function roundDisplayNumber(string) {
    let array = string.split("");
    let decimalIndex = array.indexOf("."); //Find index of decimal
    let checkIfOverTen = isOverTen(array); //Check if array is over or equal to ten

    if (decimalIndex === -1) { //If number is whole number and too big return a string to inform user
        if (checkIfOverTen === true) {
            return "That number is too big!"
        } 
    } else {
        let wholeNumberPartArray = array.slice(0, decimalIndex); //Get whole number part of string
        let wholeNumberPart = wholeNumberPartArray.join("");
        let wholeNumberPartLength = wholeNumberPart.length; 
        let decimalNumberPart = array.slice(decimalIndex, (array.length + 1)); //Get decimal number part of string

        if (checkIfOverTen === true) { //If string is over ten digits and has decimal
            switch (wholeNumberPartLength) { 
                case 1: //Whole number has one digit
                    decimalNumberPart.splice(9); //Remove every number after index 9 so decimalNumberPart has only 9 digits
                    
                    if (Number(decimalNumberPart[-1]) >= 5) { //Execute code to round up if last array item has a value more than or equal to 5
                        decimalNumberPart.splice(8); //Remove last index item
                        let roundedNum = Number(decimalNumberPart[-1]) + 1; //Calculate new rounded number
                        decimalNumberPart.splice(7); //Remove last index item
                        decimalNumberPart.push(roundedNum.toString()); //Push rounded number to be new last index item

                        const completeNumber = wholeNumberPart.concat(decimalNumberPart); //Combine wholeNumberPart with decimalNumberPart
                        console.log(completeNumber);

                        return completeNumber;
                    } else {
                        decimalNumberPart.splice(8); //Remove last index item that is less than 5

                        const completeNumber = wholeNumberPart.concat(decimalNumberPart); //Combine wholeNumberPart with decimalNumberPart
                        console.log(completeNumber);

                        return completeNumber;
                    }

                     
            }
        }
    }
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