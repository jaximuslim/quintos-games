let inp;
let randomWord;
let score;
let scrolling;

// value is the text the user entered in the input
async function onSubmit(value) {
	await erase();
	if (value == randomWord) {
		score++;
		let goodjob = ['that_is_correct_now_spell', 'you_are_correct_next_spell', 'you_are_right_try'];
		random_affirmation = Math.floor(Math.random() * 3);
		await play(speechSounds[goodjob[random_affirmation]]);
		if (score == 10) {
			await play(speechSounds['here_is_your_score']);
			await play(wordSounds['ten']);
		}
		nextWord();
	} else {
		await play(speechSounds['that_is_incorrect_the_correct_spelling_of']);
		await play(wordSounds[randomWord]);
		await play(speechSounds['is']);

		for (let i = 0; i < randomWord.length; i++) {
			let letter = randomWord[i].toUpperCase();
			await play(letterSounds[letter]);
		}
		await play(speechSounds['now_spell']);
		nextWord();
	}
}

// called everytime the user enters text in the input
function onChange(value) {
	let letter = value[value.length - 1].toUpperCase();
	letterSounds[letter].play(); // example plays sound
}

async function nextWord() {
	await erase(); // erase the screen
	randomWord = words[Math.floor(Math.random() * words.length)];
	await delay(200);
	wordSounds[randomWord].play();
	log(randomWord);
	// create the input for letters
	inp = input('', 0, 0, onSubmit, onChange);
}

async function scrollPrompt(msg) {
	let i = 0;
	scrolling = true;
	while (scrolling == true) {
		text(msg.substring(i, i + 23));
		await delay(100);
		i++;
		if (i > msg.length) {
			msg = ' '.repeat(23) + msg;
			i = 0;
		}
	}
}

async function startGame() {
	score = 0;
	input('', 1, 0, difficulty);
	scrollPrompt('Type A for short words or B for long words ');
}

async function difficulty(value) {
	scrolling = false;
	if (value == 'B') {
		log(difficulty);
		words = longWords;
		log(wordSounds);
	}
	await play(speechSounds['spell']);
	nextWord();
}
startGame();
