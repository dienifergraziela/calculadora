const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operator]");
const deleteButton = document.querySelector("[data-delete]");
const allClearButton = document.querySelector("[data-all-clear]");
const equalsButton = document.querySelector("[data-equals]");
const previousOperandTextElement = document.querySelector("[data-pOperando]");
const currentOperandTextElement = document.querySelector("[data-opAtual]");

class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.clear();
  }

  formatDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split(".")[0]);
    const decimalDigits = stringNumber.split(".")[1];

    let exibicao;

    if (isNaN(integerDigits)) {
        exibicao = "";
    } else {
        exibicao = integerDigits.toLocaleString("en", {
        maximumFractionDigits: 0,
      });
    }

    if (decimalDigits != null) {
      return `${exibicao}.${decimalDigits}`;
    } else {
      return exibicao;
    }
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  calculate() {
    let resultado;

    const _previousOperand = parseFloat(this.previousOperand);
    const _currentOperand = parseFloat(this.currentOperand);

    if (isNaN(_previousOperand) || isNaN(_currentOperand)) return;

    switch (this.operation) {
      case "+":
        resultado = _previousOperand + _currentOperand;
        break;
      case "-":
        resultado = _previousOperand - _currentOperand;
        break;
      case "÷":
        resultado = _previousOperand / _currentOperand;
        break;
      case "*":
        resultado = _previousOperand * _currentOperand;
        break;
      default:
        return;
    }

    this.currentOperand = resultado;
    this.operation = undefined;
    this.previousOperand = "";
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;

    if (this.previousOperand !== "") {
      this.calculate();
    }

    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  appendNumber(number) {
    if (this.currentOperand.includes(".") && number === ".") return;

    this.currentOperand = `${this.currentOperand}${number.toString()}`;
  }

  clear() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  updateDisplay() {
    this.previousOperandTextElement.innerText = `${this.formatDisplayNumber(
      this.previousOperand
    )} ${this.operation || ""}`;
    this.currentOperandTextElement.innerText = this.formatDisplayNumber(
      this.currentOperand
    );
  }
}

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

for (const numberButton of numberButtons) {
  numberButton.addEventListener("click", () => {
    calculator.appendNumber(numberButton.innerText);
    calculator.updateDisplay();
  });
}

for (const operationButton of operationButtons) {
  operationButton.addEventListener("click", () => {
    calculator.chooseOperation(operationButton.innerText);
    calculator.updateDisplay();
  });
}

equalsButton.addEventListener("click", () => {
  calculator.calculate();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
    calculator.delete();
    calculator.updateDisplay();
  });

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
  });
