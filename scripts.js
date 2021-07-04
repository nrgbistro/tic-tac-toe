const log = (message) => console.log(`Logger: ${message}`);
let player1, player2, currentPlayer;

const gameController = (function () {
	const initializeGame = () => {
		log("Starting Game");
		gameBoard.initializeGameBoardArray();

		// Creates divs as clickable buttons
		gameBoard.createGameBoardButtons();

		// Creates player Objects
		player1 = playerCreator.createPlayer("Nolan", "X");
		player2 = playerCreator.createPlayer("Kevin", "O");


		gameBoard.updateDisplay();
		log("Completed Game Initialization");

		gameLoop();
	};

	const gameLoop = () => {
		currentPlayer = player1;

	};

	return {
		initializeGame,
	};
})();


const gameBoard = (function () {
	let gameBoardArray;
	//let gameBoardDOMArray = [];

	const initializeGameBoardArray = () => {
		gameBoardArray = [];
		for (let i = 0; i < 9; i++) {
			gameBoardArray.push(String.fromCharCode(160));
		}
	};

	const updateDisplay = () => {
		console.log(gameBoardArray);
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
			newButton.classList.add("playable");
			newButton.addEventListener("click", function () {
				handleGameBoardClick(this);
			}, {once: true});
			gameBoardContainer.appendChild(newButton);
		}
	};

	const handleGameBoardClick = (clickedButton) => {
		clickedButton.classList.toggle("playable");
		clickedButton.classList.toggle("unplayable");
		clickedButton.innerText = currentPlayer.markerSymbol;
		toggleCurrentPlayer();
	};

	const toggleCurrentPlayer = () => {
		if(currentPlayer === player1){
			currentPlayer = player2;
		}
		else if(currentPlayer === player2){
			currentPlayer = player1;
		}
		else {
			log("toggleCurrentPlayer Error");
		}
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


gameController.initializeGame();