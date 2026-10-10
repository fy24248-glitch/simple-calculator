const display = document.getElementById('display');
let expression = '';

function updateDisplay() {
  display.value = expression || '0';
}

document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    const value = btn.dataset.value;

    if (action === 'clear') {
      expression = '';
    } else if (action === 'delete') {
      expression = expression.slice(0, -1);
    } else if (action === 'equals') {
      calculate();
      return;
    } else if (value) {
      expression += value;
    }
    updateDisplay();
  });
});

function calculate() {
  try {
    // Only allow digits, operators, and decimal points
    if (!/^[0-9+\-*/.]+$/.test(expression)) throw new Error('Invalid');
    const result = Function(`"use strict"; return (${expression})`)();
    expression = String(result);
  } catch {
    expression = 'Error';
  }
  updateDisplay();
}

document.addEventListener('keydown', (e) => {
  if (/[0-9+\-*/.]/.test(e.key)) {
    expression += e.key;
    updateDisplay();
  } else if (e.key === 'Enter') {
    calculate();
  } else if (e.key === 'Backspace') {
    expression = expression.slice(0, -1);
    updateDisplay();
  } else if (e.key === 'Escape') {
    expression = '';
    updateDisplay();
  }
});

updateDisplay();
