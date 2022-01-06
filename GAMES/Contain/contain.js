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

let imgPaddleV = spriteArt('.mmmmmm.\nmmmmmmmm\n' + 'mm....mm\n'.repeat(42) + 'mmmmmmmm\n.mmmmmm.');

// the \n means new line
let imgPaddleH = spriteArt(
	'.' +
		'm'.repeat(44) +
		'.\n' +
		'm'.repeat(46) +
		'\n' +
		('mm' + '.'.repeat(42) + 'mm\n').repeat(4) +
		'm'.repeat(46) +
		'\n' +
		'.' +
		'm'.repeat(44) +
		'.'
);

/* PART A1: Make image for the wall */

let paddleT = createSprite(imgPaddleH);
paddleT.x = width / 2;
paddleT.y = 10;
paddleT.immovable = true;

let paddleB = createSprite(imgPaddleH);
paddleB.x = width / 2;
paddleB.y = 185;
paddleB.immovable = true;

let paddleL = createSprite(imgPaddleV);
paddleL.x = 5;
paddleL.y = height / 2;
paddleL.immovable = true;

let paddleR = createSprite(imgPaddleV);
paddleR.x = 243;
paddleR.y = height / 2;
paddleR.immovable = true;

// places a ball in center of the screen
//ask q if u can create balls dynamically
let ball1 = createSprite(imgBall);
let ball2 = createSprite(imgBall);
let ball3 = createSprite(imgBall);
let ball4 = createSprite(imgBall);

let balls = [ball1, ball2, ball3, ball4];

ballsActive = 0;
ballsServed = 0;

let xvector = Math.pi;
let yvector = Math.pi;
while ((xvector / yvector) % Math.pi == 0) {
	joe = Math.random();
	if (joe > 0.5) {
		polarity = -1;
	} else {
		polarity = 1;
	}
	xvector = Math.random() * polarity;
	yvector = Math.random() * polarity;
}

async function serve(yvector, xvector) {
	for (let i = 3; i >= 0; i--) {
		text(i, 10, 17);
		await delay(1000);
	}
	await erase();
	for (let i = 0; i < 4; i++) {
		if (isGameover == true) {
			break;
		}
		let ball = balls[i];
		ball.x = width / 2;
		ball.y = height / 2;
		let xvector = Math.pi;
		let yvector = Math.pi;
		while ((xvector / yvector) % Math.pi == 0) {
			joe = Math.random();
			if (joe > 0.5) {
				polarity = -1;
			} else {
				polarity = 1;
			}
			xvector = Math.random() * polarity;
			yvector = Math.random() * polarity;
		}
		ball.velocity.x = xvector;
		ball.velocity.y = yvector;
		ball.active = true;
		ballsActive++;
		ballsServed++;
		await delay(2000);
	}
}
serve();
let score = 0;

function ballBounce() {
	score++;
	text(score, 15, 10);
}
let isGameover = false;
async function gameOver() {
	isGameover = true;
	await erase();
	text('GAMEOVER', 10, 20);
}

/* PART A0: create two paddles, place on each end of the screen */
function draw() {
	/* PART A1: draw the ball and paddles inside the p5 main draw function */
	background(0);

	if (isGameover == false) {
		paddleT.x = mouseX;
		paddleB.x = mouseX;
		paddleR.y = mouseY;
		paddleL.y = mouseY;
	}

	for (let i = 0; i < balls.length; i++) {
		let ball = balls[i];
		if (ball.active == false) {
			continue;
		}
		ball.bounce(paddleT, ballBounce);
		ball.bounce(paddleB, ballBounce);
		ball.bounce(paddleL, ballBounce);
		ball.bounce(paddleR, ballBounce);

		if (ball.x > 256 || ball.x < 0 || ball.y > 192 || ball.y < 0) {
			ball.active = false;
			ballsActive--;
			log(ball.active);
		}
	}
	if (ballsServed >= 2 && ballsActive < 2) {
		gameOver();
	}

	// code score counter
	drawSprites();
}
