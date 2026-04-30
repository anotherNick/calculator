const vars = {  
    a: null,
    b: null,
}
let operator = null;
let displayingResult = false;

function getCurrentVar(){

    return (operator) ? 'b' : 'a';

}

function operate(){

    a = Number(vars.a);
    b = Number(vars.b);

    switch(operator){
        case "+":
            return +(a + b).toFixed(3);
  
        case "-":
            return +(a - b).toFixed(3);
  
        case "*":
            return +(a * b).toFixed(3);
  
        case "/":
            if(a == 0 || b == 0){
                alert('Really? Dividing by Zero?');
                vars.a = null; vars.b = null; operator = null;
                updateDisplay('');
            }else{
                return +(a / b).toFixed(3);
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

function updateEquation(value){

    switch(value){
        case "AC":
        
            vars.a = null; vars.b = null; operator = null; 
            updateDisplay('');
            break;

        case "⌫":
        case "Backspace":

            backspace(getCurrentVar());

            break;

        case "+":
        case "-":
        case "*":
        case "/": 
          
            if(!operator && a !== null){

                operator = value;
        
            }else if(vars.a !== null && operator && vars.b !== null){

                vars.a = operate();
                vars.b = null;
                operator = value;
            
                updateDisplay(vars.a, true);        

            }
          

            break;
        
        case ".":

            addDecimal(getCurrentVar());

            break;
        
        case "=":
        case "Enter":
        
            if(vars.a !== null && operator && vars.b !== null){
                
                vars.a = operate();
                vars.b = null;
                operator = null;

                updateDisplay(vars.a, true);
            
            }

            break;
        // Cases 0-9:
        default:

            const current = getCurrentVar();
            
            if(displayingResult && !operator){ vars.a = null; }

            vars[current] = (vars[current] !== null) ? vars[current] += value : value;
            updateDisplay(vars[current]);

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

