// Get elements
const gameBoard = document.querySelector('.game-board');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('reset-btn');

// Initialize game state
let currentPlayer = 'X';
let gameOver = false;
let board = Array(9).fill(null);

// Add event listeners
cells.forEach((cell) => {
	cell.addEventListener('click', handleCellClick);
});

resetBtn.addEventListener('click', resetGame);

// Functions
function handleCellClick(e) {
	const cellIndex = parseInt(e.target.dataset.index);
	if (gameOver || board[cellIndex]) return;

	board[cellIndex] = currentPlayer;
	e.target.textContent = currentPlayer;

	checkWin();
	switchPlayer();
}

function checkWin() {
	const winConditions = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (const condition of winConditions) {
		const [a, b, c] = condition;
		if (board[a] && board[a] === board[b] && board[a] === board[c]) {
			gameOver = true;
			alert(`Player ${board[a]} wins!`);
			return;
		}
	}
}

function switchPlayer() {
	currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
	gameOver = false;
	currentPlayer = 'X';
	board = Array(9).fill(null);
	cells.forEach((cell) => {
		cell.textContent = '';
	});
}