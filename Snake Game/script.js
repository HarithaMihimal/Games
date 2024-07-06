const boardSize = 20;
const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const startButton = document.getElementById('start-button');

let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let apple = { x: 5, y: 5 };
let score = 0;
let intervalId;

startButton.addEventListener('click', startGame);
document.addEventListener('keydown', changeDirection);

function startGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    apple = { x: 5, y: 5 };
    score = 0;
    scoreDisplay.textContent = 'Score: 0';
    clearInterval(intervalId);
    intervalId = setInterval(updateGame, 100);
}

function updateGame() {
    moveSnake();
    if (checkCollision()) {
        clearInterval(intervalId);
        alert('Game Over');
        return;
    }
    if (checkApple()) {
        growSnake();
        placeApple();
        score += 10;
        scoreDisplay.textContent = `Score: ${score}`;
    }
    renderGame();
}

function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(newHead);
    snake.pop();
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            direction = { x: 1, y: 0 };
            break;
    }
}

function checkCollision() {
    const head = snake[0];
    if (head.x < 0 || head.x >= boardSize || head.y < 0 || head.y >= boardSize) {
        return true;
    }
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) {
            return true;
        }
    }
    return false;
}

function checkApple() {
    return snake[0].x === apple.x && snake[0].y === apple.y;
}

function growSnake() {
    const tail = { ...snake[snake.length - 1] };
    snake.push(tail);
}

function placeApple() {
    apple = {
        x: Math.floor(Math.random() * boardSize),
        y: Math.floor(Math.random() * boardSize)
    };
}

function renderGame() {
    board.innerHTML = '';
    snake.forEach(part => {
        const snakeElement = document.createElement('div');
        snakeElement.style.left = `${part.x * 20}px`;
        snakeElement.style.top = `${part.y * 20}px`;
        snakeElement.classList.add('snake');
        board.appendChild(snakeElement);
    });

    const appleElement = document.createElement('div');
    appleElement.style.left = `${apple.x * 20}px`;
    appleElement.style.top = `${apple.y * 20}px`;
    appleElement.classList.add('apple');
    board.appendChild(appleElement);
}
