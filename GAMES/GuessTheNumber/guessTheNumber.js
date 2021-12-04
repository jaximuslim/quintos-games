(async () => {
	// your code goes here!
	let num = Math.floor(Math.random() * 100 + 1);

	let usernum;
	while (usernum != num) {
		usernum = await prompt('Chose a number 1-100:');

		if (usernum == num) {
			await alert(usernum + ' is correct!');
		} else if (usernum > num) {
			await alert(usernum + ' is too high');
		} else {
			await alert(usernum + ' is too low');
		}
	}

	exit();
})();
