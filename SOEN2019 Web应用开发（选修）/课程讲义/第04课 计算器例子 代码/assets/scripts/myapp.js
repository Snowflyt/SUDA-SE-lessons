const defaultResult  = 2;
let currentResult = defaultResult;
let logEntry = [];

outputResult(currentResult,currentResult);

function getUserInput() {
    const userInputBox = document.querySelector("#input-number");
    return +userInputBox.value;
}

function recordLog(operator, currentValue, userInputValue) {
    const entry = {
      Operation: operator,
      preValue : currentValue,
      userInput : userInputValue
    };

    logEntry.push(entry);
    console.log(logEntry);

}
function outputCacluationResult(operator, 
             userInput, result) {
  calculationDescription = `${currentResult} ${operator} ${userInput} = ${result}`;
  currentResult = result;
  outputResult(currentResult, calculationDescription);
}

function add() {
    const userInput = getUserInput();
    const result = currentResult + userInput;
    recordLog('Add', currentResult, userInput );
    outputCacluationResult("+",  userInput, result);
}

function subtract() {
  const userInput = getUserInput();
  const result = currentResult - userInput;
  recordLog("sub", currentResult, userInput);
  outputCacluationResult("-",  userInput, result);
}

function multiply() {
  const userInput = getUserInput();
  const result = currentResult * userInput;
  recordLog(`${currentResult}*${userInput}=${result}`);
  outputCacluationResult("*",  userInput, result);
}

function divide() {
  const userInput = getUserInput();
  const result = currentResult / userInput;  
  recordLog(`${currentResult}/${userInput}=${result}`);
  outputCacluationResult("/",  userInput, result);
}


const btnAdd = document.querySelector('#btn-add');
btnAdd.addEventListener('click', add);

const btnSubtract = document.querySelector("#btn-subtract");
btnSubtract.addEventListener("click", subtract);

const btnMultiply = document.querySelector("#btn-multiply");
btnMultiply.addEventListener("click", multiply);

const btnDivide = document.querySelector("#btn-divide");
btnDivide.addEventListener("click", divide);





