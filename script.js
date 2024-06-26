const numbers = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");
const displayDiv = document.querySelector(".display-div");
const displayPara = document.createElement("p");
const clear = document.querySelector(".clear");
const del = document.querySelector(".del");
const decimal = document.querySelector(".decimal");
const operateButton = document.querySelector(".operate");
const changeButton = document.querySelector(".change");

displayDiv.setAttribute("style", "display: flex; justify-content: flex-end; align-items: flex-end;");

displayPara.setAttribute("style", "display: flex; font-size: 5em; font-weight: bold; margin: 0; max-width: 100%; padding-right: 10px;");

function addNumbers(firstNum, secondNum) {
    
    let firstNumToString = firstNum.toString(); //Store firstNum as string
    let secondNumToString = secondNum.toString(); //Store secondNum as string

    if (firstNumToString.includes("-") === true && secondNumToString.includes("-") === true) { //Execute if both firstNumToString and secondNumToString have negative symbol
        let secondNumToStringArray = secondNumToString.split("");
        secondNumToStringArray.shift("-"); //Shift negative symbol of secondNum 

        let newSecondNum = secondNumToStringArray.join("");

        return firstNum - Number(newSecondNum); //Subtract newSecondNum value from firstNum
    } else {
        return firstNum + secondNum;
    }
}

