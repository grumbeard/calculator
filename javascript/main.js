// Detect Enter
const enterButton = document.getElementById("btn__enter");
enterButton.addEventListener("click", handleEnter);

function handleEnter() {
  // Get user input
  const inputField = document.querySelector("input");
  const userInput = inputField.value;
  let processedInput = processInput(userInput);
  // Update input field with results of evaluation
  inputField.value = operate(processedInput[0], processedInput[1], processedInput[2]);
}

function processInput() {
  return ['+', 1, 2]
}

function operate(operator, num1, num2) {
  switch (operator) {
    case '+':
    return num1 + num2;
  }
}
