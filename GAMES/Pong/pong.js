// screen width is 256, height is 192

let imgBall = spriteArt(
	`
..rrrr..
.rrrrrr.
rrrrrrrr
rrbbbbrr
bbbwwbbb
wwbbbbww
wwwwwwww
.wwwwww.
..wwww..`
);

// the \n means new line
let imgPaddle = spriteArt('.mmmmmm.\nmmmmmmmm\n' + 'mm....mm\n'.repeat(42) + 'mmmmmmmm\n.mmmmmm.');

/* PART A1: Make image for the wall */
let imgWall = spriteArt('r'.repeat(600) + '\n' + 'c'.repeat(600), 2);
let wallT = createSprite(imgWall);
wallT.x = 0;
wallT.y = 10;

let wallB = createSprite(imgWall);
wallB.x = 0;
wallB.y = 190;

let paddleL = createSprite(imgPaddle);
paddleL.x = 5;
paddleL.y = height / 2;

let paddleR = createSprite(imgPaddle);
paddleR.x = 243;
paddleR.y = height / 2;

// places a ball in center of the screen
let ball = createSprite(imgBall);
ball.x = width / 2;
ball.y = height / 2;
ball.velocity.x = 1;
ball.velocity.y = 1;

let scoreL = 0;
let scoreR = 0;

function displayScore() {
	text(scoreL, 3, 14);
	text(scoreR, 3, 18);
}

displayScore();

/* PART A0: create two paddles, place on each end of the screen */

function draw() {
	/* PART A1: draw the ball and paddles inside the p5 main draw function */
	// the `width` and `height` variables are the width and height of the screen
	//to ask quinton why first method with variables within draw fn and no prototypes doesnt work

	background(0);

	// check for bounce of paddles
	if (ball.x + ball.w > paddleR.x && ball.y >= paddleR.y && ball.y <= paddleR.y + paddleR.h) {
		ball.velocity.x *= -1;
	}

	if (ball.x < paddleL.x + paddleL.w && ball.y >= paddleL.y && ball.y <= paddleL.y + paddleR.h) {
		ball.velocity.x *= -1;
	}

	//check for bounce of walls
	if (ball.y < 13 || ball.y > 180) {
		ball.velocity.y *= -1.01;
		ball.velocity.x *= 1.01;
	}

	// serve right
	if (ball.x < 0) {
		ball.velocity.x = 1;
		scoreR++;
	}
	//serve left
	if (ball.x > 256) {
		ball.velocity.x = -1;
		scoreL++;
	}
	// reset
	if (ball.x < 0 || ball.x > 256) {
		ball.x = width / 2;
		ball.y = height / 2;
		if (Math.random() > 0.5) {
			ball.velocity.y = 1;
		} else {
			ball.velocity.y = -1;
		}
		displayScore();
	}
	if (keyIsDown(38)) {
		paddleR.y -= 1.5;
	}
	if (keyIsDown(40)) {
		paddleR.y += 1.5;
	}
	if (keyIsDown(87)) {
		paddleL.y -= 1.5;
	}
	if (keyIsDown(83)) {
		paddleL.y += 1.5;
	}
	// code score counter
	drawSprites();
}
