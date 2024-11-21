const DIGIT_BUTTON_SELECTOR = ".button.digit";
const OPERATOR_BUTTON_SELECTOR = ".button.operator";
const CALCULATOR_DISPLAY_SELECTOR = ".calculator-display";
const CALCULATOR_MINI_DISPLAY_SELECTOR = ".calculator-mini-display";
const CLEAR_BUTTON_SELECTOR = ".button.clear";
const BACKSPACE_BUTTON_SELECTOR = ".button.backspace";

const calculator = new Calculator();
let [A, B, operator] = [null, null, null];

const calcDisplay = document.querySelector(CALCULATOR_DISPLAY_SELECTOR);
const calcMiniDisplay = document.querySelector(CALCULATOR_MINI_DISPLAY_SELECTOR);
const digitButtons = document.querySelectorAll(DIGIT_BUTTON_SELECTOR);
const operatorButtons = document.querySelectorAll(OPERATOR_BUTTON_SELECTOR);
const clearButton = document.querySelector(CLEAR_BUTTON_SELECTOR);
const backspaceButton = document.querySelector(BACKSPACE_BUTTON_SELECTOR);

digitButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => onDigitEntered(e.target.innerText))
});

operatorButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => onOperatorEntered(e.target.innerText))
});

clearButton.addEventListener("click", () => {
    calcDisplay.innerText = "0";
    calcMiniDisplay.innerText = "0";
    [A, B, operator] = [null, null, null];
})

backspaceButton.addEventListener("click", () => onBackSpace());

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
        A = +((A ?? "") + digit);
        calcDisplay.innerText = A;
        calcMiniDisplay.innerHTML = A;
    } else {
        B = +((B ?? "") + digit);
        calcDisplay.innerText = B;
    }
}

function onOperatorEntered(inputOperator) {
    if (inputOperator != "=") {
        if (B === null) {
            operator = inputOperator;
            calcMiniDisplay.innerHTML = A + " " + inputOperator;
        } else {
            A = calculator.operate(A, B, operator);
            calcDisplay.innerText = A;
            calcMiniDisplay.innerHTML = A + " " + inputOperator;
            B = null;
            operator = inputOperator;
        }
    } else {
        if (B !== null) {
            calcMiniDisplay.innerHTML = A;
            calcMiniDisplay.innerHTML += " " + operator + " ";
            calcMiniDisplay.innerHTML += B;
            calcMiniDisplay.innerHTML += " =";
            A = calculator.operate(A, B, operator);
            calcDisplay.innerText = A;
            B = null;
            operator = null;
        }

    }
}

function onBackSpace() {
    if (operator === null) {
        let aStr = String(A);
        aStr = aStr.slice(0, aStr.length - 1);
        A = isNaN(+aStr) ? null : +aStr;
        calcDisplay.innerText = (A ?? "0");
        calcMiniDisplay.innerText = (A ?? "0");
    } else {
        let bStr = String(B);
        bStr = bStr.slice(0, bStr.length - 1);
        B = isNaN(+bStr) ? null : +bStr;
        calcDisplay.innerText = (B ?? "0");
    }
}