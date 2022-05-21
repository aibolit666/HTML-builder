const fs = require('fs');
const path = require('path');
const file = path.join(__dirname, 'text.txt');

fs.open(file, 'w', (err) => {
  if (err) {
    throw err;
  }
});

readLine();

process.stdin.on('keypress', function (chunk, key) {
  if (key && key.name === 'c' && key.ctrl) {
    console.log('');
    console.log('Good bye!');
  }
});

function readLine() {
  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  readline.question('Hello, input please some text: ', (someText) => {
    if (someText === 'exit') {
      readline.close();
      console.log('Good bye!');
      return;
    }

    addToFile(someText);
    readline.close();
  });
}

function addToFile(someText) {
  fs.appendFile(file, `${someText}\n`, (err) => {
    if (err) {
      throw err;
    }
    readLine();
  });
}
