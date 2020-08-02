const os = require('os');

const stdin = process.stdin;
const stdout = process.stdout;
const stopWord = 'exit';

const onMessage = (data) => {
  const dataString = data.toString().trim();
  if (dataString === stopWord) {
    process.exit(0);
  }
  console.log(dataString.split("").reverse().join(""));
};

stdout.write(`Введите строку. Для выхода из программы введите "${stopWord}"`+os.EOL);
stdin.on('data', onMessage);
stdin.on('error', err => console.error(err));


