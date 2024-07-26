document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const statusMessage = document.getElementById('status-message');
    const restartBtn = document.getElementById('restart-btn');
    const resultScreen = document.getElementById('result-screen');
    const resultMessage = document.getElementById('result-message');
    const newGameBtn = document.getElementById('new-game-btn');
    let currentPlayer = 'X';
    let gameActive = true;
    let gameState = ['', '', '', '', '', '', '', '', ''];

    const winningConditions = [
        [0, 1, 2],[3, 4, 5],[6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8],[0, 4, 8],[2, 4, 6]
    ];

    function handleCellClick(cell, index) {
        if (gameState[index] !== '' || !gameActive) return;
        gameState[index] = currentPlayer;
        cell.textContent = currentPlayer;
        if (checkWin()) {
            showResult(`${currentPlayer} wins!`);
            gameActive = false;
            return;
        }
        if (checkDraw()) {
            showResult('It\'s a draw!');
            gameActive = false;
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `${currentPlayer}'s turn`;
    }

    function checkWin() {
        return winningConditions.some(condition => {
            return condition.every(index => {
                return gameState[index] === currentPlayer;
            });
        });
    }

    function checkDraw() {
        return gameState.every(cell => cell !== '');
    }

    function showResult(message) {
        resultMessage.textContent = message;
        resultScreen.classList.add('visible');
    }

    function restartGame() {
        currentPlayer = 'X';
        gameActive = true;
        gameState = ['', '', '', '', '', '', '', '', ''];
        statusMessage.textContent = `${currentPlayer}'s turn`;
        document.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
        resultScreen.classList.remove('visible');
    }

    function startNewGame() {
        restartGame();
    }

    restartBtn.addEventListener('click', restartGame);
    newGameBtn.addEventListener('click', startNewGame);

    // Generate game board cells
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.addEventListener('click', () => handleCellClick(cell, i));
        board.appendChild(cell);
    }
});
