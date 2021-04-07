// Init placeholders to store numbers and operators
let storedNum1 = '';
let storedNum2 = '';
let storedOperator = '';

// Detect Enter
const enterButton = document.getElementById("btn__enter");
enterButton.addEventListener("click", handleEnter);

function handleEnter() {
  // Get user input
  // ASSUMPTION: user inputs one digit/symbol at a time
  const inputField = document.querySelector("input");
  const userInput = inputField.value;
  let processedInput = processInput(userInput);
  // Update input field with results of evaluation

  // If input is number, store number
  if (processedInput.number) {
    if (storedNum2 || storedOperator) {
      storedNum2 += processedInput.number;
    } else {
      storedNum1 += processedInput.number;
    }
  // Otherwise, input is operator and should be stored as such
  } else {
    storedOperator = processedInput.operator;
  }
  console.log(`Num1: ${storedNum1}, Num2: ${storedNum2}, Operator: ${storedOperator}`);

  // Check if necessary inputs are available
  // If so, evaluate inputs and display results
  if (readyToOperate()) {
    let num1 = parseFloat(storedNum1);
    let num2 = parseFloat(storedNum2);
    let outcome = operate(num1, num2, storedOperator);
    // Round to 15 significant figures only when displaying value
    inputField.value = outcome.toPrecision(15);

    // Update stored values
    storedNum1 = outcome;
    resetValues(storedNum2, storedOperator);
  }
}

function processInput(string) {
  // Extract numbers (including floats)
  let number = string.match(/\d+\.?\d*/);
  // Extract any valid operators
  let operator = string.match(/[+\-/]|\*{1,2}/);
  return number ? {number: number[0]} : {operator: operator[0]};
}

function readyToOperate() {
  return storedNum1 && storedNum2 && storedOperator;
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

function resetValues() {
  [...arguments].forEach(argument => argument = '');
}
