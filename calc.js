let a = null;
let b = null;
let op = null;

function operate(a, b, op){

    a = Number(a);
    b = Number(b);

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
            if(a == 0 || b == 0){
                alert('Really? Dividing by Zero?');
                a = null; b = null; op = null;
                updateDisplay('');
            }else{
                return a / b;
            }
            break;
        default:
            alert('Invalid operator specified!')
    }

}

function updateDisplay(num){

    const display = document.getElementById('display');

    if(num.toString().length > 15){

        num = num.toString().slice(0, 15);

    }

    display.innerText = num;

}

function updateNumber(value){

    switch(value){
        case ".":
            
            const currentNumber = document.getElementById('display').innerText;
            
            if(!currentNumber.includes('.') && op !== null){

                if(b === null){ b = 0; }
                b += '.';
                updateDisplay(b);

            }else if(!currentNumber.includes('.')){

                if(a === null){ a = 0; }
                a += '.';
                updateDisplay(a);

            }

            break;
        
        case "=":
            
            if(a !== null && op !== null && b !== null){
                
                a = operate(a, b, op);
                b = null;
                op = null;
                updateDisplay(a);
            
            }

            break;

        default:

            if(op === null && a === null){

                a = value;
                updateDisplay(a);

            }else if(op === null){

                a += value;
                updateDisplay(a)

            }else if(op !== null && b === null){
                
                b = value;
                updateDisplay(b);

            }else if(op !== null){

                b += value;
                updateDisplay(b);

            }
    }

}

function updateOperator(value){

    switch(value){
        case "AC":
        
            a = null; b = null; op = null;
            updateDisplay('');
            break;

        case "⌫":

            if(op !== null && b !== null){

                if(b.toString().length < 2){ 

                    b = null;
                    updateDisplay('');

                }else{

                    b = b.toString().slice(0, -1);
                    updateDisplay(b);
                }

            }else if(op === null && a !== null){

                if(a.toString().length < 2){ 

                    a = null;
                    updateDisplay('');

                }else{

                    a = a.toString().slice(0, -1);
                    updateDisplay(a);

                }
            
            }

            break;

        default: 
        
            if(a !== null && b === null){

                op = value;
                updateDisplay("");
        
            }else if(a !== null && op !== null && b !== null){

                a = operate(a, b, op);
                b = null;
                op = value;
            
                updateDisplay(a);        

            }

            break;
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


