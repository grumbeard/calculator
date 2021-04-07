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

const displayPanel = document.getElementById("display-panel");


function handleInput(e) {
  // Get user input
  // ASSUMPTION: user inputs one digit/symbol at a time
  const userInput = e.target.innerText;
  let processedInput = processInput(userInput);
  // Update input field with results of evaluation

  // If input is number, store number
  if (processedInput.number) {
    if (memory.num2 || memory.operator) {
      memory.num2 += processedInput.number;
    } else {
      memory.num1 += processedInput.number;
    }
  // Otherwise, input is operator
  } else {
    // Check if necessary inputs are available
    if (readyToOperate()) {
      // If so, evaluate inputs and display results
      handleEvaluation();
    }
    // Etiher way, store the new operator
    memory.operator = processedInput.operator;
  }
  console.log(`Num1: ${memory.num1}, Num2: ${memory.num2}, Operator: ${memory.operator}`);
}

function processInput(string) {
  // Extract numbers (including floats)
  let number = string.match(/\d+\.?\d*/);
  // Extract any valid operators
  let operator = string.match(/[+\-/]|\*{1,2}/);
  return number ? {number: number[0]} : {operator: operator[0]};
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
    if (e.target.id == "equals__btn") resetValues('operator')
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
  // Round to 15 significant figures only when displaying value
  // Ensures stored value in memory remains accurate
  if (results) results = results.toPrecision(15);

  displayPanel.innerText = results;
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
const equalsButton = document.getElementById("equals__btn");
equalsButton.addEventListener("click", handleEvaluation);

// Detect Cancel
const cancelButton = document.getElementById("cancel__btn");
cancelButton.addEventListener("click", () => {
  resetValues('num1', 'num2', 'operator');
  updateDisplay('');
});
