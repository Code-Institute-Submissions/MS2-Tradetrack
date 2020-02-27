// DOM ELEMENTS FOR LANDING & NOTES
const time = document.getElementById('time'),
  greeting = document.getElementById('greeting'),
  name = document.getElementById('name'),
  target = document.getElementById('target');
  notes = document.getElementById('notes');


// Options
const showAmPm = true;

// Show Time
function showTime() {
  let today = new Date(),
    hour = today.getHours(),
    min = today.getMinutes(),
    sec = today.getSeconds();

  // Set AM or PM
  const amPm = hour >= 12 ? 'PM' : 'AM';

  // 12hr Format
  hour = hour % 12 || 12;

  // Output Time
  time.innerHTML = `${hour}<span>:</span>${addZero(min)}<span>:</span>${addZero(
    sec
  )} ${showAmPm ? amPm : ''}`;

  setTimeout(showTime, 1000);
}

// Add Zeros
function addZero(n) {
  return (parseInt(n, 10) < 10 ? '0' : '') + n;
}

// Set Background and Greeting
function setBgGreet() {
  let today = new Date(),
    hour = today.getHours();

  if (hour < 12) {
    // Morning
    greeting.textContent = 'Good Morning, ';
  } else if (hour < 18) {
    // Afternoon
    
    greeting.textContent = 'Good Afternoon, ';
  } else {
    // Evening
    
    greeting.textContent = 'Good Evening, ';
    document.body.style.color = 'white';
  }
}

// Get Name
function getName() {
  if (localStorage.getItem('name') === null) {
    name.textContent = '[Enter Name]';
  } else {
    name.textContent = localStorage.getItem('name');
  }
}

// Set Name
function setName(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('name', e.target.innerText);
      name.blur();
    }
  } else {
    localStorage.setItem('name', e.target.innerText);
  }
}

// Get Profit Target
function getTarget() {
  if (localStorage.getItem('target') === null) {
    target.textContent = '[Enter %]';
  } else {
    target.textContent = localStorage.getItem('target');
  }
}

// Set Target
function setTarget(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('target', e.target.innerText);
      target.blur();
    }
  } else {
    localStorage.setItem('target', e.target.innerText);
  }
}

// Get Notes
function getNotes() {
  if (localStorage.getItem('notes') === null) {
    notes.textContent = '[Enter your trade notes here]';
  } else {
    notes.textContent = localStorage.getItem('notes');
  }
}

// Set Notes
function setNotes(e) {
  if (e.type === 'keypress') {
    // Make sure enter is pressed
    if (e.which == 13 || e.keyCode == 13) {
      localStorage.setItem('notes', e.notes.innerText);
      notes.blur();
    }
  } else {
    localStorage.setItem('notes', e.notes.innerText);
  }
}

name.addEventListener('keypress', setName);
name.addEventListener('blur', setName);
target.addEventListener('keypress', setTarget);
target.addEventListener('blur', setTarget);
notes.addEventListener('keypress', setNotes);
notes.addEventListener('blur', setNotes);

// Run
showTime();
setBgGreet();
getName();
getTarget();
getNotes();


// Profit/loss History & Tracker 

const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

const localStorageTransactions = JSON.parse(
  localStorage.getItem('transactions')
);

let transactions =
  localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

// Add trade transaction
function addTransaction(e) {
  e.preventDefault();

  if (text.value.trim() === '' || amount.value.trim() === '') {
    alert('Please add a text and amount');
  } else {
    const transaction = {
      id: generateID(),
      text: text.value,
      amount: +amount.value
    };

    transactions.push(transaction);

    addTransactionDOM(transaction);

    updateValues();

    updateLocalStorage();

    text.value = '';
    amount.value = '';
  }
}

// Generate random ID
function generateID() {
  return Math.floor(Math.random() * 100000000);
}

