const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, 'info.txt');
const writeStream = fs.createWriteStream(filePath);
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Hi! What\'s your name?\n', (answer) => {
  console.log(`Nice to meet you, ${answer}!\nEnter your favorite artists or enter 'exit' for quit.`);
  rl.prompt();
});

rl.on('line', (answer) => {
  if (answer.toLowerCase() == 'exit') completionProcess();

  writeStream.write(answer + '\n');
  console.log('Your answer was written.');
  console.log('Enter one more artists or enter \'exit\' for quit.');
  rl.prompt();
});

rl.on('SIGINT', completionProcess);

function completionProcess() {
  console.log('GoodBye!\nProcess exited.');
  process.exit(0);
}