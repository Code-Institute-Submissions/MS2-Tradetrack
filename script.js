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

