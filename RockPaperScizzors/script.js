import { startConfetti, stopConfetti, removeConfetti } from './confetti.js';


const playerScoreElement = document.getElementById('player-score');
const playerChoiceElement = document.getElementById('player-choice');
const computerScoreElement = document.getElementById('computer-score');
const computerChoiceElement = document.getElementById('computer-choice');
const resultText = document.getElementById('result-text');

const playerRock = document.getElementById('playerRock');
const playerPaper = document.getElementById('playerPaper');
const playerScissors = document.getElementById('playerScissors');
const playerLizard = document.getElementById('playerLizard');
const playerSpock = document.getElementById('playerSpock');

const computerRock = document.getElementById('computerRock');
const computerPaper = document.getElementById('computerPaper');
const computerScissors = document.getElementById('computerScissors');
const computerLizard = document.getElementById('computerLizard');
const computerSpock = document.getElementById('computerSpock');

const allGamesIcons = document.querySelectorAll('.far');

const choices = {
    rock: { name: 'Rock', defeats: ['scissors', 'lizard'] },
    paper: { name: 'Paper', defeats: ['rock', 'spock'] },
    scissors: { name: 'Scissors', defeats: ['paper', 'lizard'] },
    lizard: { name: 'Lizard', defeats: ['paper', 'spock'] },
    spock: { name: 'Spock', defeats: ['scissors', 'rock'] },
};

let computerChoice = '';
let playerScoreNumber = 0;
let computerScoreNumber = 0;

// Rest all 'selected' icons
function resetSelected() {
    allGamesIcons.forEach((item) => {
        item.classList.remove('selected');
        stopConfetti();
    });
}

// ResetScore & plauerChoice/computerChoice
function resetAll() {
    playerScoreNumber = 0;
    computerScoreNumber = 0;
    playerScoreElement.textContent = playerScoreNumber;
    computerScoreElement.textContent = computerScoreNumber;
    resultText.textContent = 'Choose your icon!';
    playerChoiceElement.textContent = '';
    computerChoiceElement.textContent = '';
    resetSelected();
}

window.resetAll = resetAll;

function computerRandomChoice() {
    const computerChoiceNumber = Math.random();
    if (computerChoiceNumber < 0.2) {
        computerChoice = 'rock';
    } else if (computerChoiceNumber <= 0.4) {
        computerChoice = 'paper';
    } else if (computerChoiceNumber <= 0.6) {
        computerChoice = 'scissors';
    } else if (computerChoiceNumber <= 0.8) {
        computerChoice = 'spock';
    } else if (computerChoiceNumber <=1) {
        computerChoice = 'lizard';
    }
    
}

function selectAppropriateElements(choice, el1, el2, el3, el4, el5, textElement) {
    switch(choice) {
        case 'rock':
            console.log("czesccc")
            el1.classList.add('selected');
            textElement.textContent = ' --- Rock';
            break;
        case 'paper':
            el2.classList.add('selected');
            textElement.textContent = ' --- Paper';
            break;
        case 'scissors':
            el3.classList.add('selected');
            textElement.textContent = ' --- Scissors';
            break;
        case 'spock':
            el4.classList.add('selected');
            textElement.textContent = ' --- Spock';
            break;
        case 'lizard':
            el5.classList.add('selected');
            textElement.textContent = ' --- Lizard';
            break;
        default:
            break;
    }
}

// Check result, increase socres, update resultText
function updateScore(playerChoice) {
    if (playerChoice === computerChoice) {
        resultText.textContent = "It's a tie."
        stopConfetti();
    } else {
        const choice = choices[playerChoice];
        console.log(choice.defeats.indexOf(computerChoice));
        if (choice.defeats.indexOf(computerChoice) >= 0) {
            resultText.textContent = 'You Won!';
            startConfetti();
            playerScoreNumber += 1
            playerScoreElement.textContent = playerScoreNumber;
        } else {
            resultText.textContent = 'You Lose!'
            stopConfetti();
            computerScoreNumber += 1
            computerScoreElement.textContent = computerScoreNumber;
        }
    }
}

// Call function to process turn
function checkResult(playerChoice) {
    // Reset styling
    resetSelected();
    computerRandomChoice();
    selectAppropriateElements(computerChoice, computerRock, computerPaper, computerScissors, computerSpock, computerLizard, computerChoiceElement);
    updateScore(playerChoice);
}

// Passing player selection value and styling icons
function select(playerChoice) {
    checkResult(playerChoice);
    // Add styling && player choice
    selectAppropriateElements(playerChoice, playerRock, playerPaper, playerScissors, playerSpock, playerLizard, playerChoiceElement);
}

window.select = select;


// On load
resetAll();