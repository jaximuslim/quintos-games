const target = `
 .d88b. 
.8P  Y8.
88    88
88    88
 8b  d8 
 'Y88P' `.slice(1);

const circle = `
    .aa.
  .aa  aa.
 aaa    aaa
 aaa  x  aaa
	aa     aa
	  .aa. `.repeat(5);

const oval = `
    88888888
  d          d
 8      x      8
  d          d
     88888888
`.repeat(6);

// slice removes the first character from the string
// in this case I remove the new line at the beginning
// so the first line of the button will be at the proper
// row value

/* PART A0: change the values of row and col to be random */

// screen size is 80 cols x 30 rows
// target is 8w x 6h
// drawing starts from top left corner
// we want to draw the target within the bounds of the frame
// 30 rows - 6 target height - 1 frame line = 23
// 80 columns - 8 target width - 1 frame line = 71
//ask q a sync function wouldnt work

async function introduction() {
	await alert('Click on the targets as fast as you can!', 10, 15);
	background();
	spawnBtn();
}

introduction();

let btn;
let time = [];
let clicks = 0;

function spawnBtn() {
	if (btn) {
		clicks++;
		btn.erase();
		time.push(Date.now());
	}
	if (clicks == 10) {
		calcStats();
	} else {
		let row = Math.ceil(Math.random() * 23);
		let col = Math.ceil(Math.random() * 71);
		btn = button(target, row, col, spawnBtn);
	}
}
function background() {
	let col = 1;
	for (let j = 0; j < 80 / 15; j++) {
		if (j % 2 == 0) {
			text(circle, 1, col);
			col = col + 15;
		} else {
			text(oval, 1, col);
			col = col + 17;
		}
	}
}
async function calcStats() {
	let fastestClick = 100000000;
	let slowestClick = 0;
	let speed;
	let sum = 0;

	for (let i = 0; i < time.length - 1; i++) {
		speed = time[i + 1] - time[i];
		log(speed);
		sum = sum + speed;
		if (speed < fastestClick) {
			fastestClick = speed;
		}
		if (speed > slowestClick) {
			slowestClick = speed;
		}
	}
	let avg = sum / (time.length - 1);
	await alert(
		'Your fastest speed was: ' +
			fastestClick +
			'ms\nYour slowest speed was: ' +
			slowestClick +
			'ms\nYour average time was:' +
			Math.round(avg) +
			'ms'
	);
}

/* PART B: Use recursion to make a new button after clicking a button */

/* PART C: Limit clicks to 20, calculate stats */

/* PART D: Make a background pattern */
