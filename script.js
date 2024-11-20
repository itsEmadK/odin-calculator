let calculator = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    multiply: (a, b) => a * b,
    divide: (a, b) => a / b,
    operate: function (a, b, operator) {
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
    }
}