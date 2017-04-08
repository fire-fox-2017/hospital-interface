var readline = require('readline');
var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true
});


let u = 'rudy';
let p = 'haha';

rl.on('line', (input) => {
  rl.question('Username: ', function(username) {
    console.log('\nUsername is ' + username);
    if (username == u) {
      rl.question('Password: ', function(password) {
        // console.log('\nPassword is ' + password);
        if (password == p) {
          console.log("Password is correct")


          rl.close();
        }
        else {
          console.log("Invalid Username and Password")
          rl.setPrompt("Enter your username again")
          rl.prompt();
        }

      });

    }
    else {
      console.log("invalid username")
      rl.setPrompt("Enter your username again")
      rl.prompt();
    }

  });

});

console.log("lalalalaa")
