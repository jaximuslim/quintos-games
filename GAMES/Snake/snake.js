// screen size: 160x144 pixels
// text rows: 18 cols: 20
let inputDirection = 'up';
let previousDirection;

let score = 0; // number of apples eaten
let eating = false;

text('SCORE: ' + score, 17, 6);

let apple = world.createSprite('apple', 6, 9, 1);

for (let row = 0; row < 14; row++) {
	for (let col = 0; col < 20; col++) {
		randomNum = Math.floor(Math.random() * 10);
		let grass = world.createSprite('grass' + randomNum, row, col);
	}
}
for (let col = 1; col < 19; col++) {
	let type = 2;
	if (col == 1) {
		type = 1;
	} else if (col == 18) {
		type = 3;
	}
	pipes.createSprite('pipe' + type, 0, col, 1);
	pipes.createSprite('pipe' + type, 13, col, 1);
}
for (let row = 1; row < 13; row++) {
	let type = 2;
	if (row == 1) {
		type = 1;
	} else if (row == 12) {
		type = 3;
	}
	pipes.createSprite('pipe' + type, row, 0, 1).rotation = 90;
	pipes.createSprite('pipe' + type, row, 19, 1).rotation = 90;
}

pipes.createSprite('pipe4', 0, 0, 1);
pipes.createSprite('pipe5', 0, 19, 1);
pipes.createSprite('pipe6', 13, 0, 1);
pipes.createSprite('pipe7', 13, 19, 1);

function keyPressed() {
	if (key == 'ArrowUp' && previousDirection != 'ArrowDown') {
		inputDirection = 'up';
		previousDirection = key;
	}
	if (key == 'ArrowDown' && previousDirection != 'ArrowUp') {
		inputDirection = 'down';
		previousDirection = key;
	}
	if (key == 'ArrowLeft' && previousDirection != 'ArrowRight') {
		inputDirection = 'left';
		previousDirection = key;
	}
	if (key == 'ArrowRight' && previousDirection != 'ArrowLeft') {
		inputDirection = 'right';
		previousDirection = key;
	}
}

function changeDirection() {
	let mod = '';
	if (eating) mod = '-eat';
	if (inputDirection == 'up') {
		snake.ani('head-up' + mod);
		snake.mirrorX(1);
		snake.mirrorY(1);
	}
	if (inputDirection == 'down') {
		snake.ani('head-up' + mod);
		snake.mirrorX(1);
		snake.mirrorY(-1);
	}
	if (inputDirection == 'left') {
		snake.ani('head-left' + mod);
		snake.mirrorX(1);
		snake.mirrorY(1);
	}
	if (inputDirection == 'right') {
		snake.ani('head-left' + mod);
		snake.mirrorX(-1);
		snake.mirrorY(1);
	}
}

async function move() {
	// snake close to apple
	if (snake.row == apple.row || snake.col == apple.col) {
		eating = true;
	} else {
		eating = false;
	}

	// snake eats apple
	if (snake.row == apple.row && snake.col == apple.col) {
		apple.row = Math.ceil(Math.random() * 13);
		apple.col = Math.ceil(Math.random() * 11);
	}

	changeDirection();

	await snake.move(inputDirection, 0.5);
	move();
}
move();

function draw() {
	background(colorPal(2));
	snake.collide(pipes);
	drawSprites();
}
