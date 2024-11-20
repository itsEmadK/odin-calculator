let calculator = {
    add: (a, b) => a + b,
    sub: (a, b) => a - b,
    multiply: (a, b) => a * b,
    division: (a, b) => a / b,
    operate: (a, b, operator) => {
        switch (operator) {
            case "+":
                return add(a, b);
            case "-":
                return sub(a, b);
            case "*":
                return multiply(a, b);
            case "/":
                return divide(a, b);
            default:
                break;
        }
    }
}