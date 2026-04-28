let a;
let b;
let op;

function operate(a, b, op){

    switch(op){
        case "+":
            return a + b;
            break;
        case "-":
            return a - b;
            break;
        case "*":
            return a * b;
            break;
        case "/":
            return a / b;
            break;
        default:
            alert('Invalid operator specified!')
    }

}

function updateNumber(button){
    console.log(button);
}

const numberButtons = document.getElementById("number-buttons");

numberButtons.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        updateNumber(e.target.innerText);
    }
});

const operatorButtons = document.getElementById("operator-buttons");

operatorButtons.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        updateNumber(e.target.innerText);
    }
})


