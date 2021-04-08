// Init placeholders to store numbers and operators
let memory = {
  num1: '',
  num2: '',
  operator: ''
};

// Detect calculator number / operator inputs
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
  // Update input field with results of evaluation

  // If input is number, store number
  if (processedInput.number) {
    let num = processedInput.number;
    if (memory.num2 || memory.operator) {
      if (num == "." && memory.num2.includes(".")) num = '';
      memory.num2 += processedInput.number;
    } else {
      if (num == "." && memory.num1.includes(".")) num = '';
      memory.num1 += processedInput.number;
    }
  // Otherwise, input is operator
  } else {
    // Check if necessary inputs are available
    // If so, evaluate inputs and display results
    if (readyToOperate()) handleEvaluation();
    // Etiher way, store the new operator
    memory.operator = processedInput.operator;
  }
  console.log(`Num1: ${memory.num1}, Num2: ${memory.num2}, Operator: ${memory.operator}`);
}

function processInput(event) {
  // Identify type of input
  const inputType = event.target.dataset.type;
  const input = event.target.innerText;
  let inputObj = {};
  inputObj[inputType] = input;

  return inputObj;
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
    case '*':
    return num1 * num2;
    case '/':
    return num1 / num2;
  }
}

function updateDisplay(results) {
  // Round to 8 significant figures only when displaying value
  // Ensures stored value in memory remains accurate
  if (results) results = +results.toFixed(8);

  displayText.innerText = results;
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
equalsButton.addEventListener("click", handleEvaluation);

// Detect Cancel
const cancelButton = document.getElementById("cancel");
cancelButton.addEventListener("click", () => {
  resetValues('num1', 'num2', 'operator');
  updateDisplay('');
});
