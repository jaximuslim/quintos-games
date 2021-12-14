// start of wrapper (I will explain how this works later)
(async () => {
	// your code goes here! below this line

	let choice = -1; // initialize choice to -1, user has not made any choice yet

	async function turnPage() {
		await erase();

		let msg = ''; // initialize message to empty string
		let opt = [];

		if (choice == -1) {
			/* PART A0: Start your story! */
			msg = "It's a dark October night. You're staying up late coding but suddenly you hear a knock at your door!";
			// '1: Ask "Who is it?"\n\t' +
			// '2: Ignore it and keep coding\n\t' +
			// '3: Try to go to sleep';
			opt = [1, 2, 3];

			const door = `
  __________
 |  __  __  |
 | |  ||  | |
 | |  ||  | |
 | |__||__| |
 |  __  __()|
 | |  ||  | |
 | |  ||  | |
 | |  ||  | |
 | |  ||  | |
 | |__||__| |
 |__________|
Ask "Who is it?`;
			const computer = `
     _________
    / ======= \\
   / __________\\
  | ___________ |
  | | -       | |
  | |         | |
  | |_________| |
  \\=____________/
  / """"""""""" \\ 
 / ::::::::::::: \\ 
(_________________)

Ignore it and keep \ncoding`;

			const bed = `
			()___ 
    ()//__/)_______________()
    ||(___)//#/_/#/_/_/#()/||
    ||----|#| |#|_|_|#|_|| ||
    ||____|_|#|_|_|#|_|#||/||
    ||    |#|_|#|#|_|#|_||



          
		
		       
		Try to go to sleep`;

			button(door, 13, 10, () => {
				choice = 1;
				turnPage();
			});

			button(computer, 13, 29, () => {
				choice = 2;
				turnPage();
			});

			button(bed, 13, 49, () => {
				choice = 3;
				turnPage();
			});
		} else if (choice == 1) {
			/* PART A1: continue the story */
			msg = "It's me Micheal! \n\n\t" + '4: Ask "Micheal who?"\n\t' + '5: Hide';
			opt = [4, 5];
		} else if (choice == 2 || choice == 3) {
			msg =
				'In one quick moment a man in a white mask bashes through the door, grabs you from your chair and strangles you, you die! GAME OVER';
		} else if (choice == 4) {
			msg =
				"That's the first time anyone has ever ask me for my second name! It's Myers! Heres the keys to my new tesla.YOU WIN";
		} else if (choice == 5) {
			msg =
				'You realise that you recently sold all your furniture and have no cover. Micheal breaks down the door,grabs you and begs you to ask him for his second name. You die before you can.GAME OVER';
		}

		if (choice == -1) {
			text(msg, 2, 2);
		} else if (opt.length > 0) {
			// prompt the player to make choices
			let input = await prompt(msg);

			/* PART B1: check if the player made a valid choice, reject invalid choices */
			if (opt.includes(input)) {
				choice = input;
			} else {
				await alert('Please chose a valid number. Try again');
			}
		} else {
			/* PART B0: end the game if there are no more choices to make */
			await alert(msg);
			choice = null;
		}
	}

	turnPage();
})(); // end wrapper
