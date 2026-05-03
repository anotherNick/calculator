const vars = {  
    a: null,
    b: null,
}
let operator = null;
let displayingResult = false;

function getCurrentVar(){

    return (operator) ? 'b' : 'a';

}

function updateDisplay(num, isResult = false){

    if(num.toString().length > 15){

        num = num.toString().slice(0, 15);

    }

    const display = document.getElementById('display');
    display.textContent = num;

    displayingResult = isResult;

}

function clearEquation(){

    vars.a = null; vars.b = null; operator = null; 
    updateDisplay('');

}

function operate(){

    const a = Number(vars.a);
    const b = Number(vars.b);

    switch(operator){
        case "+":
            return +(a + b).toFixed(3);
  
        case "-":
            return +(a - b).toFixed(3);
  
        case "*":
            return +(a * b).toFixed(3);
  
        case "/":
            if(b == 0){
                alert('Really? Dividing by Zero?');
                vars.a = null; vars.b = null; operator = null;
                updateDisplay('');
                return vars.a;
            }else{
                return +(a / b).toFixed(3);
            }
            break;
        default:
            alert('Invalid operator specified!')
    }

}

function backspace(current){

    if(displayingResult){
        
        return; // Do not edit results
        
    }else{

        if(vars[current] === null || vars[current].toString().length < 2){

            vars[current] = null;
            updateDisplay('');

        }else{

            vars[current] = vars[current].toString().slice(0, -1);
            updateDisplay(vars[current]);

        } 

    }

}

function addDecimal(current){
    
    vars[current] = (displayingResult || vars[current] === null) ? 0 : vars[current];
 
    if(!vars[current].toString().includes('.')){ 
        
        vars[current] += '.';

    }

    updateDisplay(vars[current]);

}

function updateOperator(newOperator){

    if(vars.b == null && vars.a !== null){

        operator = newOperator;

    }else if(vars.a !== null && operator && vars.b !== null){

        tryCalculation();
        operator = newOperator;

    }

}

function tryCalculation(){

    if(vars.a !== null && operator && vars.b !== null){
        
        vars.a = operate();
        vars.b = null;
        operator = null;

        updateDisplay(vars.a, true);
    
    }

}

function inputNumber(newNumber, current){

    if(displayingResult && !operator){ clearEquation(); }

    vars[current] = (vars[current] !== null) ? vars[current] + newNumber : newNumber;
    updateDisplay(vars[current]);

}

function updateEquation(value){

    switch(value){
        case "AC":
        
            clearEquation();
            break;

        case "⌫":
        case "Backspace":

            backspace(getCurrentVar());
            break;

        case "+":
        case "-":
        case "*":
        case "/": 
          
            updateOperator(value);
            break;
        
        case ".":

            addDecimal(getCurrentVar());
            break;
        
        case "=":
        case "Enter":
        
            tryCalculation();
            break;
        // Cases 0-9:
        default:

            inputNumber(value, getCurrentVar());
            break;
    }

}

const calculator = document.getElementById("calculator");

calculator.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
        updateEquation(e.target.textContent);
    }
});

document.addEventListener('keydown', (e) => {

    const validKeys = ["0","1","2","3","4","5","6","7","8","9",".","=",
                       "Enter","AC","⌫","+","-","*","/","Backspace"];

    if(validKeys.includes(e.key)){

        updateEquation(e.key);

    }

});