// Add  trade transactions to DOM list
function addTransactionDOM(transaction) {
  // Get sign
  const sign = transaction.amount < 0 ? '-' : '+';

  const item = document.createElement('li');

  // Add class based on value
  item.classList.add(transaction.amount < 0 ? 'minus' : 'plus');

  item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(
    transaction.amount
  )}</span> <button class="delete-btn" onclick="removeTransaction(${
    transaction.id
  })">x</button>
  `;

  list.appendChild(item);
}

// Update the balance, profit and loss
function updateValues() {
  const amounts = transactions.map(transaction => transaction.amount);

  const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

  const income = amounts
    .filter(item => item > 0)
    .reduce((acc, item) => (acc += item), 0)
    .toFixed(2);

  const expense = (
    amounts.filter(item => item < 0).reduce((acc, item) => (acc += item), 0) *
    -1
  ).toFixed(2);

  balance.innerText = `$${total}`;
  money_plus.innerText = `$${income}`;
  money_minus.innerText = `$${expense}`;
}

// Remove transaction by ID
function removeTransaction(id) {
  transactions = transactions.filter(transaction => transaction.id !== id);

  updateLocalStorage();

  init();
}

// Update local storage trade transactions
function updateLocalStorage() {
  localStorage.setItem('transactions', JSON.stringify(transactions));
}

// Init app
function init() {
  list.innerHTML = '';

  transactions.forEach(addTransactionDOM);
  updateValues();
}

init();

form.addEventListener('submit', addTransaction);

// Trade Class: Represents a trade note in journal
class Trade {
  constructor(pair, play, result) {
    this.pair = pair;
    this.play = play;
    this.result = result;
  }
}

// UI Class: Handle UI Tasks
class UI {
  static displayTrades() {
    const trades = Store.getTrades();

    trades.forEach((trade) => UI.addTradeToList(trade));
  }

  static addTradeToList(trade) {
    const list = document.querySelector('#trade-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${trade.pair}</td>
      <td>${trade.play}</td>
      <td>${trade.result}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
    `;

    list.appendChild(row);
  }

  static deleteTrade(el) {
    if(el.classList.contains('delete')) {
      el.parentElement.parentElement.remove();
    }
  }

  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#trade-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

  static clearFields() {
    document.querySelector('#pair').value = '';
    document.querySelector('#play').value = '';
    document.querySelector('#result').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getTrades() {
    let trades;
    if(localStorage.getItem('trades') === null) {
      trades = [];
    } else {
      trades = JSON.parse(localStorage.getItem('trades'));
    }

    return trades;
  }

  static addTrade(trade) {
    const trades = Store.getTrades();
    trades.push(trade);
    localStorage.setItem('trades', JSON.stringify(trades));
  }

  static removeTrade(result) {
    const trades = Store.getTrades();

    trades.forEach((trade, index) => {
      if(trade.result === result) {
        trades.splice(index, 1);
      }
    });

    localStorage.setItem('trades', JSON.stringify(trades));
  }
}

// Event: Display Trades
document.addEventListener('DOMContentLoaded', UI.displayTrades);

// Event: Add a Trade
document.querySelector('#trade-form').addEventListener('submit', (e) => {
  // Prevent actual submit
  e.preventDefault();

  // Get form values
  const pair = document.querySelector('#pair').value;
  const play = document.querySelector('#play').value;
  const result = document.querySelector('#result').value;

  // Validate
  if(pair === '' || play === '' || result === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // Instatiate trade
    const trade = new Trade(pair, play, result);

    // Add Trade to UI
    UI.addTradeToList(trade);

    // Add trade to store
    Store.addTrade(trade);

    // Show success message
    UI.showAlert('Trade Added', 'success');

    // Clear fields
    UI.clearFields();
  }
});

// Event: Remove a Trade
document.querySelector('#trade-list').addEventListener('click', (e) => {
  // Remove trade from UI
  UI.deleteTrade(e.target);

  // Remove trade from store
  Store.removeTrade(e.target.parentElement.previousElementSibling.textContent);

  // Show success message
  UI.showAlert('Trade Removed', 'success');
});
