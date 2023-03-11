const output = document.querySelector('.output');
const buttons = document.querySelectorAll('button');

let currentOperand = '';
let previousOperand = '';
let currentOperator = null;

function appendNumber(number) {
  currentOperand += number;
  updateOutput();
}

function chooseOperator(operator) {
  if (currentOperand === '') return;
  if (previousOperand !== '') {
    calculate();
  }
  currentOperator = operator;
  previousOperand = currentOperand;
  currentOperand = '';
}

function calculate() {
  let result;
  const previous = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(previous) || isNaN(current)) return;
  switch (currentOperator) {
    case '+':
      result = previous + current;
      break;
    case '-':
      result = previous - current;
      break;
    case '*':
      result = previous * current;
      break;
    case '/':
      if (current === 0) {
        alert('Cannot divide by zero');
        clear();
        return;
      }
      result = previous / current;
      break;
    default:
      return;
  }
  currentOperand = result.toString();
  currentOperator = null;
  previousOperand = '';
  updateOutput();
}

function clear() {
  currentOperand = '';
  previousOperand = '';
  currentOperator = null;
  updateOutput();
}

function updateOutput() {
  output.value = currentOperand;
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const buttonValue = button.textContent;
    switch (buttonValue) {
      case 'C':
        clear();
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        chooseOperator(buttonValue);
        break;
      case '=':
        calculate();
        break;
      default:
        if (isNaN(buttonValue)) return;
        appendNumber(buttonValue);
        break;
    }
  });
});
