# foundations-calculator

This Odin Project calculator assignment is developed using HTML, CSS, and Javascript. 

CSS flexbox is used to style the different components of the calculator such as the button, display, and calculator body. Buttons are arranged and styled with flexbox properties like justify-content and align-items. Additionally, border-radius is used to give the calculator a rounded appearance. The gap property is used to space the buttons out evenly. The buttons are also styled with CSS :hover property to add a hover affect that changes the outline of a calculator button. 

The HTML button number button elements have value properties that is used by JavaScript to obtain the number value and respond according to the number button pressed. 

JavaScript DOM manipulation is used to target the different button elements of the calculator and add specific functions according to the button's intended function. Event listeners are added to the different button to listen for clicks. Clicking a number or decimal button will append the value to the display. The ariaDisable property of the decimal button is used to deactivate the decimal button if the display value already has a decimal. This prevents the user from inputting multiple decimal points to a number. 

The calculator also has a button to turn the number negative or positive, by shifting or unshifting the negative symbol from the display value when the button is pressed. Operator return the value of the specified operator to be used in the operate function which is called in the operateButton. In addition to this, the calculator also has a clear and delete button that clears the calculator or deletes the last number from the display.

To improve visibility, an addComma function is also used to place commas in the different parts of the display value. The addComma function uses a series of if and else conditions to decide how it should deal with different number cases such as whole numbers over thousand, single digit numbers with decimals or whole number with decimals. What's more, there's also a roundDisplayNumber function to round the number if it's over nine digits by using toFixed and toPrecision to deal with decimal numbers. 

JavaScript's DOM manipulation is also used to target the window object to add keyboard support to the calculator. The event listener listens for keydown events and and adds the key value to the display value if the typed key is a number. An if/else condition is used to clear the calculator if a backspace key is pressed or to operate if the enter key is pressed. 

Every button has an "event.curentTarget.blur()" line to deal with unwanted focus on the button after it is clicked. This prevents problems that occur with the keyboard events when the enter button is involved.