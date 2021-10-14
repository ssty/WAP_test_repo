const readline = require('readline').createInterface({
 input: process.stdin,
 output: process.stdout,
});
readline.question('What is your name? ', name => {
  readline.question(`${name} What is your age? `, age =>{
        if(age<16)
        {
            console.log(`You’re not allowed to drive in Iowa`);
        } 
        else {
            console.log(`You’re allowed to get a drivers license in Iowa`);
        }
    })
});