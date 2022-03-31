

// Get dom objects for calculator buttons and screen
var buttons = document.body.querySelectorAll('.buttons > button');
var output = document.querySelector('.window');

// Assigned variables
var operator = ['×', '÷', '-', '+', '%'];
var input = '';
var operatorFlag = false;
var dotFlag = false;
var equation = '';
var result = '';
var i;

//Initiate event listener for all buttons objects
for (i = 0; i < buttons.length; i++) {
    buttons[i].onclick = function (e) {
        var btnText = this.innerHTML;
        if (btnText === 'AC') {
            input = '';
            operatorFlag = false;
            equation = '';
        } else if (btnText === 'CE') { 
            input = input.slice(0, input.length - 1);

        } else if (btnText === '.') { 
            if (input.indexOf('.') === -1 || dotFlag) { 
                input += '.';
                dotFlag = false;
            }
        } else if (btnText === '=') { 
            if (operator.indexOf(input[input.length - 1]) > -1) {
                input = input.slice(0, input.length - 1);
            }
            equation = input.replace(/×/g, '*');
            equation = equation.replace(/÷/g, '/');
            result = Math.round(eval(equation)*1000000)/1000000;
            input = result;
            operatorFlag = true;

        } else if (operator.indexOf(btnText) > -1) { 
            if (operatorFlag) {
                input += btnText;
                operatorFlag = false;
            } else {
                input = input.slice(0, input.length - 1) + btnText;
            }
            dotFlag = true; 
        } else {
            if (result !== '' && operator.indexOf(input[input.length - 1]) > -1) {
                input += btnText;
                result = '';
            } else if (result !== '') {
                input = btnText;
                result = '';
            } else {
                input += btnText;
            }

            operatorFlag = true;
        }
        // print the result on the screen
        output.innerHTML = input;
    }
}
