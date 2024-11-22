const DIGIT_BUTTON_SELECTOR = ".button.digit";
const OPERATOR_BUTTON_SELECTOR = ".button.operator";
const CALCULATOR_DISPLAY_SELECTOR = ".calculator-display";
const CALCULATOR_MINI_DISPLAY_SELECTOR = ".calculator-mini-display";
const CLEAR_BUTTON_SELECTOR = ".button.clear";
const BACKSPACE_BUTTON_SELECTOR = ".button.backspace";
const DECIMAL_POINT_BUTTON_SELECTOR = ".button.decimal-point";

const calculator = new Calculator();
let [A, B, operator] = ["", "", null];

const calcDisplay = document.querySelector(CALCULATOR_DISPLAY_SELECTOR);
const calcMiniDisplay = document.querySelector(CALCULATOR_MINI_DISPLAY_SELECTOR);
const digitButtons = document.querySelectorAll(DIGIT_BUTTON_SELECTOR);
const operatorButtons = document.querySelectorAll(OPERATOR_BUTTON_SELECTOR);
const clearButton = document.querySelector(CLEAR_BUTTON_SELECTOR);
const backspaceButton = document.querySelector(BACKSPACE_BUTTON_SELECTOR);
const decimalPointButton = document.querySelector(DECIMAL_POINT_BUTTON_SELECTOR);

digitButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => onDigitEntered(e.target.innerText))
});

operatorButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => onOperatorEntered(e.target.innerText))
});

clearButton.addEventListener("click", () => {
    calcDisplay.innerText = "\n";
    calcMiniDisplay.innerText = "\n";
    [A, B, operator] = ["", "", null];
})

backspaceButton.addEventListener("click", () => onBackSpace());


document.addEventListener("keydown", (e) => {
    e.preventDefault();
    onKeyDown(e.key);
});


function Calculator() {
    this.add = (a, b) => +a + +b;
    this.sub = (a, b) => a - b;
    this.multiply = (a, b) => a * b;
    this.divide = (a, b) => a / b;
    this.operate = function (a, b, operator) {
        switch (operator) {
            case "+":
                return +this.add(a, b).toFixed(5);
            case "-":
                return +this.sub(a, b).toFixed(5);
            case "×":
                return +this.multiply(a, b).toFixed(5);
            case "÷":
                return +this.divide(a, b).toFixed(5);
            default:
                break;
        }
    };
}

function onDigitEntered(digit) {
    if (operator === null) {
        if (A === "0") {
            A = digit;
        } else {
            A += digit;
        }
    } else {
        if (B === "0") {
            B = digit;
        } else {
            B += digit;
        }
    }
    updateDisplays(false);
}

function onOperatorEntered(inputOperator) {
    if (A !== "") {
        if (inputOperator != "=") {
            if (B === "") {
                operator = inputOperator;
            } else {
                A = calculator.operate(A, B, operator);
                B = "";
                operator = inputOperator;
            }
            updateDisplays(false);
        } else {
            if (B !== "") {
                A = calculator.operate(A, B, operator);
                operator = null;
                updateDisplays(true);
                B = "";
            }
        }
    }
    console.log(A, B, operator);
}

function onBackSpace() {
    if (operator === null) {
        let aStr = String(A);
        aStr = aStr.slice(0, aStr.length - 1);
        A = (isNaN(aStr)) ? "" : aStr;
    } else {
        if (B === "") {
            operator = null;
        } else {
            let bStr = String(B);
            bStr = bStr.slice(0, bStr.length - 1);
            B = (isNaN(bStr)) ? "" : bStr;
        }
    }
    updateDisplays(false);
}

function updateDisplays(operatorIsEquals) {
    if (A === "") {
        calcDisplay.innerText = "\n";
        calcMiniDisplay.innerText = "\n";
    } else {
        if (operator === null) {
            if (operatorIsEquals) {
                calcMiniDisplay.innerText += " " + B + " =";
            } else {
                calcMiniDisplay.innerText = A;
            }
            calcDisplay.innerText = A;
        } else {
            if (B === "") {
                calcDisplay.innerText = "\n";
            } else {
                calcDisplay.innerText = B;
            }
            calcMiniDisplay.innerText = A + " " + operator;
        }
    }
}

function onKeyDown(key) {
    if (key <= "9" && key >= "0") {
        onDigitEntered(key);
    } else if (["+", "-", "/", "*", "=", "Enter"].includes(key)) {
        let enteredOperator = key;
        if (enteredOperator === "/") {
            enteredOperator = "÷";
        } else if (enteredOperator === "*") {
            enteredOperator = "×";
        } else if (enteredOperator === "Enter") {
            enteredOperator = "=";
        }
        onOperatorEntered(enteredOperator);
    } else if (key === "Backspace") {
        onBackSpace();
    }
}