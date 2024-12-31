'use strict'

const displayOutput = document.getElementById('input-text')
const buttons = document.querySelectorAll('.btn')
displayOutput.value = '0'

let firstOperand = ''
let secondOperand = ''
let operator = null
let resetDisplay = false

function add(a, b) {
    return a + b
}

function subtract(a, b) {
    return a - b
}

function multiply(a, b) {
    return a * b
}

function divide(a, b) {
    if (b === 0) {
        alert(`Well that just won't do kind sir!`)
        return null
    }
    return a / b
}

function calculate() {
    const num1 = parseFloat(firstOperand)
    const num2 = parseFloat(secondOperand)
    if (isNaN(num1) || isNaN(num2)) return
    let result

    switch (operator) {
        case '+':
            result = add(num1, num2)
            break
        case '-':
            result = subtract(num1, num2)
            break
        case 'x':
            result = multiply(num1, num2)
            break
        case '÷':
            result = divide(num1, num2)
            break
        default:
            return
    }
    displayOutput.value = result
    firstOperand = result
    secondOperand = ''
    operator = null
    resetDisplay = true
}

function clearAll() {
    firstOperand = ''
    secondOperand = ''
    operator = null
    displayOutput.value = '0'
    resetDisplay = false
}

buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const value = btn.textContent
        if (value === 'AC') {
            clearAll()
            return
        }
        if (['+', '-', 'x', '÷'].includes(value)) {
            if (operator && secondOperand !== '') {
                calculate()
            }
            resetDisplay = false
            operator = value
            displayOutput.value += value
            return
        }
        if (value === 'DELETE') {
            if (displayOutput.value !== '0') {
                displayOutput.value = displayOutput.value.slice(0, -1) || '0'
                if (!operator) {
                    firstOperand = firstOperand.slice(0, -1)
                } else {
                    secondOperand = secondOperand.slice(0, -1)
                }
            } return
        }

        if (value === '.') {
            if (!operator) {
                if (!firstOperand.includes('.')) {
                    firstOperand += '.'
                    displayOutput.value += '.'
                }
            } else {
                if (!secondOperand.includes('.')) {
                    secondOperand += '.'
                    displayOutput.value += '.'
                }
            } 
            return
        }

        if (value === '=') {
            calculate()
            return
        }

        if (resetDisplay) {
            displayOutput.value = ''
            resetDisplay = false
        }

        if (displayOutput.value === '0') {
            displayOutput.value = value
        } else {
            displayOutput.value = displayOutput.value + value
        }
        if (!operator) {
            firstOperand += value
        } else {
            secondOperand += value
        }
    })
})
