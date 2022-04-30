package games_java.Wordle;

import static games_java.QuintOS.*;

import java.io.File;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.Scanner;

public class Wordle {
	ArrayList<String> dictionary;
	ArrayList<String> words;
	String[] board;
	String unused_alpha;
	int k;

	public Wordle() {
		setupGame();
	}

	void setupGame() {
		words = new ArrayList<String>();
		/* load the text files */
		String dir = System.getProperty("user.dir") + "/games_java/Wordle";
		File file = new File(dir + "/words5.txt");
		Scanner fileScanner;
		try {
			fileScanner = new Scanner(file);
		} catch (FileNotFoundException e) {
			return;
		}
		while (fileScanner.hasNextLine()) {
			words.add(fileScanner.nextLine());
		}
		log(words);
		fileScanner.close();

		dictionary = new ArrayList<String>();
		File dict_file = new File(dir + "/dictionary5.txt");
		try {
			fileScanner = new Scanner(dict_file);
		} catch (FileNotFoundException e) {
			return;
		}
		while (fileScanner.hasNextLine()) {
			String[] arr = (fileScanner.nextLine()).split(" ");
			for (int i = 0; i < arr.length; i++) {
				dictionary.add(arr[i]);
			}
		}

		fileScanner.close();
		startGame();
	}

	/* Display all the boxes for the letters */
	void displayBoxes() {
		erase();
		for (int row = 0; row < 6; row++) {
			for (int col = 1; col < 6; col++) {
				textRect(2 + row * 3, col * 3, 3, 3);
			}
		}
	}

	void displayInfo() {
		int row = 10;
		textRect(row, 20, 3, 3, "solid");
		text("letter is not found in word", row, 24);
		row += 3;
		textRect(row, 20, 3, 3, "outline");
		text("letter is in the word", row, 24);
		row += 3;
		textRect(row, 20, 3, 3, "dashed");
		text("letter is in the correct position", row, 24, 14);

	}

	void startGame() {
		/* pick new word */
		int randomWordIndex = (int) (Math.floor(Math.random() * words.size()));
		String word = words.get(randomWordIndex);
		log(word);
		displayBoxes();
		displayInfo();
		unused_alpha = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		text(unused_alpha, 21, 5);

		int validGuesses = 0;
		while (validGuesses < 6) {
			String guess = (prompt("Guess the word!", 2, 18, 20)).toUpperCase();
			if (guess.length() != 5) {
				alert("Only 5 letter words!", 2, 18, 20);
			} else if (dictionary.contains(guess) == false) {
				alert("Not a real word", 2, 18, 20);
				log(guess);
			} else {
				String[] word_alphabets = word.split("");
				String[] guess_alphabets = guess.split("");
				log(guess_alphabets);
				log(word_alphabets);
				for (int i = 0; i < guess_alphabets.length; i++) {
					if (word_alphabets[i] == guess_alphabets[i]) {
						eraseRect(2 + validGuesses * 3, 3 + i * 3, 3, 3);
						textRect(2 + validGuesses * 3, 3 + i * 3, 3, 3, "dashed");
					} else if (word.contains(guess_alphabets[i])) {
						eraseRect(2 + validGuesses * 3, 3 + i * 3, 3, 3);
						textRect(2 + validGuesses * 3, 3 + i * 3, 3, 3, "outline");
					} else {
						unused_alpha = unused_alpha.replace(guess_alphabets[i], " ");
						log(unused_alpha);
						eraseRect(21, 5, 26, 1);
						text(unused_alpha, 21, 5);
					}
					text(guess_alphabets[i], 3 + validGuesses * 3, 4 + i * 3);
				}
				validGuesses++;
				if (word == guess) {
					alert("You win!", 3, 18, 20);
					break;
				} else if (validGuesses == 6) {
					alert("You Lose, the word was " + word, 3, 18, 20);
				}
			}
		}
		startGame();
	}

	public static void main(String[] args) {
		new Wordle();
	}
}
