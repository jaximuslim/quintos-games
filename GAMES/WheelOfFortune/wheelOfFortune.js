// the category is "Fun and Games"
let phrases =
	'Skateboarding & Snowboarding|Competitive Shuffleboard|Grand-Opening Celebration|Neighborhood Get-Together|Skateboards & Rollerblades|Snowshoeing & Snowboarding|Performing-Arts Festival|Spur-Of-The-Moment Getaway|Wholesome Entertainment|Arts-And-Crafts Festival|Ice-Carving Competition|Snowbiking & Airboarding|City-Center Horseraces|Hamletscenen Festival|Lion-Dance Competition|Snowboarding & Sledding|Traditional Macaroons|Building Sandcastles|Festive Celebrations|Fingerprints Drawing|Going Paddleboarding|Helium-Filled Baloons|In-The-Kitchen Puzzles|Model-Airplane Racing|Alpine Snowboarding|Contestant Searches|Festive Celebration|Freestyle Wrestling|Interactive Puzzles|Mini-Golf Tournament|Playing Racquetball|Roller-Coaster Rides|Sleight-Of-Hand Magic|Back-Road Bicycling|Complicated Puzzle|Fast-Pitch Softball|Freshwater Fishing|Outdoor Recreation|Playing Backgammon|Playing Pictionary|Slight-Of-Hand Magic|Water-Balloon Fight|Weeklong Festivals|Chess Competition|Crossword Puzzles|Equestrian Sports|Football & Baseball|Going Parasailing|Halloween Hayride|Indoor Volleyball|Juggling Beanbags|Medieval Festival|Playing Asteroids|Playing Hopscotch|Playing Solitaire|Pothole Exploring|Softball & Baseball|Two-Story Carousel|Wheelbarrow Races|Adventure Racing|Ballroom Dancing|Beach Volleyball|Childhood Heroes|Christmas Crafts|Demolition Derby|Doing Handstands|Dungeons & Dragons|Fraternity Prank|Fun Brainteasers|Gorgeous Fishing|Habanos Festival|Hula Competition|Indoor Go-Carting|Inflatable Slide|Japanese Archery|Knock-Knock Jokes|Narrated Cruises|Ping-Pong Paddles|Playing Dominoes|Playing Jeopardy!|Playing Lacrosse|Playing Peekaboo|Playing Scrabble|Potato-Sack Races|Riding Piggyback|Spitting Contest|Street Carnivals|Twenty Questions|Urban Spelunking|Wheelbarrow Race|Amazing History|Anderlecht Fair|Big-Wave Surfing|Boggle & Scrabble|Burping Contest|Community Chest|Country Dancing|Croquet Mallets|Downhill Skiing|Dragon-Boat Race|Family Cookouts|Gaelic Football';

/* Make an array of phrases, pick a random phrase, and split pharse into an array of words */

phrases = phrases.split('|');

let board = [];
let avail = [];

let phrase = phrases[Math.floor(Math.random() * phrases.length)];
phrase = phrase.split(' ');
log(phrase);

/* Make a board array to represent the letters in the phrase */
// phrase -> ['Community', 'Chest']
// board -> [
//   [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '],
//   [' ', ' ', ' ', ' ', ' ']
// ]

for (let i = 0; i < phrase.length; i++) {
	board[i] = ' '.repeat(phrase[i].length).split('');
}

for (let i = 0; i < phrase.length; i++) {
	for (let j = 0; j < phrase[i].length; j++) {
		avail.push([i, j]);
	}
}

/* Display all the boxes for the phrase */
for (let i = 0; i < phrase.length; i++) {
	for (let j = 0; j < phrase[i].length; j++) {
		textRect(2 + i * 3, 2 + j * 3, 3, 3);
	}
}

let bigBuzzer = `
|⎺|__  _   _ ___________ _ __
| '_ \\| | | |_  /_  / _ \\ '__|
| |_) | |_| |/ / / /  __/ |
|_.__/ \\__,_/___/___\\___|_|`.slice(1);

function buzz() {}

/* Create the buzzer button */
button(bigBuzzer, 18, 5, buzz);

/* Add a letter to a random empty box */
async function addLetter() {
	let rand = Math.floor(Math.random() * avail.length);
	let coord = avail.splice(rand, 1)[0];
	log(avail);
	log(coord);
	text(phrase[coord[0]][coord[1]], 3 + coord[0] * 3, 3 + coord[1] * 3);
	await delay(500);
	addLetter();
}

addLetter();
