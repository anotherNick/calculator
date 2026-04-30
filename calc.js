let a = null;
let b = null;
let operator = null;
let displayingResult = false;

function operate(){

    a = Number(a);
    b = Number(b);

    switch(operator){
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
                a = null; b = null; operator = null;
                updateDisplay('');
            }else{
                return a / b;
            }
            break;
        default:
            alert('Invalid operator specified!')
    }

}

function updateDisplay(num, isResult = false){

    if(num.toString().length > 15){

        num = num.toString().slice(0, 15);

    }

    const display = document.getElementById('display');
    display.innerText = num;

    displayingResult = isResult;

}

function backspace(){

    if(displayingResult){
        
        return; // Do not edit results
        
    }else if(operator){

        if(b === null || b.toString().length < 2){

            b = null;
            updateDisplay('');

        }else{

            b = b.toString().slice(0, -1);
            updateDisplay(b);

        }

    }else{

        if(a === null || a.toString().length < 2){

            a = null;
            updateDisplay('');

        }else{

            a = a.toString().slice(0, -1);
            updateDisplay(a);

        } 

    }

}

function addDecimal(){

    if(operator){

        b = (displayingResult || b === null) ? 0 : b;
        
        if(!b.toString().includes('.')){ 
            
            b += '.'; 
        }

        updateDisplay(b);

    }else{

        a = (displayingResult || a === null) ? 0 : a;

        if(!a.toString().includes('.')){ 
            
            a += '.'; 
        
        }

        updateDisplay(a);

    }

}

function updateEquation(value){

    switch(value){
        case "AC":
        
            a = null; b = null; operator = null; 
            updateDisplay('');
            break;

        case "⌫":
        case "Backspace":

            backspace();

            break;

        case "+":
        case "-":
        case "*":
        case "/": 
            
            if(!operator){

                operator = value;
        
            }else if(a !== null && operator && b !== null){

                a = operate();
                b = null;
                operator = value;
            
                updateDisplay(a, true);        

            }

            break;
        
        case ".":

            addDecimal();

            break;
        
        case "=":
        case "Enter":
            
            if(a !== null && operator && b !== null){
                
                a = operate();
                b = null;
                operator = null;

                updateDisplay(a, true);
            
            }

            break;
        // Cases 0-9:
        default:

            if(operator){

                b = (b !== null) ? b += value : value;
                updateDisplay(b);

            }else{

                if(displayingResult){ a = null; }

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

