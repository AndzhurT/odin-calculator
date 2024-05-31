
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
    displayInput.textContent += target.textContent;
}

btn.forEach(button => {
    button.addEventListener("click", buttonOperations);
})

