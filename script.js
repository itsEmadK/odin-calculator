let calculator = new Calculator();

function Calculator() {
    this.add = (a, b) => a + b;
    this.sub = (a, b) => a - b;
    this.multiply = (a, b) => a * b;
    this.divide = (a, b) => a / b;
    this.operate = function (a, b, operator) {
        switch (operator) {
            case "+":
                return this.add(a, b);
            case "-":
                return this.sub(a, b);
            case "*":
                return this.multiply(a, b);
            case "/":
                return this.divide(a, b);
            default:
                break;
        }
    };
}