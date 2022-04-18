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
	boolean gameOver = false;

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
			for (int i = 0; i < arr.length; i++){
				dictionary.add(arr[i]);
			}
    }
		log(dictionary.get(0));
    fileScanner.close();
		startGame();
	}
	/* Display all the boxes for the letters */
	void displayBoxes() {
		for(int row = 1; row <6; row++){
			for(int col = 1; col<6;col++){
				textRect(row*3,col*3,3,3);
			}
		}
	}

	void startGame() {
		/* pick new word */
		int validGuesses = 0;
		int randomWordIndex = (int) (Math.floor(Math.random()*words.size()));
		String word = words.get(randomWordIndex);
		log(word);

		displayBoxes();

		while (gameOver == false){
			String guess = (prompt("Guess the word!", 3, 18, 20)).toUpperCase();
			if(guess.length() != 5){
				alert("Only 5 letter words!",15,5,9);
				displayBoxes();
			}
			else{
				String[] word_alphabets = word.split("");
				String[] guess_alphabets = guess.split("");
				log(guess_alphabets);
				for(int i = 0; i< guess_alphabets.length();i++){
					text(guess_alphabets[i],4+validGuesses*3,4+i*3);
				}
				validGuesses++;
				log(word_alphabets);
			}
		}
	}

	public static void main(String[] args) {
		new Wordle();
	}
}
