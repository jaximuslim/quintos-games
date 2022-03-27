// screen size: 160x144 pixels
// text rows: 18 cols: 20
let inputDirection = 'up';

let score = 0; // number of apples eaten

text('SCORE: ' + score, 17, 6);

let apple = world.createSprite('apple', 6.5, 9.5, 1);

for (let row = 0; row < 14; row++) {
	for (let col = 0; col < 20; col++) {
		randomNum = String(Math.floor(Math.random() * 10));
		let grass = world.createSprite('grass' + randomNum, row, col);
	}
}
async function move() {
	await snake.move(inputDirection, 0.5);
	move();
}
move();

function keyPressed() {
	if (key == 'ArrowUp') {
		inputDirection = 'up';
	}
	if (key == 'ArrowDown') {
		inputDirection = 'down';
	}
	if (key == 'ArrowLeft') {
		inputDirection = 'left';
	}
	if (key == 'ArrowRight') {
		inputDirection = 'right';
	}
	log(key);
}

function draw() {
	background(colorPal(2));

	drawSprites();
}
