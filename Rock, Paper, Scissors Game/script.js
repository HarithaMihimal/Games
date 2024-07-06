const choices = ['rock', 'paper', 'scissors'];
const playerChoiceDisplay = document.getElementById('player-choice');
const computerChoiceDisplay = document.getElementById('computer-choice');
const resultDisplay = document.getElementById('result');
const buttons = document.querySelectorAll('.choice');

buttons.forEach(button => button.addEventListener('click', playGame));

function playGame(event) {
    const playerChoice = event.target.id;
    const computerChoice = getComputerChoice();
    const result = getResult(playerChoice, computerChoice);

    playerChoiceDisplay.textContent = playerChoice;
    computerChoiceDisplay.textContent = computerChoice;
    resultDisplay.textContent = result;
}

function getComputerChoice() {
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
}

function getResult(playerChoice, computerChoice) {
    if (playerChoice === computerChoice) {
        return 'It\'s a draw!';
    }
    if ((playerChoice === 'rock' && computerChoice === 'scissors') ||
        (playerChoice === 'paper' && computerChoice === 'rock') ||
        (playerChoice === 'scissors' && computerChoice === 'paper')) {
        return 'You win!';
    }
    return 'You lose!';
}
