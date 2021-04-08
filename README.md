# The Odin Project - Foundations
# Project #4: Calculator

**Goal**:
Create an interactive HTML calculator as part of The Odin Project [curriculum](https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator#assignment).

**Live Link**:
👉 https://grumbeard.github.io/calculator/

## About
This calculator takes both mouse and keyboard inputs and is able to store the results of an equation as the input of the next.

### Features
- The mathematical expression, consisting of two operands and an operator, is automatically evaluated on the next operator or "=" input
- The latest operand being entered is displayed as typed
- User may clear the calculator (empty storage and clear displayed value)
- User may delete the latest char input for an operand (deletion of all digits after period will remove period)
- Prevention of multiple '.' period in operand
- Automatic rounding off to 8 significant figures
- Proper handling of very large numbers and impossible calculations (e.g. "divide by zero")
- Proper handling of premature attempts to evaluate expression through "="
- Fancy (hopefully) hover/click/keypress effects

### Challenges
1. Refactoring code to process single-char input instead of entire expression given as string 
  - When working on the backend logic in the beginning, inputs were given as a string within a text field that was 'submitted' through a button.
  - Initially, Regex was used to identify and appropriately store valid operands and operators (e.g. from "2 * 5.8 / 4")
  - The backend logic was therefore not optimized to accepting single-char inputs which could have been potentially much simpler
  - Reoptimizing the input processing involved stripping down code made unnecessary by the stricter constraints of receiving single-digit inputs
2. Adding keyboard support on top of code optimized for mouse click-based inputs
  - While it felt like going in circles, the opportunity to refactor the code repeatedly with additional layers of constraints was great practice
  - Keyboard event keys do not always translate neatly to their respective calculator symbols and have to be handled with various approaches
    - e.g. \* and "x" are both associated with "multiply"
    - e.g. Enter/Return and "=" are both associated with "equals"
3. Harmonizing mouse hover/click and keypress effects
  - Mouse events trigger pseudo classes which can be easily used to toggle styling in CSS
  - However, keyboard events are not the same and styling had to be added *and removed* by JavaScript
  - This was an opportunity to get acquainted with other event types like 'transitionend'
4. Lots of gotchas to navigate
  - Most of which are detailed in the [curriculum](https://www.theodinproject.com/paths/foundations/courses/foundations/lessons/calculator#assignment)

## UI Mockup
![image](https://user-images.githubusercontent.com/51464365/114050427-d6ce8900-98be-11eb-839d-911d337c2861.png)

## Implemented UI
(animation not shown)
![image](https://user-images.githubusercontent.com/51464365/114055937-c371ec80-98c3-11eb-86bc-9c7aa3e1e471.png)

![image](https://user-images.githubusercontent.com/51464365/114055619-84439b80-98c3-11eb-9e5e-1e0287ceacba.png)

