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

function updateEquation(value){

    switch(value){
        case "AC":
        
            a = null; b = null; op = null;
            updateDisplay('');
            break;

        case "⌫":
        case "Backspace":

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

        case "+":
        case "-":
        case "*":
        case "/": 
        
            if(a !== null && b === null){

                op = value;
        
            }else if(a !== null && op !== null && b !== null){

                a = operate(a, b, op);
                b = null;
                op = value;
            
                updateDisplay(a);        

            }

            break;
        
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
        case "Enter":
            
            if(a !== null && op !== null && b !== null){
                
                a = operate(a, b, op);
                b = null;
                op = null;
                updateDisplay(a);
            
            }

            break;
        // Cases 0-9:
        default:

            if(op !== null){

                b = (b !== null) ? b += value : value;
                updateDisplay(b);

            }else{

                a = (a !== null) ? a += value : value;
                updateDisplay(a);

            }
    }

}

const calculator = document.getElementById("calculator");

calculator.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        updateEquation(e.target.innerText);
    }
});

document.addEventListener('keydown', (e) => {

    const validKeys = ["0","1","2","3","4","5","6","7","8","9",".","=",
                       "Enter","AC","⌫","+","-","*","/","Backspace"];

    if(validKeys.includes(e.key)){

        updateEquation(e.key);

    }

});

