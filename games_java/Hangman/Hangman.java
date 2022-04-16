package games_java.Hangman;

import java.util.Scanner;

public class Hangman {

	public static void main(String[] args) {
		Scanner sc = new Scanner(System.in);

		String[] hangman = new String[] { """
				  +---+
				  |   |
				      |
				      |
				      |
				      |
				=========""", """
				  +---+
				  |   |
				  O   |
				      |
				      |
				      |
				=========""", """
				  +---+
				  |   |
				  O   |
				  |   |
				      |
				      |
				=========""", """
				  +---+
				  |   |
				  O   |
				 /|   |
				      |
				      |
				=========""", """
				  +---+
				  |   |
				  O   |
				 /|\\  |
				      |
				      |
				=========""", """
				  +---+
				  |   |
				  O   |
				 /|\\  |
				 /    |
				      |
				=========""", """
				  +---+
				  |   |
				  O   |
				 /|\\  |
				 / \\  |
				      |
				=========""" };

		String wordsList = "abruptly absurd abyss affix askew avenue awkward axiom azure bagpipes bandwagon banjo bayou beekeeper bikini blitz blizzard boggle bookworm boxcar buckaroo buffalo buffoon buzzard buzzing buzzwords cobweb croquet crypt cycle disavow dizzying duplex dwarves embezzle equip espionage euouae exodus faking fishhook fixable fjord flapjack flopping fluffiness flyby foxglove frazzled frizzled funny gabby galaxy galvanize gazebo gizmo glow glyph gnarly gnostic gossip grogginess haiku haphazard hyphen icebox injury ivory ivy jackpot jawbreaker jaywalk jazzy jelly jigsaw jinx jiujitsu jockey jogging joking jovial joyful juicy jukebox jumbo kayak kazoo keyhole kilobyte kiosk kitsch kiwifruit klutz knapsack lengths lucky luxury marquee matrix megahertz microwave mnemonic mystify nightclub nowadays oxidize oxygen pajama phlegm pixel pizazz polka psyche puppy puzzling quartz queue quip quiz quizzes razzmatazz rhythm scratch snazzy squawk staff strength stretch stronghold stymie subway swivel syndrome thrift thumb topaz transcript transgress transplant twelfth unknown unzip vaporize voodoo vortex walkway waltz wave wavy waxy well whomever witch wizard wristwatch xylophone yacht youthful yummy zigzag zilch zipper zodiac zombie";

		/* PART A: split the wordsList String into an array, choose a random word */
		
		String[] words = wordsList.split(" ");
		int randomWordIndex = (int) (Math.floor(Math.random()*words.length));
		String word = words[randomWordIndex];
		log(word);

		/* PART B: make a char array with a line for each letter in the word */
		// Example word: 'quiz'
		// lines -> ['_', '_', '_', '_']
		char[] lines = "_".repeat(word.length()).toCharArray();
		int hangmanPos = 0;
		boolean gameOver = false;
		while (gameOver == false){
			/* PART C: show the lines for the word below the hangman art */
			
			if( hangmanPos >= hangman.length){
				System.out.println("You Lose. The word was " + word);
				break;
			}

			String msg =hangman[hangmanPos];

			for(int i = 0; i< lines.length;i++){

				msg += lines[i] + " ";
			}
			// create the prompt
			System.out.println(msg);
			String guess = sc.nextLine();

			if (guess.equals(word)) {
				System.out.println("You won!");
				break;
			}
		
			else{
				boolean isCorrect = false;
				for(int i = 0; i<word.length(); i++){
					if (guess.charAt(0) == word.charAt(i)) {
						lines[i] = guess.charAt(0);
						isCorrect = true;
					}
				}
				if (isCorrect == false) {
					hangmanPos++;
				}
			}
			gameOver = true;
			for(int i = 0; i< lines.length;i++) {
				if(lines[i]=='_'){
					gameOver = false;
					break;
				}
			}
			if(gameOver == true){
				System.out.println("You won!");
			}
		}
		sc.close();
		System.exit(0);
	}
}
