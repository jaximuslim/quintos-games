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
let imgPaddle = spriteArt(
	`
	.mmmmmmmmmmmmmmmmmmmmmmmm.
	m                        m
	m                        m
	m                        m
	.mmmmmmmmmmmmmmmmmmmmmmmm.

	`
);

/* PART A1: Make image for the wall */

let paddleT = createSprite(imgPaddle);
paddleT.x = width / 2;
paddleT.y = 10;

let paddleB = createSprite(imgPaddle);
paddleB.x = width / 2;
paddleB.y = 185;

// places a ball in center of the screen
//ask q if u can create balls dynamically
let ball1 = createSprite(imgBall);
let ball2 = createSprite(imgBall);
let ball3 = createSprite(imgBall);
let ball4 = createSprite(imgBall);

let ball_array = [ball1, ball2, ball3, ball4];

async function addBall() {
	for (let i = 0; i < 4; i++) {
		await delay(500);
		ball_array[i].x = width / 2;
		ball_array[i].y = height / 2;
		ball_array[i].velocity.x = 1;
		ball_array[i].velocity.y = 1;
	}
}
addBall();
function displayScore() {
	text(score, height / 2, width / 2);
}

displayScore();
/* PART A0: create two paddles, place on each end of the screen */

function draw() {
	/* PART A1: draw the ball and paddles inside the p5 main draw function */
	background(0);

	// code score counter
	drawSprites();
}