function subtractNumbers(firstNum, secondNum) {
    let firstNumToString = firstNum.toString(); //Store firstNum as string
    let secondNumToString = secondNum.toString(); //Store secondNum as string

    if (firstNumToString.includes("-") === true && secondNumToString.includes("-") === true) { //Execute if both firstNumToString and secondNumToString have negative symbol
        let secondNumToStringArray = secondNumToString.split("");
        secondNumToStringArray.shift("-"); //Shift negative symbol of secondNum

        let newSecondNum = secondNumToStringArray.join("");

        return firstNum + Number(newSecondNum); //Add firstNum and newSecondNum value
    } else {
        return firstNum - secondNum;
    }
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
const tooBigNum = "That number is too big!";
const numKeys = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

window.addEventListener("keydown", (event) => {

    if (event.key === "Enter") { //Operate if enter is pressed
        secondNumber = displayValue; //Store displayValue in secondNumber 
        displayDiv.removeChild(displayPara); //Remove displayPara for users to enter new number

        firstNumber = firstNumber.toString();

        displayValue = operate(Number(firstNumber), Number(secondNumber), operator); //Store operated value in displayValue

        firstNumber = displayValue; //Store displayValue in firstNumber so users can use previous results in other operations

        let displayValueToString = displayValue.toString();
        let roundedDisplayValue = roundDisplayNumber(displayValueToString);

        if (roundedDisplayValue === tooBigNum) { //If whole number is too big, returns a string to say so
            displayPara.setAttribute("style", "display: flex; font-size: 3em; font-weight: bold; margin: 0; max-width: 100%; padding: 10px;"); 
            displayValue = roundedDisplayValue;
            displayPara.textContent = displayValue;
            displayDiv.appendChild(displayPara);
        } else {
            displayValue = addComma(roundedDisplayValue); 
            displayPara.textContent = displayValue;
            displayDiv.appendChild(displayPara);
        }

        secondNumber = ""; //Reset secondNumber
        operator = ""; //Reset operator
    } else if (event.key === "Backspace") { //Resets calculator if backspace is pressed 
        displayValue = ""; 
        firstNumber = "";
        secondNumber = "";
        operator = "";
        displayDiv.removeChild(displayPara); 
        displayPara.setAttribute("style", "display: flex; font-size: 5em; font-weight: bold; margin: 0; max-width: 100%; padding-right: 10px;") //Reset displayPara style if cleared
    } else if (event.key in numKeys) { //If key is a number execute code below
        displayValue += event.key; //Add event.key value to displayValue for each keyboard press

        let splitDisplayValue = displayValue.split(""); //Split string into array

        let checkIfOverTen = isOverTen(splitDisplayValue); //Check if array length is over ten
        
        if (checkIfOverTen === true) { //Disable numbers buttons if over ten digits
            numbers.ariaDisabled = "true";
        } else if (splitDisplayValue.includes(",") === true) { //Return displayValue without adding comma if splitDiplayValue contains comma
            displayPara.textContent = displayValue;
            displayDiv.appendChild(displayPara);
        } else if (splitDisplayValue.includes(",") === false && splitDisplayValue.includes(".") === true) {
            displayPara.textContent = addComma(displayValue);

            displayDiv.appendChild(displayPara);
        } else {
            console.log(displayValue);
            displayPara.textContent = addComma(displayValue);

            displayDiv.appendChild(displayPara);
        }
    }
})

changeButton.addEventListener("click", (event) => {

    let displayArray = displayValue.split(""); //Split displayValue

    if (displayValue.indexOf("-") === -1) { //If number isn't negative, unshift negative symbol
        displayArray.unshift("-");
    } else if (displayValue.indexOf("-") !== -1) { //If number is negative, shift negative symbol
        displayArray.shift();
    }

    if (operator === "" && secondNumber === "") { //If operator and secondNumber is empty execute code below
        displayValue = displayArray.join("");
        firstNumber = displayValue;
        displayPara.textContent = addComma(displayValue);
        displayDiv.appendChild(displayPara);
    } else {
        displayValue = displayArray.join("");
        displayPara.textContent = addComma(displayValue);
        displayDiv.appendChild(displayPara);
    }
    event.currentTarget.blur(); //Unfocus button after click
})

operatorButtons.forEach(button => button.addEventListener("click", (event) => {
    if (firstNumber === "" || firstNumber === "-") {
        firstNumber = displayValue; //Store displayValue in firstNumber and change value type to number 
        displayValue = ""; //Reset displayValue
        displayDiv.removeChild(displayPara); //Remove displayPara for users to enter new number
        operator = button.value;
        event.currentTarget.blur(); //Unfocus button after click
    } else if (firstNumber !== "") {
        secondNumber = displayValue;//Store displayValue in secondNumber and change value type to number if firstNumber variable isn't empty
        displayValue = ""; //Reset displayValue
        displayDiv.removeChild(displayPara); //Remove displayPara for users to enter new number
        operator = button.value;
        event.currentTarget.blur(); //Unfocus button after click
    } 
}))

operateButton.addEventListener("click", (event) => {
    
    secondNumber = displayValue; //Store displayValue in secondNumber 
    displayDiv.removeChild(displayPara); //Remove displayPara for users to enter new number

    firstNumber = firstNumber.toString();

    displayValue = operate(Number(firstNumber), Number(secondNumber), operator); //Store operated value in displayValue

    firstNumber = displayValue; //Store displayValue in firstNumber so users can use previous results in other operations

    let displayValueToString = displayValue.toString();
    let roundedDisplayValue = roundDisplayNumber(displayValueToString);

    if (roundedDisplayValue === tooBigNum) { //If whole number is too big, returns a string to say so
        displayPara.setAttribute("style", "display: flex; font-size: 3em; font-weight: bold; margin: 0; max-width: 100%; padding: 10px;"); 
        displayValue = roundedDisplayValue;
        displayPara.textContent = displayValue;
        displayDiv.appendChild(displayPara);
    } else {
        displayValue = addComma(roundedDisplayValue); 
        displayPara.textContent = displayValue;
        displayDiv.appendChild(displayPara);
    }

    firstNumber = ""; //Reset firstNumber
    secondNumber = ""; //Reset secondNumber
    operator = ""; //Reset operator
    event.currentTarget.blur(); //Unfocus button after click
})

numbers.forEach(num => num.addEventListener("click", (event) => {

    displayValue += num.value; //Add num value to displayValue for each click on buttons with number class

    let splitDisplayValue = displayValue.split(""); //Split string into array

    let checkIfOverTen = isOverTen(splitDisplayValue); //Check if array length is over ten
    
    if (checkIfOverTen === true) { //Disable numbers buttons if over ten digits
        numbers.ariaDisabled = "true";
    } else if (splitDisplayValue.includes(",") === true) { //Return displayValue without adding comma if splitDiplayValue contains comma
        displayPara.textContent = displayValue;
        displayDiv.appendChild(displayPara);
    } else {
        displayPara.textContent = addComma(displayValue);
        displayDiv.appendChild(displayPara);
    }
    event.currentTarget.blur(); //Unfocus button after click
}))

function isOverTen(array) {

    let numString = "0123456789";

    let filteredArray = array.filter(num => numString.includes(num)); //Check if array item is in string to count only numbers

    if (filteredArray.length >= 10) {
        return true;
    }
}

clear.addEventListener("click", (event) => {
    displayValue = ""; //Resets displayValue
    firstNumber = "";
    secondNumber = "";
    operator = "";
    displayDiv.removeChild(displayPara); 
    displayPara.setAttribute("style", "display: flex; font-size: 5em; font-weight: bold; margin: 0; max-width: 100%; padding-right: 10px;") //Reset displayPara style if cleared
    event.currentTarget.blur(); //Unfocus button after click
})

function isDecimal(item) {
    if (item === ".") { //Check if item is period
        return true;
    }
}

decimal.addEventListener("click", (event) => {
     
    let splitDisplayValue = displayValue.split(""); //Split string into array
    let checkDecimal = splitDisplayValue.find(isDecimal); //Check if array has a period
    let checkIfOverTen = isOverTen(splitDisplayValue); //Check if array is over or equal to ten


    if (checkIfOverTen === true) { //Disable decimal button if displayValue is equal or over ten digits
        decimal.ariaDisabled = "true";
    } else {
        if (checkDecimal === undefined && displayValue === "") { //If dislayValue is empty, add 0 and decimal point
            displayValue = "0.";
            displayPara.textContent = displayValue;

            displayDiv.appendChild(displayPara);
        } else if (checkDecimal === undefined) { //If checkDecimal returns undefined, decimal button works
        decimal.ariaDisabled = "false"; 
        let displayValueWithComma = addComma(displayValue);

        displayValue = displayValueWithComma + decimal.value; //Adds decimal to displayValue

        displayPara.textContent = displayValue;

        displayDiv.appendChild(displayPara);
        } else if (checkDecimal === true) {
        decimal.ariaDisabled = "true"; //Disable decimal button if checkDecimal finds a period
        }
    }
    event.currentTarget.blur(); //Unfocus button after click
})

del.addEventListener("click", (event) => {

    let splitDisplayValue = displayValue.split(""); //Split string into array
    let checkIfOverTen = isOverTen(splitDisplayValue);

    if (checkIfOverTen === true) {
        splitDisplayValue.splice(8); //Delete any item after index eight if array length is more than 10
    } else {
        splitDisplayValue.splice(-1, 1); //Delete last item
    }

    let newString = splitDisplayValue.join(""); 
    displayValue = newString;

    displayPara.textContent = addComma(displayValue);

    displayDiv.appendChild(displayPara);
    event.currentTarget.blur(); //Unfocus button after click
})

function addComma(string) {
    let toString = string.toString(); //Make sure that string is string
    let array = toString.split(""); //Split text into array
    let newArray = []; //Empty array for reversed string
    let newStringArray = []; //Empty array for new string array
    array.map((char) => { //Unshift characters from array into newArray
        newArray.unshift(char);
    }); 
    let decimalIndex = array.indexOf("."); //Find index of decimal
    let reverseWholeNumber = []; //Empty array for reversed whole number array
    let newWholeNumberPart = []; //Empty array for new whole number array
    let wholeNumberPart = array.slice(0, decimalIndex) //Slice the whole number portion of number
    wholeNumberPart.map((char) => {
        reverseWholeNumber.unshift(char); //Unshift characters from wholeNumberPart to reverseWholeNumber in reverse order
    })
    let decimalNumberPart = array.slice(decimalIndex, (array.length + 1)); //Get decimal number part

    if (decimalIndex !== -1 && array.includes(",") === false && array.includes("-")) { //Execute code below if decimal is found and number doesn't have comma but is negative

        for (let i = 0; i < reverseWholeNumber.length; i++) {   
            if (i % 3 === 0 && i !== 0 && reverseWholeNumber[i] !== "-") { 
                reverseWholeNumber[i] += ","; //Add comma to reverseWholeNumber if i is divisible by 3 and isn't 0 and reverseWholeNumber[i] isn't comma or negative symbol
            } 
        }

        reverseWholeNumber.map((char) => {
            newWholeNumberPart.unshift(char); //Unshift characters from reversed array to right positions
        });

        const completeNumber = newWholeNumberPart
        .concat(decimalNumberPart) //Combine newWholeNumberPart with added comma to decimalNumberPart
        .join(""); //Join array to string
        return completeNumber; 
    } else if (array.includes(".") === true && array.includes(",") === true) { //Return text if array includes decimal and comma
        return string;
    } else if (array.includes(".") === false && array.includes(",") === false) { //Execute if number doesn't have decimal and doesn't have comma
        for (let i = 0; i < newArray.length; i++) {   
            if (i % 3 === 0 && i !== 0 && newArray[i] !== "-") { 
                newArray[i] += ","; //Add comma to newArray if i is divisible by 3 and isn't 0 and newArray[i] isn't comma or negative symbol
            } 
        }
    } else if (array.includes(".") === true && array.includes(",") === false && wholeNumberPart.length < 4) { //Execute if number is decimal but doesn't have comma and isn't a thousand or more
        return string;
    } else if (array.includes(".") === true && array.includes(",") === false) { //Execute if number is decimal but doesn't have comma
        for (let i = 0; i < reverseWholeNumber.length; i++) {   
            if (i % 3 === 0 && i !== 0 && reverseWholeNumber[i] !== "-") { 
                reverseWholeNumber[i] += ","; //Add comma to reverseWholeNumber if i is divisible by 3 and isn't 0 and reverseWholeNumber[i] isn't comma or negative symbol
            } 
        }

        reverseWholeNumber.map((char) => {
            newWholeNumberPart.unshift(char); //Unshift characters from reversed array to right positions
        });

        const completeNumber = newWholeNumberPart
        .concat(decimalNumberPart) //Combine newWholeNumberPart with added comma to decimalNumberPart
        .join(""); //Join array to string
        return completeNumber;
    }

    newArray.map((char) => { //Unshift characters into newStringArray to get correct order of numbers
        newStringArray.unshift(char);
    });

    let newString = newStringArray.join(""); 

    return newString;
}

function roundDisplayNumber(string) {
    let toString = string.toString(); //Make sure string is string
    let toNum = Number(string); //Make sure string is number
    let array = toString.split(""); 
    let decimalIndex = array.indexOf("."); //Find index of decimal
    let checkIfOverTen = isOverTen(array); //Check if array is over or equal to ten
    let wholeNumberPart = array.slice(0, decimalIndex); //Slices only the whole number

    if (wholeNumberPart.length === 1 && array.includes(".") === true) {
        return toNum.toFixed("8")/1; //Divide by one to prevent trailing 0s
    } else if (decimalIndex === -1) { //If number is whole number and too big return a string to inform user
        if (checkIfOverTen === true) {
            let alert = tooBigNum;
            return alert;
        } else {
          return toString;
        }
    } else {    

        if (checkIfOverTen === true) { //If string is over ten digits and has decimal
            return (toNum.toPrecision(9))/1; //Divide by one to prevent trailing 0s
        } else {
            return addComma(toString);
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