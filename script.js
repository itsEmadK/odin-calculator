const DIGIT_BUTTON_SELECTOR = ".button.digit";
const OPERATOR_BUTTON_SELECTOR = ".button.operator";
const CALCULATOR_DISPLAY_SELECTOR = ".calculator-display";
const CALCULATOR_MINI_DISPLAY_SELECTOR = ".calculator-mini-display";

const calculator = new Calculator();
let [A, B, operator] = [null, null, null];

const calcDisplay = document.querySelector(CALCULATOR_DISPLAY_SELECTOR);
const calcMiniDisplay = document.querySelector(CALCULATOR_MINI_DISPLAY_SELECTOR);
const digitButtons = document.querySelectorAll(DIGIT_BUTTON_SELECTOR);
const operatorButtons = document.querySelectorAll(OPERATOR_BUTTON_SELECTOR);

digitButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const digit = e.target.innerText;
        if (operator === null) {
            A = +((A ?? "") + digit);
            calcDisplay.innerText = A;
            calcMiniDisplay.innerHTML = A;
        } else {
            B = +((B ?? "") + digit);
            calcDisplay.innerText = B;
        }
    });
});

operatorButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        let newOperator = e.target.innerText;
        if (newOperator != "=") {
            if (B === null) {
                operator = newOperator;
                calcMiniDisplay.innerHTML = A + " " + newOperator;
            } else {
                A = calculator.operate(A, B, operator);
                calcDisplay.innerText = A;
                calcMiniDisplay.innerHTML = A + " " + newOperator;
                B = null;
                operator = newOperator;
            }
        } else {
            calcMiniDisplay.innerHTML = A;
            calcMiniDisplay.innerHTML += " " + operator + " ";
            calcMiniDisplay.innerHTML += B;
            calcMiniDisplay.innerHTML += " =";
            A = calculator.operate(A, B, operator);
            calcDisplay.innerText = A;
            B = null;
            operator = null;
        }
    })
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