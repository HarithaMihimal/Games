const cards = [
    'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D', 
    'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
];
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let matches = 0;

const board = document.getElementById('game-board');
const resetButton = document.getElementById('reset-button');

function shuffle(array) {
    array.sort(() => 0.5 - Math.random());
}

function createBoard() {
    shuffle(cards);
    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.innerHTML = `
            <div class="front">${card}</div>
            <div class="back"></div>
        `;
        cardElement.addEventListener('click', flipCard);
        board.appendChild(cardElement);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.innerHTML === secondCard.innerHTML;

    isMatch ? disableCards() : unflipCards();
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);
    matches += 2;
    resetBoard();
    if (matches === cards.length) {
        setTimeout(() => alert('You won!'), 500);
    }
}

function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetBoard();
    }, 1000);
}

function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

function resetGame() {
    board.innerHTML = '';
    matches = 0;
    createBoard();
}

resetButton.addEventListener('click', resetGame);

createBoard();
