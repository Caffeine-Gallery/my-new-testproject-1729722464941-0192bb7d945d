import { backend } from "declarations/backend";

let display = document.getElementById("display");
let currentValue = "";
let operator = "";
let waitingForSecondOperand = false;

document.querySelectorAll(".number, .decimal").forEach(button => {
    button.addEventListener("click", () => {
        if (waitingForSecondOperand) {
            display.value = button.textContent;
            waitingForSecondOperand = false;
        } else {
            display.value += button.textContent;
        }
        currentValue = display.value;
    });
});

document.querySelectorAll(".operator").forEach(button => {
    button.addEventListener("click", () => {
        operator = button.textContent;
        waitingForSecondOperand = true;
    });
});

document.querySelector(".clear").addEventListener("click", () => {
    display.value = "";
    currentValue = "";
    operator = "";
    waitingForSecondOperand = false;
});

document.querySelector(".equals").addEventListener("click", async () => {
    if (operator && currentValue) {
        const firstOperand = parseFloat(display.value);
        const secondOperand = parseFloat(currentValue);
        let result;

        try {
            switch (operator) {
                case "+":
                    result = await backend.add(firstOperand, secondOperand);
                    break;
                case "-":
                    result = await backend.subtract(firstOperand, secondOperand);
                    break;
                case "*":
                    result = await backend.multiply(firstOperand, secondOperand);
                    break;
                case "/":
                    result = await backend.divide(firstOperand, secondOperand);
                    break;
            }
            display.value = result.toString();
            currentValue = result.toString();
            operator = "";
            waitingForSecondOperand = false;
        } catch (error) {
            display.value = "Error";
            currentValue = "";
            operator = "";
            waitingForSecondOperand = false;
        }
    }
});
