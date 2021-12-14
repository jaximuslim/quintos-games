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
	text(scoreX, 5, 60, 80);
	text(scoreO, 5, 70, 80);
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
}

async function takeTurn(row, col) {
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
		}
		if (mark == 'x') {
			log(scoreX);
			scoreX++;
		}
		setup();
		displayScore();
		await alert('Player ' + mark + ' you won!', 10, 56, 20);
		return;
	}
	if (checkForDraw()) {
		setup();
		await alert('Draw', 10, 56, 25);
		return;
	}
	turnX = !turnX;
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
