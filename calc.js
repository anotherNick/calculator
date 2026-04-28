let a = null;
let b = null;
let op = null;

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

function updateDisplay(str){

    const display = document.getElementById('display');

    display.innerText = str;

}

function updateNumber(value){

    switch(value){
        case ".":
            addDecimal();
            break;
        case "=":
            operate(a, b, op);
            break;
    }

    if(op === null && a === null){

        a = value;
        updateDisplay(a);

    }else if(op === null){

        a += value;
        updateDisplay(a)

    }else if(op !== null && b === null){
        
        b = value;
        updateDisplay(a + op + b);

    }else if(op !== null){

        b += value;
        updateDisplay(a + op + b);

    }

}

function updateOperator(value){

    if(op === null || b === null){

        op = value;
        updateDisplay(a + op);
    
    }else{

        

    }

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
        updateOperator(e.target.innerText);
    }
})


