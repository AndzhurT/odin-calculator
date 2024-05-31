
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

let buttonOperations = (e) => {
    e.preventDefault()
    let target = e.target;
    console.log(target.textContent);

    operatorList = ["+", "-", "÷","x"]
    numberList = ["0","1","2","3","4","5","6","7","8","9"]

    // erase
    if (target.textContent == "⇚") {
        let initialWord = displayInput.textContent;
        let slicedWord = initialWord.slice(0, initialWord.length - 1); 
        displayInput.textContent = slicedWord;
    }

    if (numberList.includes(target.textContent)) {
        displayInput.textContent += target.textContent;
    }
    else {
        console.log("operator");
    }
}

btn.forEach(button => {
    button.addEventListener("click", buttonOperations);
})

