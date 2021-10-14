const readline = require('readline').createInterface({
 input: process.stdin,
 output: process.stdout,
});
let sum = 0;

getNextInput();

function getNextInput() {
	readline.question('Enter number ', num => {
		if (isNaN(num)) {
			if( num.toUpperCase() === 'STOP'){
				console.log(sum);
				readline.close();
			}
			getNextInput();
		 }
		else {
			sum = sum + parseInt(num);
			getNextInput();
		}
	});
}

