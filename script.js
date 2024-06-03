
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
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
}


const btn = document.querySelectorAll("button");
const displayCurrInput = document.querySelector(".displayCurrInput");
const displayPrevInput = document.querySelector(".displayPrevInput");
const operatorList = ["+", "-", "÷", "×", "="];
const numberList = ["0","1","2","3","4","5","6","7","8","9"];
let initialWord;


// Clear button
let getClearOperation = (initialWord) => {
    if (initialWord.length > 0) {
        initialWord = "0";
        displayCurrInput.textContent = initialWord;
    }
}

// Operation button
let getOperations = (initialWord, target) => {
    console.log("start")
    let prevInput = displayPrevInput.textContent.slice(0, displayPrevInput.textContent.length - 1);
    let currinput = displayCurrInput.textContent;
    let lastOperator = displayPrevInput.textContent[prevInput.length];
    console.log("last operator", lastOperator);
    if (target.textContent == "=" & operatorList.includes(lastOperator)) {
        displayCurrInput.textContent = operate(prevInput, lastOperator, displayCurrInput.textContent);
        console.log(operate(prevInput, lastOperator, displayCurrInput.textContent));
    }
    else {
        console.log("finish")
        displayPrevInput.textContent = initialWord + target.textContent;
    }
}

// Number buttons
let getNumberButtons = (initialWord, target) => {
    if ((initialWord != "0") & (initialWord.length < 15)) {
        displayCurrInput.textContent += target.textContent;
    }
    else if ((initialWord == "0")) {
        displayCurrInput.textContent = target.textContent;
    }
}

let getButtonOperations = (e) => {
    e.preventDefault()
    let target = e.target;
    console.log(target.textContent);
    initialWord = displayCurrInput.textContent;

    // erase
    if (target.textContent == "C") {
        getClearOperation(initialWord);
    }

    if (target.textContent == "⇚") {
        let slicedWord;

        if (initialWord.length == 1) {
            slicedWord = "0";
        }
        else {
            slicedWord = initialWord.slice(0, initialWord.length - 1); 
        }
        displayCurrInput.textContent = slicedWord;
    }   

    // Number buttons
    if (numberList.includes(target.textContent)) {
        getNumberButtons(initialWord, target);
    }
    
    if (operatorList.includes(target.textContent)) {
        getOperations(initialWord, target);
    }

    else {
        console.log("operator");
    }
}




btn.forEach(button => {
    button.addEventListener("click", getButtonOperations);
})

