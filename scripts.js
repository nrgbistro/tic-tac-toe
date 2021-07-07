const log = (message) => console.log(`Logger: ${message}`);
let player1, player2, currentPlayer;
let roundOver = false;

const gameController = (function () {
	const runGame = () => {
		log("Starting Game");
		gameBoard.initializeGameBoardArray();

		// Creates divs as clickable buttons
		gameBoard.createGameBoardButtons();

		// Creates player Objects
		player1 = playerCreator.createPlayer("Nolan", "X");
		player2 = playerCreator.createPlayer("Kevin", "O");
		currentPlayer = player1;

		gameBoard.updateDisplay();
		log("Completed Game Initialization");
	};

	return {
		runGame,
	};
})();


const gameBoard = (function () {
	let gameBoardArray;

	const initializeGameBoardArray = () => {
		gameBoardArray = [];
		for (let i = 0; i < 9; i++) {
			gameBoardArray.push(String.fromCharCode(160));
		}
	};

	const updateDisplay = () => {
		const gameBoardButtons = Array.from(document.querySelectorAll(".gameBoardButton"));
		for (let i = 0; i < gameBoardButtons.length; i++) {
			gameBoardButtons[i].innerText = gameBoardArray[i];
		}
	};

	const createGameBoardButtons = () => {
		const gameBoardContainer = document.querySelector("#gameBoardContainer");
		for (let i = 1; i <= 9; i++) {
			const newButton = document.createElement("div");
			newButton.id = String(i);
			newButton.classList.add("gameBoardButton");

			newButton.addEventListener("click", function () {
				handleGameBoardClick(this);
			}, {once: true});

			gameBoardContainer.appendChild(newButton);
		}
	};

	const handleGameBoardClick = (clickedButton) => {
		clickedButton.classList.add("unplayable");
		clickedButton.innerText = currentPlayer.markerSymbol;
		let index = clickedButton.id - 1;
		gameBoardArray[index] = currentPlayer.markerSymbol;

		if (checkWinner()) {
			log("Player has won");
			// Add to winners score
		} else if (checkTie()) {
			// Reset game
		}

		toggleCurrentPlayer();
	};

	const toggleCurrentPlayer = () => {
		currentPlayer = (currentPlayer === player1) ? player2 : player1;
	};

	const checkWinner = () => {
		let gameGrid = [];

		let index = 0;
		for (let i = 0; i < 3; i++) {
			let newRow = [];
			for (let j = 0; j < 3; j++) {
				newRow.push(gameBoardArray[index]);
				index++;
			}
			gameGrid.push(newRow);
		}

		// Check diagonals
		if (gameGrid[0][0] === gameGrid[1][1] && gameGrid[1][1] === gameGrid[2][2] &&
			gameGrid[0][0] !== String.fromCharCode(160)) {
			log("diagonal 1");
			return true;
		}

		if (gameGrid[0][2] === gameGrid[1][1] && gameGrid[1][1] === gameGrid[2][0] &&
			gameGrid[0][2] !== String.fromCharCode(160)) {
			log("diagonal 2");
			return true;
		}

		// Check rows
		for (let i = 0; i < 3; i++) {
			if (gameGrid[i][0] === gameGrid[i][1] && gameGrid[i][1] === gameGrid[i][2] &&
				gameGrid[i][0] !== String.fromCharCode(160)) {
				log(`row ${i + 1}`);
				return true;
			}
		}

		// Check columns
		for (let i = 0; i < 3; i++) {
			if (gameGrid[0][i] === gameGrid[1][i] && gameGrid[1][i] === gameGrid[2][i] &&
				gameGrid[0][i] !== String.fromCharCode(160)) {
				log(`column ${i + 1}`);
				return true;
			}
		}
		return false;
	};

	const checkTie = () => {
		for (let i = 0; i < 9; i++) {
			if (gameBoardArray[i] === String.fromCharCode(160)) {
				return false;
			}
		}
		return true;
	};

	return {
		updateDisplay,
		initializeGameBoardArray,
		createGameBoardButtons,
	};
})();


const playerCreator = (function () {
	let playerId = 0;

	const createPlayer = (name, markerSymbol) => {
		playerId++;
		const player = Object.create(playerMethods);

		player.name = name;
		player.markerSymbol = markerSymbol;
		player.score = 0;
		player.id = playerId;

		return player;
	};

	const playerMethods = {
		getName() {
			return name;
		},
	};

	return {
		createPlayer,
	};
})();


gameController.runGame();