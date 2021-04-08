// Init placeholders to store numbers and operators
let memory = {
  num1: '',
  num2: '',
  operator: ''
};

// Detect calculator number / operator inputs
// BY KEYBOARD
window.addEventListener('keydown', handleInput);

// BY MOUSE
const numbers = document.getElementsByClassName("number");
for (let number of numbers) {
  number.addEventListener("click", handleInput);
};

const operators = document.getElementsByClassName("operator");
for (let operator of operators) {
  operator.addEventListener("click", handleInput);
};

const displayText = document.getElementById("display-text");


function handleInput(e) {
  // Get user input
  // ASSUMPTION: user inputs one digit/symbol at a time
  let processedInput = processInput(e);
  if (!processedInput) return;

  // Update input field with results of evaluation

  // If input is number, store number
  if (processedInput.number) {
    let num = processedInput.number;
    if (memory.num2 || memory.operator) {
      // Ignore extrad period inputs
      if (num == "." && memory.num2.includes(".")) num = '';
      memory.num2 += processedInput.number;
      updateDisplay(parseFloat(memory.num2));
    } else {
      if (num == "." && memory.num1.includes(".")) num = '';
      memory.num1 += processedInput.number;
      updateDisplay(parseFloat(memory.num1));
    }
  // Otherwise, input is operator
  } else {
    // Check if necessary inputs are available
    // If so, evaluate inputs and display results
    if (readyToOperate()) handleEvaluation();
    // Etiher way, store the new operator
    memory.operator = processedInput.operator;
  }
}

function processInput(event) {
  // Check if keypress event
  if (event.key) return processKey(event.key);
  // Identify type of input
  const inputType = event.target.dataset.type;
  const input = event.target.innerText;
  let inputObj = {};
  inputObj[inputType] = input;

  return inputObj;
}

function processKey(key) {
  let keyOperators = ['+','-','x','*','/'];
  let keySpecial = ['=', 'Enter', 'Backspace', 'Delete', 'Escape'];
  let keyButton = null;
  let inputObj = null;

  // Check if number
  if (key.match(/[0-9]|\./)) {
    inputObj = {number: key};
    keyButton = document.querySelector(`[data-num="${key}"]`);
  }
  else if (keyOperators.includes(key)) {
    inputObj = {operator: key};
    if (key == '*') key = 'x'
    keyButton = document.querySelector(`[data-operator="${key}"]`);
  }
  else if (keySpecial.includes(key)) {
    switch (key) {
      case '=':
        keyButton = document.getElementById("equals");
        handleEvaluation();
        break;
      case 'Enter':
        keyButton = document.getElementById("equals");
        if (readyToOperate()) handleEvaluation();
        break;
      case 'Backspace':
        keyButton = document.getElementById("delete");
        handleDelete();
        break;
      case 'Delete':
        keyButton = document.getElementById("delete");
        handleDelete();
        break;
      case 'Escape':
        keyButton = document.getElementById("cancel");
        handleCancel();
        break;
    }
  }
  if (keyButton) {
    keyButton.classList.toggle("typed");
  };
  if (inputObj) return inputObj;
}


function readyToOperate() {
  return memory.num1 && memory.num2 && memory.operator;
}


function handleEvaluation(e) {
  let num1 = parseFloat(memory.num1);
  let num2 = parseFloat(memory.num2);
  let outcome = operate(num1, num2, memory.operator);
  updateDisplay(outcome);
  updateOperands(outcome);
  // Operator should be reset to blank if evaluation triggered by '=' button
  // Operator stored in memory is otherwise usually updated to the operator that triggered the evaluation
  if (e) {
    if (e.target.id == "equals") resetValues('operator')
  }
}

function operate(num1, num2, operator) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case 'x':
      return num1 * num2;
    case '*':
      return num1 * num2;
    case '/':
      return num1 / num2;
    case '':
      return num1;
    default:
      return "invalid";
  }
}

function updateDisplay(value) {
  // Round to 8 significant figures only when displaying value
  // Ensures stored value in memory remains accurate
  if (value && value != "invalid") {
    value <= 99999999 ? value = +value.toPrecision(8) : value = "DANGER!!";
  }

  displayText.innerText = value;
}

function updateOperands(outcome) {
  // Update stored operands
  memory.num1 = outcome;
  resetValues('num2');
}

function resetValues() {
  [...arguments].forEach(argument => memory[argument] = '');
}


// Detect Equals
const equalsButton = document.getElementById("equals");
equalsButton.addEventListener("click", () => {
  if (readyToOperate()) handleEvaluation();
});


// Detect Cancel
const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", handleCancel);

function handleCancel() {
  resetValues('num1', 'num2', 'operator');
  updateDisplay('');
}


// Detect Delete
const deleteButton = document.getElementById("delete");
deleteButton.addEventListener("click", handleDelete);

function handleDelete() {
  if (memory.num2) {
    memory.num2 = removeLastChar(memory.num2.toString());
    updateDisplay(parseFloat(memory.num2));
  } else if (memory.num1) {
    // If any operator exists, user can still delete character from num1
    let newString = removeLastChar(memory.num1.toString());
    memory.num1 = newString;
    updateDisplay(parseFloat(memory.num1));
  }
  // Nothing happens if there is no numerical input to delete
}

function removeLastChar(string) {
  return string.substring(0, (string.length - 1));
}

// Remove keypress effect ('typed') after transition completes
const buttons = document.getElementsByClassName("button");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener('transitionend', removeTyped);
}

function removeTyped(e) {
  e.target.classList.remove("typed");
}
