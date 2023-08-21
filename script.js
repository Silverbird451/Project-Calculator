const screen = document.getElementById("screen");

const upperScreen = document.getElementById("upScreen");

const lowerScreen = document.getElementById("lScreen");


const upperBtnsContainer = document.getElementById("upperBtnsContainer");

const restartBtn = document.getElementById("restartBtn");
restartBtn.addEventListener("click", () => {restart()});

const deleteBtn = document.getElementById("deleteBtn");
deleteBtn.addEventListener("click", () => {deleteLast()})

const lBtnsContainer = document.getElementById("lBtnsContainer");


const numberButtons = document.querySelectorAll('.nBtn');
numberButtons.forEach(button => {
    button.addEventListener("click", event => {
        const clickedButton = event.target;
        const buttonValue = clickedButton.textContent;
        placeInUpperScreen(buttonValue);
    })
});

const operatorButtons = document.querySelectorAll('.oBtn');
operatorButtons.forEach(button => {
    button.addEventListener("click", event => {
        numOfOperators += 1;
        checkIfOperate();
        const clickedButton = event.target;
        const buttonValue = clickedButton.textContent;
        placeInUpperScreen(buttonValue);
    })
});

const equalBtn = document.getElementById("equalsBtn");
equalBtn.addEventListener("click", () =>{operate()})


let numOfOperators = 0; //how many operators are in the screen

function checkIfOperate(){
    if (numOfOperators === 2){
        operate()
        const lowerScreenResult = lowerScreen.textContent;
        upperScreen.textContent = `${lowerScreenResult}`
        numOfOperators = 0;
    }
}



function placeInUpperScreen(value) {
    
    const textContent = upperScreen.textContent;

    if(textContent.length < 20){
        if (textContent === ""){
            upperScreen.textContent = `${value}`;
        } else {
            upperScreen.textContent = `${textContent}${value}`
        } 
    } else {
        alert("Sintax Error")
    }
 
}

function restart(){
    upperScreen.textContent = "";
    lowerScreen.textContent = "0";
}

function deleteLast(){
    const textContent = upperScreen.textContent;
    
    if (textContent === "Syntax Error"){
        restart()
    } else {
        const textContentArray = textContent.split("");
        textContentArray.pop();
        const newTextContent = textContentArray.join("")
        upperScreen.textContent = newTextContent;
    }

}

function operate(){
    const textContent = upperScreen.textContent;
    const textContentArray = textContent.split("");
    console.log(textContentArray)
    let operator ; 

    let a ;
    let b ;

    let rawResult ;
    let result ;

    for(char in textContentArray){
        if ((textContentArray[char] === "+") || (textContentArray[char] === "-") || (textContentArray[char] === "x") || (textContentArray[char] === "÷")){
            operator = textContentArray[char];
            a = parseInt(textContentArray.slice(0, parseInt(char)).join(""));
            console.log(a)
            console.log("+")
            b = parseInt(textContentArray.slice((parseInt(char)+1)).join(""));
            console.log(b)
        }else {
            console.log("---------")
        }
    }

    switch (operator) {
        case "+":
            rawResult = add(a, b);
            result = roundingNumber(rawResult);
            break;
        
        case "-":
            rawResult = subtract(a, b);
            result = roundingNumber(rawResult);
            break;
        
        case "x":
            rawResult = multiply(a, b);
            result = roundingNumber(rawResult);
            break;

        case "÷":
            rawResult = divide(a, b);
            result = roundingNumber(rawResult);
            break;
        
        default:
            result = "Syntax Error";
        
    }

    lowerScreen.textContent = result;
    console.log(result)

}



function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply (a, b){
    return a * b;
}

function divide (a, b){
    return a / b;
}


function roundingNumber(number){
    const strNum = number.toString(); 
    const arrStrNum = strNum.split("");

    const containsPeriod = arrStrNum.includes(".");

    if (containsPeriod === true){
        const periodIndex = arrStrNum.indexOf(".");
        console.log(typeof(periodIndex))

        const afterPeriod = arrStrNum.slice((periodIndex)+1);
        const lengthAfterPeriod = afterPeriod.length;

        if(lengthAfterPeriod > 4){
            const roundedNum = number.toFixed(4);
            console.log(roundedNum)
            return roundedNum
        } else {
            return number
        }

    }else{
        return number
    }

}