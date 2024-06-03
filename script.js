
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
    else if (operator == "*") {
        return multiply(a, b);
    }
    else if (operator == "\//") {
        return divide(a, b);
    }
}


const btn = document.querySelectorAll("button");
const displayInput = document.querySelector(".displayInput");
let initialWord;


// Clear button
let getClearOperation = (initialWord) => {
    if (initialWord.length > 0) {
        initialWord = "0";
        displayInput.textContent = initialWord;
    }
}

//
let getOperations = () => {

}

// Number buttons
let getNumberButtons = (initialWord, target) => {
    if ((initialWord != "0") & (initialWord.length < 15)) {
        displayInput.textContent += target.textContent;
    }
    else if ((initialWord == "0")) {
        displayInput.textContent = target.textContent;
    }
}

let getButtonOperations = (e) => {
    e.preventDefault()
    let target = e.target;
    console.log(target.textContent);
    initialWord = displayInput.textContent;

    operatorList = ["+", "-", "÷","x"]
    numberList = ["0","1","2","3","4","5","6","7","8","9"]


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
        displayInput.textContent = slicedWord;
    }   

    // Number buttons
    if (numberList.includes(target.textContent)) {
        getNumberButtons(initialWord, target);
    }
    
    if (operatorList.includes(target.textContent)) {
        getOperations
    }

    else {
        console.log("operator");
    }
}




btn.forEach(button => {
    button.addEventListener("click", getButtonOperations);
})

