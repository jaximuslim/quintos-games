package games_java.QuickClicks;

import static games_java.QuintOS.*;

public class QuickClicks {
	String target = " .d88b.\n.8P  Y8.\n88    88\n88    88\n'8b  d8'\n 'Y88P'";
	String fake = " .d88b.\n.8P  Y8.\n88 x  88\n88    88\n'8b  d8'\n 'Y88P'";

	void gameOver() {
		alert("Game Over!");
	}

	void makeTargets() {
		/*
		 * PART A0: change the values of row and col to be random, within the bounds of
		 * the screen.
		 */
		erase();
		int row = Math.floor(Math.random() * 23);
		int col = Math.floor(Math.random() * 71);
		button(target, row, col, () -> {
			this.makeTargets();
		});
		for (int i = 0; i < 4; i++) {
			int row = Math.floor(Math.random() * 23);
			int col = Math.floor(Math.random() * 71);
			button(fake, row, col, () -> {
				this.gameOver();
			});
		}
	}

	/* don't edit the code below this line */

	public QuickClicks() {
		makeTargets();
	}

	public static void main(String[] args) {
		new QuickClicks();
	}
}
