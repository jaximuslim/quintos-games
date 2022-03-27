const title = `
TTTTT IIIII   CCC
  T     I    C
  T     I    C
  T     I    C
  T   IIIII   CCC
TTTTT  AAA    CCC
  T   A   A  C
  T   AAAAA  C
  T   A   A  C
  T   A   A   CCC
TTTTT  OOO   EEEE
  T   O   O  E
  T   O   O  EEE
  T   O   O  E
  T    OOO   EEEE`.slice(1);

text(title, 5, 6);

let singlePlayer;
let gameStarted = false;
let aidifficulty;

function selectGameMode() {
	button('2 Player', 10, 56, async () => {
		await eraseRect(10, 56, 20, 1);
		singlePlayer = false;
		gameStarted = true;
	});
	button('1 Player', 10, 66, async () => {
		singlePlayer = true;
		log(singlePlayer);
		await eraseRect(10, 56, 20, 1);
		button('Easy', 10, 56, () => {
			aidifficulty = 1;
			gameStarted = true;
			eraseRect(10, 56, 20, 1);
		});
		button('Medium', 10, 63, () => {
			aidifficulty = 2;
			gameStarted = true;
			eraseRect(10, 56, 20, 1);
		});
		button('Hard', 10, 72, () => {
			aidifficulty = 3;
			gameStarted = true;
			eraseRect(10, 56, 20, 1);
		});
	});
}

selectGameMode();

const bigSpace = '        \n'.repeat(7);

const bigO = `
 OOOOOO
OO    OO
OO    OO
OO    OO
OO    OO
OO    OO
 OOOOOO`.slice(1); // slice off the first newline character

const bigX = `
XX    XX
 XX  XX
  XXXX
   XX
  XXXX
 XX  XX
XX    XX`.slice(1);

const gridRow = 3;
const gridCol = 26;
let turnX = true;

let board = [
	[' ', ' ', ' '],
	[' ', ' ', ' '],
	[' ', ' ', ' ']
];

/* PART A: finish the grid of 9x8 spaces */
text('-'.repeat(26), gridRow + 7, gridCol);
text('-'.repeat(26), gridRow + 15, gridCol);

// text('─'.repeat(26), ?, ?); // draw another horizontal line
text('|\n'.repeat(23), gridRow, gridCol + 8);
text('|\n'.repeat(23), gridRow, gridCol + 17);
// text('│\n'.repeat(23), ?, ?); // draw another vertical line

/* PART A: Make the buttons in the grid */
// note the intervals! row += 8 and col += 9
// test code, delete after reading
let scoreX = 0;
let scoreO = 0;

function displayScore() {
	text('Score X: ' + scoreX, 5, 56);
	text('Score O: ' + scoreO, 5, 68);
}
displayScore();

for (let row = 0; row < 3; row++) {
	for (let col = 0; col < 3; col++) {
		let screenRow = gridRow + row * 8;
		let screenCol = gridCol + col * 9;
		button(bigSpace, screenRow, screenCol, () => {
			takeTurn(row, col);
		});
	}
}

displayTurn();

function setup() {
	for (let row = 0; row < 3; row++) {
		for (let col = 0; col < 3; col++) {
			let screenRow = gridRow + row * 8;
			let screenCol = gridCol + col * 9;
			text(bigSpace, screenRow, screenCol);
			board = [
				[' ', ' ', ' '],
				[' ', ' ', ' '],
				[' ', ' ', ' ']
			];
		}
	}
	displayTurn();
	if (singlePlayer && !turnX) {
		aiTakeTurn();
	}
}

function aiTakeTurn() {
	if (aidifficulty == 1) {
		for (let row = 0; row < 3; row++) {
			for (let col = 0; col < 3; col++) {
				if (board[row][col] == ' ') {
					takeTurn(row, col);
					return;
				}
			}
		}
	}

	let avail = [];
	for (let i = 0; i < 9; i++) {
		if (board[Math.floor(i / 3)][i % 3] == ' ') {
			avail.push(i);
		}
	}
	log(avail);

	if (aidifficulty == 3) {
		// test if o will win if they go in that spot
		for (let j = 0; j < avail.length; j++) {
			let row = Math.floor(avail[j] / 3);
			let col = avail[j] % 3;

			board[row][col] = 'o';
			if (checkForWinner('o') == true) {
				board[row][col] = ' ';
				takeTurn(row, col);
				return;
			}
			board[row][col] = ' ';
		}
		// test if x can be prevented from winning
		// if o goes in that spot
		for (let j = 0; j < avail.length; j++) {
			let row = Math.floor(avail[j] / 3);
			let col = avail[j] % 3;

			board[row][col] = 'x';
			if (checkForWinner('x') == true) {
				board[row][col] = ' ';
				takeTurn(row, col);
				return;
			}
			board[row][col] = ' ';
		}
	}

	let rand = Math.floor(Math.random() * avail.length);
	let idx = avail[rand];
	takeTurn(Math.floor(idx / 3), idx % 3);
}

async function takeTurn(row, col) {
	if (!gameStarted) return;
	let screenRow = gridRow + row * 8;
	let screenCol = gridCol + col * 9;
	if (board[row][col] == 'o' || board[row][col] == 'x') {
		alert('Invalid', 20, 65, 12);
	}
	let mark;
	if (turnX == true) {
		text(bigX, screenRow, screenCol);
		board[row][col] = 'x';
		mark = 'x';
	} else {
		text(bigO, screenRow, screenCol);
		board[row][col] = 'o';
		mark = 'o';
	}
	log(board.join('\n'));

	if (checkForWinner(mark)) {
		if (mark == 'o') {
			log(scoreO);
			scoreO += 1;
			turnX = true;
		}
		if (mark == 'x') {
			log(scoreX);
			scoreX++;
			turnX = false;
		}
		displayScore();
		await alert('Player ' + mark + ' you won!', 10, 56, 20);
		setup();
		return;
	}
	if (checkForDraw()) {
		await alert('Draw', 10, 56, 25);
		setup();
		return;
	}
	turnX = !turnX;
	displayTurn();
	if (!turnX && singlePlayer) {
		await delay(500);
		aiTakeTurn();
	}
}

function displayTurn() {
	let mark;
	if (turnX) {
		mark = 'x';
	} else {
		mark = 'o';
	}
	text(mark + "'s turn", 2, 56);
}

function checkForDraw() {
	for (let i = 0; i < 9; i++) {
		if (board[Math.floor(i / 3)][i % 3] == ' ') {
			return false;
		}
	}
	return true;
}

function checkForWinner(mark) {
	for (let i = 0; i < 3; i++) {
		if (board[i][0] == mark && board[i][1] == mark && board[i][2] == mark) {
			return true;
		}
		if (board[0][i] == mark && board[1][i] == mark && board[2][i] == mark) {
			return true;
		}
	}
	if (board[0][0] == mark && board[1][1] == mark && board[2][2] == mark) {
		return true;
	} else if (board[0][2] == mark && board[1][1] == mark && board[2][0] == mark) {
		return true;
	}
	return false;
}
