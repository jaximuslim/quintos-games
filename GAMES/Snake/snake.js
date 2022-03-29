// screen size: 160x144 pixels
// text rows: 18 cols: 20
let inputDirection = 'up';
let previousDirection;

let score = 0; // number of apples eaten

text('SCORE: ' + score, 17, 6);

let apple = world.createSprite('apple', 6.5, 9.5, 1);

for (let row = 0; row < 14; row++) {
	for (let col = 0; col < 20; col++) {
		randomNum = Math.floor(Math.random() * 10);
		let grass = world.createSprite('grass' + randomNum, row, col);
	}
}
// world.createSprite('pipe4', 0, 0, 1);
// for (let i = 1; i < 4; i++) {
// 	if (i == 2){
// 		for (let j = 0;j <10; j++){
// 			world
// 		}
// 	}
// 	world.createSprite('pipe' + i, 0, i, 1);
// }

for (let wallCount = 0; wallCount < 2; wallCount++) {
	for (let i = 0; i < 19; i++) {
		if (i == 0) {
			j = 4;
		}
		if (i == 1) {
			j = 1;
		}
		if (i > 1 && i < 20) {
			j = 2;
		}
		if (wallCount == 0) {
			startposRow = 0;
			startposCol = 0;
			posRow = 0;
			posCol = startposCol + i;
			pipe = world.createSprite('pipe' + j, posRow, posCol, 1);
		}
		if (wallCount == 1) {
			startposRow = 0;
			startposCol = 19;
			posRow = startposRow + i;
			posCol = 19;
			pipe = world.createSprite('pipe' + j, posRow, posCol, 1);
			pipe.mirrorX(-1);
			pipe.mirrorY(-1);
		}
	}
}

async function move() {
	await snake.move(inputDirection, 0.5);
	move();
}
move();

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

function draw() {
	background(colorPal(2));

	drawSprites();
}
