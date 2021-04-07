// Init placeholders to store numbers and operators
let memory = {
  num1: '',
  num2: '',
  operator: ''
};

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
    if (memory.num2 || memory.operator) {
      memory.num2 += processedInput.number;
    } else {
      memory.num1 += processedInput.number;
    }
  // Otherwise, input is operator
  } else {
    // Check if necessary inputs are available
    // If so, evaluate inputs and display results
    if (readyToOperate()) {
      let num1 = parseFloat(memory.num1);
      let num2 = parseFloat(memory.num2);
      let outcome = operate(num1, num2, memory.operator);
      // Round to 15 significant figures only when displaying value
      inputField.value = outcome.toPrecision(15);

      // Update stored operands
      memory.num1 = outcome;
      resetValues('num2');
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
  [...arguments].forEach(argument => memory[argument] = '');
}
