let inp;
let randomWord;

// value is the text the user entered in the input
function onSubmit(value) {
	erase();
	if (value == randomWord) {
		speechSounds['that_is_correct_now_spell'].play();
		speechSounds['that_is_correct_now_spell'].onended(() => {
			nextWord();
		});
	} else {
		speechSounds['that_is_incorrect_the_correct_spelling_of'].play();
		speechSounds['that_is_incorrect_the_correct_spelling_of'].onended(() => {
			wordSounds[randomWord].play();
			wordSounds[randomWord].onended(() => {
				speechSounds['is'].play();
				speechSounds['is'].onended(() => {
					speller(0);
				});
			});
		});
	}
}
async function speller(letterIdx) {
	if (letterIdx == randomWord.length) {
		speechSounds['now_spell'].play();
		speechSounds['now_spell'].onended(() => {
			nextWord();
		});
		return;
	}
	await delay(250);
	let sound = letterSounds[randomWord[letterIdx].toUpperCase()];
	sound.play();
	sound.onended(() => {
		speller(letterIdx + 1);
	});
}
// called everytime the user enters text in the input
function onChange(value) {
	let letter = value[value.length - 1].toUpperCase();
	letterSounds[letter].play(); // example plays sound
}
log(letterSounds);

async function nextWord() {
	await erase(); // erase the screen
	randomWord = words[Math.floor(Math.random() * words.length)];
	await delay(1000);
	wordSounds[randomWord].play();
	log(randomWord);
	// create the input for letters
	inp = input('', 0, 0, onSubmit, onChange);
}

async function startGame() {
	await alert('Press enter to start');
	speechSounds['spell'].play();
	nextWord();
}

startGame();
