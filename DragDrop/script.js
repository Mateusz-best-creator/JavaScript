// Main content elements
const listItems = document.querySelectorAll('.drag-item-list');
const backlogElements = document.getElementById('backlog-list');
const progressElements = document.getElementById('progress-list');
const completeElements = document.getElementById('complete-list');
const onholdElements = document.getElementById('on-hold-list');

// Add elements buttons and elements
const addContainers = document.querySelectorAll('.add-container');
const addButtons = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemButtons = document.querySelectorAll('.solid');
const addItems = document.querySelectorAll('.add-item');

// Arrays of flashcards
let backlogArray = [];
let progressArray = [];
let completeArray = [];
let onholdArray = [];
let listArrays = [];

// Narazei nie potrzebnae ale potem sie przyda!!
let isLoaded = false;
let currentColumn;
let draggedItem;
let dragging = false;

function getColumns() {
    if (localStorage.getItem('backlogItems')) {
        backlogArray = JSON.parse(localStorage.backlogItems);
        progressArray = JSON.parse(localStorage.progressItems);
        completeArray = JSON.parse(localStorage.completeItems);
        onholdArray = JSON.parse(localStorage.onholdItems);
    } else {
        backlogArray = ['Release the course', 'Sit back and relax'];
        progressArray = ['Work on projects', 'Listen to music'];
        completeArray = ['Being cool', 'Getting stuff done'];
        onholdArray = ['Being uncool'];
    }
}

function updateColumnsInLocalStorage() {
    listArrays = [backlogArray, progressArray, completeArray, onholdArray];
    const names = ['backlog', 'progress', 'complete', 'onhold'];
    listArrays.forEach((item, index) => {
        localStorage.setItem(`${names[index]}Items`, JSON.stringify(item));
    })
}

function createElement(contentElement, textToAdd, column, index) {
    const item = document.createElement('li');
    item.classList.add('drag-item');
    item.textContent = textToAdd;
    item.draggable = true;
    item.setAttribute('ondragstart', 'drag(event)');
    item.contentEditable = true;
    item.id = index;
    item.setAttribute('onfocusout', `updateItem(${index}, ${column})`);
    contentElement.appendChild(item);
}

function updateItem(id, column) {
    const selectedArray = listArrays[column];
    const selectedColumn = listItems[column].children;
    if (!dragging) {
      if (!selectedColumn[id].textContent) {
        delete selectedArray[id];
      } else {
        selectedArray[id] = selectedColumn[id].textContent;
      }
      updateDOM();
    }
  }

// Add save buttons
function showInputBox(column) {
    addContainers[column].style.display = 'flex';
    addButtons[column].style.display = 'none';
    saveItemButtons[column].style.display = 'flex';
}

// Hide textarea and save button
function hideInputBox(column) {
    addContainers[column].style.display = 'none';
    addButtons[column].style.display = 'flex';
    saveItemButtons[column].style.display = 'none';
    const text = addContainers[column].textContent;
    addItems[column].textContent = '';
    createElement(listItems[column], text, column, listItems[column].length);
    rebuildArrays();
    updateDOM();
}

function filter(array) {
    const filteredArray = array.filter(item => item !== null);
    return filteredArray;
}

function updateDOM() {
    if (!isLoaded) {
        getColumns();
    }
    isLoaded = true;
    // backlog
    backlogElements.textContent = '';
    backlogArray.forEach((item, index) => {
        createElement(backlogElements, item, 0, index);
    })
    backlogArray = filter(backlogArray);
    // progress
    progressElements.textContent = '';
    progressArray.forEach((item, index) => {
        createElement(progressElements, item, 1, index);
    })
    progressArray = filter(progressArray);
    // complete
    completeElements.textContent = '';
    completeArray.forEach((item, index) => {
        createElement(completeElements, item, 2, index);
    })
    completeArray = filter(completeArray);
    // onhold
    onholdElements.textContent = '';
    onholdArray.forEach((item, index) => {
        createElement(onholdElements, item, 3, index);
    })
    onholdArray = filter(onholdArray);

    updateColumnsInLocalStorage();
}

// Update array when dropping elements
function rebuildArrays() {
    backlogArray = Array.from(backlogElements.children).map(i => i.textContent);
    progressArray = Array.from(progressElements.children).map(i => i.textContent);
    completeArray = Array.from(completeElements.children).map(i => i.textContent);
    onholdArray = Array.from(onholdElements.children).map(i => i.textContent);
    updateDOM();
}

// Drop functionality

// When item starts drugging
function drag(event) {
    draggedItem = event.target;
    dragging = true;
}

function allowDrop(event) {
    event.preventDefault();
}  

// When item drop
function drop(event) {
    event.preventDefault();
    // Add item to column
    const parent = listItems[currentColumn];
    listItems.forEach(item => item.classList.remove('over'));
    parent.appendChild(draggedItem);
    // Dragging complete
    dragging = false;
    rebuildArrays();
}

// When item enters coulmn area
function dragEnter(columnIdx) {
    currentColumn = columnIdx;
    listItems.forEach(item => item.classList.remove('over'));
    listItems[columnIdx].classList.add('over');
}

// On Load
updateDOM();  