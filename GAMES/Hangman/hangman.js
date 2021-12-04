// start of wrapper (I will explain how this works later)
(async () => {
	// your code goes here! below this line

	const hangman = [
		`
  +---+
  |   |
      |
      |
      |
      |
=========`,
		`
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
		`
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
		`
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
		`
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
		` 
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
		`
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
	];

	let wordList = `abruptly absurd abyss affix askew avenue awkward axiom azure bagpipes bandwagon banjo bayou beekeeper bikini blitz blizzard boggle bookworm boxcar buckaroo buffalo buffoon buxom buzzard buzzing buzzwords cobweb croquet crypt cycle disavow dizzying duplex dwarves embezzle equip espionage euouae exodus faking fishhook fixable fjord flapjack flopping fluffiness flyby foxglove frazzled frizzled fuchsia funny gabby galaxy galvanize gazebo gizmo glowworm glyph gnarly gnostic gossip grogginess haiku haphazard hyphen icebox injury ivory ivy jackpot jawbreaker jaywalk jazzy jelly jigsaw jinx jiujitsu jockey jogging joking jovial joyful juicy jukebox jumbo kayak kazoo keyhole kilobyte kiosk kitsch kiwifruit klutz knapsack larynx lengths lucky luxury lymph marquee matrix megahertz microwave mnemonic mystify nightclub nowadays oxidize oxygen pajama phlegm pixel pizazz polka psyche puppy puzzling quartz queue quips quiz quizzes quorum razzmatazz rhubarb rhythm scratch snazzy sphinx squawk staff strength stretch stronghold stymied subway swivel syndrome thrift thumb topaz transcript transgress transplant twelfth triphthong unknown unzip vaporize voodoo vortex walkway waltz wave wavy waxy well whomever witch wizard wristwatch xylophone yacht youthful yummy zigzag zilch zipper zodiac zombie`;

	/* PART A0: split the words string into an array, choose a random word */
	words = wordList.split(' ');
	let word = words[Math.floor(Math.random() * words.length)];
	console.log(word);

	/* PART A1: make an array with a line for each letter in the word */
	// Example word: 'quiz'
	// lines -> ['_', '_', '_', '_']
	//ask q why i dont need to put this chunk inside the loop
	let unsplitlines = '_'.repeat(word.length);
	let lines = unsplitlines.split('');
	console.log(lines);

	/* PART A3: make the game loop */

	let wrongGuesses = 0;
	while (lines.includes('_')) {
		/* PART A2: show the lines for the word below the hangman string */
		let guess = await prompt(hangman[wrongGuesses] + '\n' + lines.join(' '));
		console.log(guess);

		let isCorrect = false;
		/* PART A4: implement guessing letters */
		if (guess.length == 1) {
			for (let i = 0; i < word.length; i++) {
				if (word[i] == guess) {
					lines[i] = guess;
					isCorrect = true;
				}
			}
		} else if (guess == word) {
			break;
		}

		if (isCorrect == false) {
			wrongGuesses += 1;
			if (wrongGuesses > 6) {
				break;
			}
		}
	} // end of game loop

	if (wrongGuesses <= 6) {
		await alert('Yes! ' + word + ' was the word');
	} else {
		await alert('GAMEOVER the word was ' + word);
	}

	exit(); // exits the game
})(); // end
