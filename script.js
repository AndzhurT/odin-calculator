
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    let answer = a * b;
    return answer.toFixed(2);
}

function divide(a, b) {
    if (b == 0) {
        return "Cannot divide by zero";
    }
    else {
        let answer = a / b;
        return answer.toFixed(2);
    }
    
}

function modulo(a, b) {
    return a % b;
}

function operate(a, operator, b) {
    if (operator == "+") {
        return add(a, b);
    }
    else if (operator == "-") {
        return subtract(a, b);
    }
    else if (operator == "×") {
        return multiply(a, b);
    }
    else if (operator == "÷") {
        return divide(a, b);
    }
    else if (operator == "%") {
        return modulo(a, b);
    }
}

const btn = document.querySelectorAll("button");
const displayCurrInput = document.querySelector(".displayCurrInput");
const displayPrevInput = document.querySelector(".displayPrevInput");
const operatorList = ["+", "-", "÷", "×", "=", "%"];
const numberList = ["0","1","2","3","4","5","6","7","8","9"];
// const unavailableButton = document.createElement(".unavailable");
let currentOperation = false;
let initialWord;


// Dot button 
let useDotButton = (initialWord, target) => {
    if (initialWord.includes("Cannot divide by zero")) {
        return;
    }
    else if (!(initialWord.includes("."))) {
        displayCurrInput.textContent += target.textContent;
        target.classList.add(".unavailable");
    }
}

// Clear button
let getClearOperation = (initialWord) => {
    if (initialWord.length > 0 || displayPrevInput.textContent.length > 0) {
        initialWord = "0";
        displayCurrInput.textContent = initialWord;
        displayPrevInput.textContent = "";
        currentOperation = false
    }
}

// Left Arrow clear button
let getLeftArrowOperation = (initialWord) => {
    let slicedWord;

    if (initialWord.length == 1) {
        slicedWord = "0";
    }
    else if (initialWord.includes("Cannot divide by zero")) {
        initialWord = "0";
        displayCurrInput.textContent = initialWord;
        displayPrevInput.textContent = "";
        currentOperation = false;
        return;
    }
    else {
        slicedWord = initialWord.slice(0, initialWord.length - 1); 
    }
    displayCurrInput.textContent = slicedWord;
}

// Plus and minus operation
let usePlusMinus = (initialWord) => {

    if (initialWord.includes("Cannot divide by zero")) {
        return;
    }
    else if ((Number(initialWord) > 0) & (initialWord != "0")) {
        displayCurrInput.textContent = "-" + initialWord;
    }
    else {
        displayCurrInput.textContent = initialWord.slice(1, displayCurrInput.length);
    }
}

// Operation button
let getOperations = (initialWord, target) => {
    let prevInput = displayPrevInput.textContent.slice(0, displayPrevInput.textContent.length - 1);
    let currinput = displayCurrInput.textContent;
    let lastOperator = displayPrevInput.textContent[prevInput.length];

    if (initialWord.includes("Cannot divide by zero")) {
        return;
    }
    else if ((target.textContent == "=") & (operatorList.includes(lastOperator)) & (lastOperator != "=")) {
        displayPrevInput.textContent = displayPrevInput.textContent + displayCurrInput.textContent + target.textContent;
        displayCurrInput.textContent = operate(prevInput, lastOperator, displayCurrInput.textContent);
        
        let fontSize = (90 - displayCurrInput.textContent.length * 5);

        if (displayCurrInput.textContent.length > 12 & fontSize > 0) {
            displayCurrInput.setAttribute("style", `font-size:${fontSize}`);
        }
        else if (displayCurrInput.textContent.length > 12 & fontSize <= 0){
            displayCurrInput.setAttribute("style", `text-overflow: ellipsis; overflow: hidden;`);
        }
        else {
            displayCurrInput.setAttribute("style", "font-size: 30px");
        }
    }
    else {
        displayPrevInput.textContent = initialWord + target.textContent;
    }

    currentOperation = true;
}

// Number buttons
let getNumberButtons = (initialWord, target) => {
    if (initialWord.includes("Cannot divide by zero")) {
        displayCurrInput.textContent = target.textContent;
        displayPrevInput.textContent = "";
        currentOperation = false;
    }
    else if ((initialWord != "0") & (initialWord.length < 12) & (currentOperation == false)) {
        displayCurrInput.textContent += target.textContent;
    }
    else if (operatorList.includes(displayPrevInput.textContent[displayPrevInput.textContent.length - 1]) & (currentOperation == true)) {
        displayCurrInput.textContent = target.textContent;
        currentOperation = false;
    }
    else if ((initialWord == "0")) {
        displayCurrInput.textContent = target.textContent;
    }
}

let getButtonOperations = (e) => {
    e.preventDefault()
    let target = e.target;
    initialWord = displayCurrInput.textContent;

    // Clear 
    if (target.textContent == "C") {
        getClearOperation(initialWord);
    }

    // Left arrow erase
    if (target.textContent == "⇚") {
        getLeftArrowOperation(initialWord);
    }   

    // Use dot
    if (target.textContent == ".") {
        useDotButton(initialWord, target);
    }

    if (target.textContent == "±") {
        usePlusMinus(initialWord);
    }

    // Number buttons
    if (numberList.includes(target.textContent)) {
        getNumberButtons(initialWord, target);
    }
    
    // Operators
    if (operatorList.includes(target.textContent)) {
        getOperations(initialWord, target);
    }

}




btn.forEach(button => {
    button.addEventListener("click", getButtonOperations);
})

