const Gameboard = (() => {
    const board = ['', '', '', '', '', '', '', '', ''];

    const resetBoard = () => {
        for (let i = 0; i < board.length; i++) {
            board[i] = '';
        }
    };

    const placeMark = (index, mark) => {
        if (board[index] === '') {
            board[index] = mark;
            return true;
        }
        return false;
    };

    const getBoard = () => board;

    return {
        resetBoard,
        placeMark,
        getBoard,
    };
})();

const Player = (name, mark) => {
    return { name, mark };
};

const DisplayController = (() => {
    const gameboardElement = document.getElementById('gameboard');
    const resultElement = document.getElementById('result');
    const player1Input = document.getElementById('player1');
    const player2Input = document.getElementById('player2');
    const startGameButton = document.getElementById('startGame');

    const createCell = (index) => {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = index;
        cell.addEventListener('click', handleCellClick);
        gameboardElement.appendChild(cell);
    };

    const handleCellClick = (event) => {
        const index = event.target.dataset.index;
        if (Gameboard.placeMark(index, currentPlayer.mark)) {
            updateBoard();
            if (checkWinner()) {
                showResult(`${currentPlayer.name} Wins!`);
                return;
            }
            if (Gameboard.getBoard().every(cell => cell !== '')) {
                showResult('It\'s a Tie!');
                return;
            }
            switchPlayer();
        }
    };

    const updateBoard = () => {
        const cells = document.querySelectorAll('.cell');
        Gameboard.getBoard().forEach((mark, index) => {
            cells[index].textContent = mark;
        });
    };

    const switchPlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
    };

    const showResult = (message) => {
        resultElement.textContent = message;
        resultElement.classList.remove('hidden');
    };

    const resetGame = () => {
        Gameboard.resetBoard();
        gameboardElement.innerHTML = '';
        resultElement.classList.add('hidden');
        createBoard();
        currentPlayer = player1;
    };

    const createBoard = () => {
        for (let i = 0; i < 9; i++) {
            createCell(i);
        }
    };

    startGameButton.addEventListener('click', () => {
        const player1Name = player1Input.value || 'Player 1';
        const player2Name = player2Input.value || 'Player 2';
        player1 = Player(player1Name, 'X');
        player2 = Player(player2Name, 'O');
        currentPlayer = player1;
        resetGame();
    });

    return {
        createBoard,
        resetGame,
    };
})();

let player1, player2, currentPlayer;

DisplayController.createBoard();
