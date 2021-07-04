const log = (message) => console.log(`Logger: ${message}`);
let player1, player2, currentPlayer;

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

		gameLoop();
	};

	const gameLoop = () => {


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

		checkWinner();

		if(checkTie()){
			// Reset game
		}

		toggleCurrentPlayer();
	};

	const toggleCurrentPlayer = () => {
		currentPlayer = (currentPlayer === player1) ? player2 : player1;
	}

	const checkWinner = () => {
		let gridGameBoardArray = [];

		let index = 0;
		for (let i = 0; i < 3; i++) {
			let newRow = [];
			for(let j = 0; j < 3; j++){
				newRow.push(gameBoardArray[index]);
				index++;
			}
			gridGameBoardArray.push(newRow);
		}
	}

	const checkTie = () => {
		for(let i = 0; i < 9; i++) {
			if(gameBoardArray[i] === String.fromCharCode(160)) {
				return false;
			}
		}
		return true;
	}

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